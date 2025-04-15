import { redirect } from "next/navigation";
import React from "react";
import DisplayPlaylists from "~/components/user-playlists/display-playlists";
import { getServerAuthSession } from "~/server/auth";
import {
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

  return (
    <div className="flex min-h-screen flex-col gap-6 p-4">
      {["owned", "liked"].map((type) => (
        <DisplayPlaylists
          key={type}
          items={type === "owned" ? ownedPlaylists : likedPlaylists}
          playlistsType={type as "owned" | "liked"}
        />
      ))}
    </div>
  );
}
