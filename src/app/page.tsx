import { redirect } from "next/navigation";
import GetRecommendations from "~/components/get-recommendations/get-recommendations";
import TopArtists from "~/components/top-artists/top-artists";
import TopTracks from "~/components/top-songs/top-tracks";
import { getServerAuthSession } from "~/server/auth";
import {
  fetchRecommendations,
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
  const recommendedTracks = await fetchRecommendations(session);

  return (
    <>
      <TopTracks items={songs.items} />
      <TopArtists items={topArtists} />
      <GetRecommendations recommendedTracks={recommendedTracks} />
    </>
  );
}
