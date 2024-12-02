import { User } from "lucide-react";
import type { Session } from "next-auth";
import { Suspense } from "react";
import { fetchProfile } from "~/app/api/spotify-service";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import { type UserProfile } from "~/types/spotify-types";

function ProfileAvatar({ profile }: { profile: UserProfile }) {
  return (
    <Avatar className="mb-4 h-64 w-64">
      <AvatarImage src={profile.images[0]?.url} alt={profile.display_name} />
      <AvatarFallback>
        <User className="h-64 w-64" />
      </AvatarFallback>
    </Avatar>
  );
}

export async function ProfileHeader({ session }: { session: Session }) {
  const profile = await fetchProfile(session);

  return (
    <div className="rounded-lg p-6 md:w-1/3">
      <div className="flex flex-col items-center text-center">
        <Suspense
          fallback={<Skeleton className="mb-4 h-64 w-64 rounded-full" />}
        >
          <ProfileAvatar profile={profile} />
        </Suspense>
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
  );
}
