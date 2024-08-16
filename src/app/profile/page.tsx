import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { fetchRecentlyPlayed } from "../api/spotify-service";
import { RecentlyPlayedTable } from "~/components/recently-played/recently-played-table";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const history = await fetchRecentlyPlayed(session);

  return (
    <div>
      <RecentlyPlayedTable data={history.items} />
    </div>
  );
}
