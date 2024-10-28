import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";

export default async function Menu() {
  const session = await getServerAuthSession();

  const headersList = headers();

  const pathname = headersList.get("x-invoke-path") ?? "/";

  const menuItems = session
    ? [
        { href: "/", label: "Home" },
        { href: "/profile", label: "Profile" },
        { href: "/playlists", label: "Playlists" },
        { href: "/api/auth/signout", label: "Logout" },
      ]
    : [
        { href: "/#features", label: "Features" },
        { href: "/#about", label: "About" },
      ];

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
      <nav className="flex items-center gap-2 sm:gap-4 md:gap-6">
        {menuItems.map(({ href, label }) => (
          <Link
            key={href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-emerald-400 sm:text-base",
              pathname === href ? "text-emerald-400" : "text-gray-100",
            )}
            href={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
