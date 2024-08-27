import { type Session } from "next-auth";
import {
  type Artist,
  type FeaturedPlaylists,
  type RecentlyPlayedTracksPage,
  type Recommendations,
  type TopArtists,
  type Track,
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

export const fetchTopArtists = async (
  session: Session,
): Promise<TopArtists> => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    },
  );

  const data = (await res.json()) as TopArtists;

  return data;
};

export const fetchRecommendations = async (
  session: Session,
  songs: { items: Track[] },
  topArtists: { items: Artist[] },
) => {
  const topThreeArtists = Array.isArray(topArtists.items)
    ? topArtists.items.slice(0, 3).map((artist: Artist) => artist.id)
    : [];
  const topThreeSongs = Array.isArray(songs.items)
    ? songs.items.slice(0, 3).map((song: Track) => song.id)
    : [];
  const topThreeArtistsGenres = Array.isArray(topArtists.items)
    ? topArtists.items.slice(0, 3).flatMap((artist: Artist) => artist.genres)
    : [];

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
