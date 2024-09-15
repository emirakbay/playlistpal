import { redirect } from "next/navigation";
import GetRecommendations from "~/components/get-recommendations/get-recommendations";
import TopArtists from "~/components/top-artists/top-artists";
import TopTracks from "~/components/top-songs/top-tracks";
import { closeClient, getClient } from "~/db/db";
import { getServerAuthSession } from "~/server/auth";
import { type Artist, type Track } from "~/types/spotify-types";
import { sanitizeTopSongsData } from "~/utils/sanitize-data";
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

  const providerAccountId = session.user.name;
  const getUserKey = (key: string) => `user:${providerAccountId}:${key}`;

  const client = await getClient();

  const topSongs = await client.get(getUserKey("topSongs"));
  let topSongsData: { items: Track[] };
  if (topSongs) {
    topSongsData = JSON.parse(topSongs) as { items: Track[] };
  } else {
    topSongsData = await fetchTopSongs(session);
    sanitizeTopSongsData(topSongsData);
    await client.set(getUserKey("topSongs"), JSON.stringify(topSongsData), {
      EX: 3600,
    });
  }

  const topArtists = await client.get(getUserKey("topArtists"));
  let topArtistsData: { items: Artist[] };
  if (topArtists) {
    topArtistsData = JSON.parse(topArtists) as { items: Artist[] };
  } else {
    topArtistsData = await fetchTopArtists(session);
    await client.set(getUserKey("topArtists"), JSON.stringify(topArtistsData), {
      EX: 3600,
    });
  }

  const recommendedTracks = await client.get(getUserKey("recommendedTracks"));
  let recommendedTracksData: Track[];

  if (recommendedTracks) {
    recommendedTracksData = JSON.parse(recommendedTracks) as Track[];
  } else {
    recommendedTracksData = await fetchRecommendations(
      session,
      topSongsData,
      topArtistsData,
    );
    sanitizeTopSongsData(recommendedTracksData);
    await client.set(
      getUserKey("recommendedTracks"),
      JSON.stringify(recommendedTracksData),
      {
        EX: 3600,
      },
    );
  }

  await closeClient();

  return (
    <>
      <TopTracks items={topSongsData.items} />
      <TopArtists items={topArtistsData.items} />
      <GetRecommendations items={recommendedTracksData} />
    </>
  );
}
