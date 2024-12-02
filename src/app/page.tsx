import GetRecommendations from "~/components/get-recommendations/get-recommendations";
import LandingPage from "~/components/landing-page/landing-page";
import TopArtists from "~/components/top-artists/top-artists";
import TopTracks from "~/components/top-songs/top-tracks";
import { closeClient, getClient } from "~/db/db";
import { getServerAuthSession } from "~/server/auth";
import { type Artist, type Track } from "~/types/spotify-types";
import { decrypt, encrypt } from "~/utils/encryption";
import { sanitizeTopSongsData } from "~/utils/sanitize-data";
import {
  fetchRecommendations,
  fetchTopArtists,
  fetchTopSongs,
} from "./api/spotify-service";

export default async function Page() {
  const session = await getServerAuthSession();

  let topSongsData: { items: Track[] } = { items: [] };
  let topArtistsData: { items: Artist[] } = { items: [] };
  let recommendedTracksData: Track[] = [];

  if (session) {
    const providerAccountId = session.user.name;
    const getUserKey = (key: string) => `user:${providerAccountId}:${key}`;

    const client = await getClient();

    const topSongs = await client.get(getUserKey("topSongs"));
    if (topSongs) {
      topSongsData = JSON.parse(await decrypt(topSongs)) as { items: Track[] };
    } else {
      topSongsData = await fetchTopSongs(session, "short_term");
      sanitizeTopSongsData(topSongsData);
      await client.set(
        getUserKey("topSongs"),
        await encrypt(JSON.stringify(topSongsData)),
        {
          EX: 3600,
        },
      );
    }

    const topArtists = await client.get(getUserKey("topArtists"));
    if (topArtists) {
      topArtistsData = JSON.parse(await decrypt(topArtists)) as {
        items: Artist[];
      };
    } else {
      topArtistsData = await fetchTopArtists(session);
      await client.set(
        getUserKey("topArtists"),
        await encrypt(JSON.stringify(topArtistsData)),
        {
          EX: 3600,
        },
      );
    }

    const recommendedTracks = await client.get(getUserKey("recommendedTracks"));

    if (recommendedTracks) {
      recommendedTracksData = JSON.parse(
        await decrypt(recommendedTracks),
      ) as Track[];
    } else {
      recommendedTracksData = await fetchRecommendations(
        session,
        topSongsData,
        topArtistsData,
      );
      sanitizeTopSongsData(recommendedTracksData);
      await client.set(
        getUserKey("recommendedTracks"),
        await encrypt(JSON.stringify(recommendedTracksData)),
        {
          EX: 3600,
        },
      );
    }

    await closeClient();
  }

  return session ? (
    <div className="flex min-h-screen flex-col gap-6 p-4">
      <GetRecommendations items={recommendedTracksData} />
      <TopTracks items={topSongsData.items} />
      <TopArtists items={topArtistsData.items} />
    </div>
  ) : (
    <LandingPage />
  );
}
