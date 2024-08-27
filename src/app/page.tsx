import { kv } from "@vercel/kv";
import { redirect } from "next/navigation";
import GetRecommendations from "~/components/get-recommendations/get-recommendations";
import TopArtists from "~/components/top-artists/top-artists";
import TopTracks from "~/components/top-songs/top-tracks";
import { getServerAuthSession } from "~/server/auth";
import { type Artist, type Track } from "~/types/spotify-types";
import {
  fetchRecommendations,
  fetchTopArtists,
  fetchTopSongs,
} from "./api/spotify-service";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  let songs = await kv.get<{ items: Track[] }>("topSongs");
  if (!songs) {
    songs = await fetchTopSongs(session);
    await kv.set("topSongs", songs, { ex: 3600 });
  }

  let topArtists = await kv.get<{ items: Artist[] }>("topArtists");
  if (!topArtists) {
    topArtists = await fetchTopArtists(session);
    await kv.set("topArtists", topArtists, { ex: 3600 });
  }

  let recommendedTracks = await kv.get<Track[]>("recommendedTracks");
  if (!recommendedTracks) {
    recommendedTracks = await fetchRecommendations(session, songs, topArtists);
    await kv.set("recommendedTracks", recommendedTracks, { ex: 3600 });
  }

  return (
    <>
      <TopTracks items={songs.items} />
      <TopArtists items={topArtists.items} />
      <GetRecommendations recommendedTracks={recommendedTracks} />
    </>
  );
}
