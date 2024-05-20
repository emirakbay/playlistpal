import { type Session } from "next-auth";
import { redirect } from "next/navigation";
import RecommendedTracks from "~/components/recommended-tracks";
import TopTracks from "~/components/top-tracks";
import { getServerAuthSession } from "~/server/auth";
import { type Track } from "~/types/spotify-types";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }
  const fetchTopSongs = async (session: Session) => {
    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=25`,
      {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      },
    );
    const data = (await res.json()) as { items: Track[] };
    return data;
  };

  const fetchFeaturedPlaylists = async (session: Session) => {
    const res = await fetch(
      `https://api.spotify.com/v1/browse/featured-playlists?limit=25`,
      {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      },
    );
    const data = (await res.json()) as { items: Track[] };
    return data;
  };

  const songs = await fetchTopSongs(session);

  return (
    <>
      <TopTracks items={songs.items} />
      <RecommendedTracks />
    </>
  );
}
