import { type Session } from "next-auth";
import {
  type Artist,
  type FeaturedPlaylists,
  type FollowedArtists,
  type Page,
  type Playlist,
  type RecentlyPlayedTracksPage,
  type Recommendations,
  type Track,
  type UserProfile,
} from "~/types/spotify-types";
import { type TimeRange } from "~/types/types";

export const fetchTopSongs = async (session: Session, timeRange: TimeRange) => {
  console.log("fetchTopSongs");
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  const data = (await res.json()) as { items: Track[] };

  return data;
};

export const fetchFeaturedPlaylists = async (
  session: Session,
): Promise<FeaturedPlaylists> => {
  const res = await fetch(
    `https://api.spotify.com/v1/browse/featured-playlists?limit=50`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  const data = (await res.json()) as FeaturedPlaylists;

  return data;
};

export const fetchTopArtists = async (session: Session) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  const data = (await res.json()) as { items: Artist[] };

  return data;
};

export const fetchRecommendations = async (
  session: Session,
  songs: { items: Track[] },
  topArtists: { items: Artist[] },
) => {
  const topThreeArtists = topArtists.items
    .slice(0, 3)
    .map((artist) => artist.id);
  const topThreeSongs = songs.items.slice(0, 3).map((song) => song.id);
  const topThreeArtistsGenres = topArtists.items
    .slice(0, 3)
    .flatMap((artist) => artist.genres);

  const fetchRecommendations = async (index: number) => {
    const url = `https://api.spotify.com/v1/recommendations?limit=8&seed_artists=${topThreeArtists[index]}&seed_tracks=${topThreeSongs[index]}&seed_genres=${topThreeArtistsGenres[index]}`;
    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
    };
    return fetch(url, { headers });
  };

  const res = await Promise.all([
    fetchRecommendations(0),
    fetchRecommendations(1),
    fetchRecommendations(2),
  ]);

  const data = (await Promise.all(
    res.map((res) => res.json()),
  )) as Recommendations[];
  const combinedTracks = data.flatMap((item) => item.tracks);
  return combinedTracks;
};

export const fetchRecentlyPlayed = async (session: Session) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=50&before=${Date.now()}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  const data = (await res.json()) as RecentlyPlayedTracksPage;
  return data;
};

export const fetchProfile = async (session: Session) => {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const data = (await res.json()) as UserProfile;
  return data;
};

export const fetchAllFollowedArtists = async (session: Session) => {
  let allArtists: Artist[] = [];
  let nextUrl = `https://api.spotify.com/v1/me/following?type=artist&limit=50`;

  while (nextUrl) {
    const res = await fetch(nextUrl, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = (await res.json()) as FollowedArtists;

    allArtists = allArtists.concat(data.artists.items);
    nextUrl = data.artists.next!;
  }

  return allArtists;
};

export const fetchUserOwnedPlaylists = async (session: Session) => {
  let allPlaylists: Playlist[] = [];
  let nextUrl = `https://api.spotify.com/v1/me/playlists?limit=50&offset=0`;

  while (nextUrl) {
    try {
      const res = await fetch(nextUrl, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error fetching playlists: ${res.statusText}`);
      }

      const data = (await res.json()) as Page<Playlist>;

      allPlaylists = allPlaylists.concat(data.items);
      nextUrl = data.next!;
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
      return [];
    }
  }

  const ownedPlaylists = allPlaylists.filter(
    (playlist) => playlist?.owner?.id === session.user.id,
  );

  return ownedPlaylists;
};

export const fetchLikedPlaylists = async (session: Session) => {
  let allPlaylists: Playlist[] = [];
  let nextUrl = `https://api.spotify.com/v1/me/playlists?limit=50&offset=0`;

  while (nextUrl) {
    try {
      const res = await fetch(nextUrl, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error fetching playlists: ${res.statusText}`);
      }

      const data = (await res.json()) as Page<Playlist>;

      allPlaylists = allPlaylists.concat(data.items);
      nextUrl = data.next!;
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
      return [];
    }
  }

  const likedPlaylists = allPlaylists.filter(
    (playlist) => playlist?.owner?.id !== session.user.id,
  );

  return likedPlaylists;
};
