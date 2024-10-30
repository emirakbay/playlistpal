"use client";

import { type Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

interface MenuProps {
  session: Session | null;
}

export function MenuLinks({ session }: MenuProps) {
  const pathname = usePathname();

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
  );
}
