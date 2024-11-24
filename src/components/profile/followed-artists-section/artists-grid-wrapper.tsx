import { type Session } from "next-auth";
import { fetchAllFollowedArtists } from "~/app/api/spotify-service";
import { ArtistGrid } from "./artists-grid";

export async function ArtistsGridWrapper({ session }: { session: Session }) {
  const followedArtists = await fetchAllFollowedArtists(session);
  return <ArtistGrid artists={followedArtists} />;
}
