import React from "react";
import { getServerAuthSession } from "~/server/auth";

export default async function Profile() {
  const session = await getServerAuthSession();

  return <div>Profile</div>;
}
