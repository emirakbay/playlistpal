import { Suspense } from "react";
import type { Session } from "next-auth";
import { fetchRecentlyPlayed } from "~/app/api/spotify-service";
import { RecentlyPlayedTable } from "~/components/profile/recently-played/recently-played-table";

function LoadingTable() {
  return (
    <div className="w-full">
      <h3 className="mb-4 text-xl font-bold">Recently Played</h3>
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left">#</th>
              <th className="h-12 px-4 text-left">Title</th>
              <th className="h-12 px-4 text-left">Album</th>
              <th className="h-12 px-4 text-left">Played At</th>
              <th className="h-12 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr
                key={i}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="h-12 px-4">
                  <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                </td>
                <td className="h-12 px-4">
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                </td>
                <td className="h-12 px-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </td>
                <td className="h-12 px-4">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </td>
                <td className="h-12 px-4">
                  <div className="h-4 w-8 animate-pulse rounded bg-muted" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

async function RecentlyPlayedWrapper({ session }: { session: Session }) {
  const history = await fetchRecentlyPlayed(session);

  return (
    <div className="w-full">
      <h3 className="mb-4 text-xl font-bold text-center">Recently Played</h3>
      <RecentlyPlayedTable data={history.items} />
    </div>
  );
}

export function RecentlyPlayedSection({ session }: { session: Session }) {
  return (
    <div className="flex items-center md:w-2/3">
      <Suspense fallback={<LoadingTable />}>
        <RecentlyPlayedWrapper session={session} />
      </Suspense>
    </div>
  );
}
