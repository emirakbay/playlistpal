import { type Session } from "next-auth";
import {
  type Artist,
  type FeaturedPlaylists,
  type FollowedArtists,
  type RecentlyPlayedTracksPage,
  type Recommendations,
  type Track,
  type UserProfile,
} from "~/types/spotify-types";

export const fetchTopSongs = async (session: Session) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
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
    `https://api.spotify.com/v1/browse/featured-playlists?limit=25`,
    {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
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
        Authorization: `Bearer ${session.user.access_token}`,
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

  const res = await Promise.all([
    fetch(
      `https://api.spotify.com/v1/recommendations?limit=8&seed_artists=${topThreeArtists[0]}&seed_tracks=${topThreeSongs[0]}&seed_genres=${topThreeArtistsGenres[0]}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      },
    ),
    fetch(
      `https://api.spotify.com/v1/recommendations?limit=8&seed_artists=${topThreeArtists[1]}&seed_tracks=${topThreeSongs[1]}&seed_genres=${topThreeArtistsGenres[1]}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      },
    ),
    fetch(
      `https://api.spotify.com/v1/recommendations?limit=8&seed_artists=${topThreeArtists[2]}&seed_tracks=${topThreeSongs[2]}&seed_genres=${topThreeArtistsGenres[2]}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      },
    ),
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
        Authorization: `Bearer ${session.user.access_token}`,
      },
    },
  );

  const data = (await res.json()) as RecentlyPlayedTracksPage;
  return data;
};

export const fetchProfile = async (session: Session) => {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${session.user.access_token}`,
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
        Authorization: `Bearer ${session.user.access_token}`,
      },
    });

    const data = (await res.json()) as FollowedArtists;

    allArtists = allArtists.concat(data.artists.items);
    nextUrl = data.artists.next!;
  }

  return allArtists;
};
