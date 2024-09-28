import { redirect } from "next/navigation";
import React from "react";
import DisplayPlaylists from "~/components/user-playlists/display-playlists";
import { getServerAuthSession } from "~/server/auth";
import {
  fetchFeaturedPlaylists,
  fetchLikedPlaylists,
  fetchUserOwnedPlaylists,
} from "../api/spotify-service";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const ownedPlaylists = await fetchUserOwnedPlaylists(session);
  const likedPlaylists = await fetchLikedPlaylists(session);
  const featuredPlaylists = await fetchFeaturedPlaylists(session);

  return (
    <>
      {["owned", "liked", "featured"].map((type) => (
        <DisplayPlaylists
          key={type}
          items={
            type === "owned"
              ? ownedPlaylists
              : type === "liked"
                ? likedPlaylists
                : featuredPlaylists.playlists.items
          }
          playlistsType={type as "owned" | "liked" | "featured"}
        />
      ))}
    </>
  );
}
