import { redirect } from "next/navigation";
import RecommendedTracks from "~/components/recommended-tracks";
import TopTracks from "~/components/top-tracks";
import { getServerAuthSession } from "~/server/auth";
import { fetchTopSongs } from "./api/spotifyApi";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const songs = await fetchTopSongs(session);

  return (
    <>
      <TopTracks items={songs.items} />
      <RecommendedTracks />
    </>
  );
}
