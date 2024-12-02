import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FollowedArtistsSection } from "~/components/profile/followed-artists-section/followed-artists-section";
import { ProfileHeader } from "~/components/profile/profile-header/profile-header";
import { RecentlyPlayedSection } from "~/components/profile/recently-played-section/recently-played-section";
import { getServerAuthSession } from "~/server/auth";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="flex flex-col gap-8 md:items-center">
        <Suspense fallback={<ProfileHeaderSkeleton />}>
          <ProfileHeader session={session} />
        </Suspense>
        <Suspense fallback={<RecentlyPlayedSkeleton />}>
          <RecentlyPlayedSection session={session} />
        </Suspense>
      </div>
      <Suspense fallback={<FollowedArtistsSkeleton />}>
        <FollowedArtistsSection session={session} />
      </Suspense>
    </div>
  );
}

function ProfileHeaderSkeleton() {
  return (
    <div className="flex shrink-0 flex-col gap-8 md:flex-row md:items-center">
      <div className="h-64 w-64 animate-pulse rounded-full bg-gray-700 md:h-40 md:w-40" />
    </div>
  );
}

function RecentlyPlayedSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="h-6 w-48 animate-pulse rounded bg-gray-700" />
      <div className="h-48 w-full animate-pulse rounded-lg bg-gray-700" />
    </div>
  );
}

function FollowedArtistsSkeleton() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="h-6 w-48 animate-pulse rounded bg-gray-700" />
      <div className="grid h-64 w-full animate-pulse grid-cols-2 gap-4 bg-gray-700 md:grid-cols-4" />
    </div>
  );
}
