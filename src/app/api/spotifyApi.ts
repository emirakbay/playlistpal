import { Session } from "next-auth";
import { FeaturedPlaylists, Track } from "~/types/spotify-types";

export type TopArtists = {
  items: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }[];
};

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
