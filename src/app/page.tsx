import LandingPage from "~/components/landing-page/landing-page";
import { TopArtists } from "~/components/top-artists/top-artists";
import { TopTracks } from "~/components/top-songs/top-tracks";
import { closeClient, getClient } from "~/db/db";
import { getServerAuthSession } from "~/server/auth";
import { type Artist, type Track } from "~/types/spotify-types";
import { type TimeRange, type TimeRangeData } from "~/types/types";
import { decrypt, encrypt } from "~/utils/encryption";
import { sanitizeTopSongsData } from "~/utils/sanitize-data";
import { fetchTopArtists, fetchTopSongs } from "./api/spotify-service";

export default async function Page() {
  const session = await getServerAuthSession();

  const topSongsData: TimeRangeData<Track> = {
    short_term: { items: [] },
    medium_term: { items: [] },
    long_term: { items: [] },
  };
  const topArtistsData: TimeRangeData<Artist> = {
    short_term: { items: [] },
    medium_term: { items: [] },
    long_term: { items: [] },
  };

  if (session) {
    const providerAccountId = session.user.name;
    const getUserKey = (key: string, term: TimeRange) =>
      `user:${providerAccountId}:${key}:${term}`;

    const client = await getClient();
    const terms = ["short_term", "medium_term", "long_term"];

    for (const term of terms as TimeRange[]) {
      const topSongs = await client.get(getUserKey("topSongs", term));
      if (topSongs) {
        topSongsData[term] = JSON.parse(await decrypt(topSongs)) as {
          items: Track[];
        };
      } else {
        topSongsData[term] = await fetchTopSongs(session, term);
        sanitizeTopSongsData(topSongsData[term]);
        await client.set(
          getUserKey("topSongs", term),
          await encrypt(JSON.stringify(topSongsData[term])),
          { EX: 3600 },
        );
      }
    }

    for (const term of terms as TimeRange[]) {
      const topArtists = await client.get(getUserKey("topArtists", term));
      if (topArtists) {
        topArtistsData[term] = JSON.parse(await decrypt(topArtists)) as {
          items: Artist[];
        };
      } else {
        topArtistsData[term] = await fetchTopArtists(session, term);
        await client.set(
          getUserKey("topArtists", term),
          await encrypt(JSON.stringify(topArtistsData[term])),
          { EX: 3600 },
        );
      }
    }

    await closeClient();
  }

  return session ? (
    <div className="flex min-h-screen flex-col gap-6 p-4">
      <TopTracks items={topSongsData} />
      <TopArtists items={topArtistsData} />
    </div>
  ) : (
    <LandingPage />
  );
}
