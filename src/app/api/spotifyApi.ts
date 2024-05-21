import { Session } from "next-auth";
import { FeaturedPlaylists, Track } from "~/types/spotify-types";

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

export const fetchFeaturedPlaylists = async (session: Session) => {
  const res = await fetch(
    `https://api.spotify.com/v1/browse/featured-playlists?limit=25`,
    {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    },
  );

  const data = (await res.json()) as { items: FeaturedPlaylists[] };

  return data;
};
