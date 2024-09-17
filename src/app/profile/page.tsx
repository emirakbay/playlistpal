import { User } from "lucide-react";
import { redirect } from "next/navigation";
import { RecentlyPlayedTable } from "~/components/recently-played/recently-played-table";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getServerAuthSession } from "~/server/auth";
import { fetchProfile, fetchRecentlyPlayed } from "../api/spotify-service";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const history = await fetchRecentlyPlayed(session);
  const profile = await fetchProfile(session);

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="rounded-lg p-6 md:w-1/3">
          <div className="flex flex-col items-center text-center">
            <Avatar className="mb-4 h-64 w-64">
              <AvatarImage
                src={profile.images[1]?.url}
                alt={profile.display_name}
              />
              <AvatarFallback>
                <User className="h-64 w-64" />
              </AvatarFallback>
            </Avatar>
            <h2 className="mb-2 text-2xl font-bold">{profile.display_name}</h2>
            <p className="mb-4 text-green-500">@{profile.id}</p>
            <div className="mb-4 flex gap-4">
              <div>
                <p className="font-bold">{profile.product}</p>
              </div>
            </div>
            <div className="mb-4 flex gap-4">
              <div>
                <p className="font-bold">{profile.followers.total}</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <h3 className="mb-4 text-xl font-bold">Recently Played</h3>
          <RecentlyPlayedTable data={history.items} />
        </div>
      </div>
    </div>
  );
}
