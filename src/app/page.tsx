import { redirect } from "next/navigation";
import PopularPlaylists from "~/components/popular-playlists/popular-playlists";
import TopArtists from "~/components/top-artists/top-artists";
import TopTracks from "~/components/top-songs/top-tracks";
import { getServerAuthSession } from "~/server/auth";
import {
  fetchFeaturedPlaylists,
  fetchTopArtists,
  fetchTopSongs,
} from "./api/spotifyApi";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const songs = await fetchTopSongs(session);
  const topArtists = await fetchTopArtists(session);
  const playlists = await fetchFeaturedPlaylists(session);

  return (
    <>
      <TopTracks items={songs.items} />
      <TopArtists items={topArtists} />
      <PopularPlaylists playlists={playlists} />
    </>
  );
}
