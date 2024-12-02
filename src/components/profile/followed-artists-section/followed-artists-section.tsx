import { type Session } from "next-auth";
import { Suspense } from "react";
import { ArtistsGridWrapper } from "./artists-grid-wrapper";
import { LoadingGrid } from "./loading-grid";

export function FollowedArtistsSection({ session }: { session: Session }) {
  return (
    <Suspense fallback={<LoadingGrid />}>
      <ArtistsGridWrapper session={session} />
    </Suspense>
  );
}
