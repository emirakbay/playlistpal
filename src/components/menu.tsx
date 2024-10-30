import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { MenuLinks } from "./top-bar";

export default async function Menu() {
  const session = await getServerAuthSession();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-black px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <Image
          src="/playlistpal.png"
          alt="Playlistpal Logo"
          width={32}
          height={32}
          className="mr-2"
        />
        <span className="ml-2 hidden bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-2xl font-bold text-transparent sm:inline">
          Playlistpal
        </span>
      </Link>
      <MenuLinks session={session} />
    </header>
  );
}
