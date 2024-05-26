import { redirect } from "next/navigation";
import PopularPlaylists from "~/components/popular-playlists";
import TopTracks from "~/components/top-tracks";
import { getServerAuthSession } from "~/server/auth";
import { fetchFeaturedPlaylists, fetchTopSongs } from "./api/spotifyApi";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const songs = await fetchTopSongs(session);
  const playlists = await fetchFeaturedPlaylists(session);

  return (
    <>
      <TopTracks items={songs.items} />
      <PopularPlaylists playlists={playlists} />
    </>
  );
}
