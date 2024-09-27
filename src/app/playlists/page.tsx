import { redirect } from "next/navigation";
import React from "react";
import UserPlaylists from "~/components/user-playlists/user-playlists";
import { getServerAuthSession } from "~/server/auth";
import { fetchUserOwnedPlaylists } from "../api/spotify-service";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const playlists = await fetchUserOwnedPlaylists(session);

  return (
    <>
      <UserPlaylists items={playlists} />
    </>
  );
}
