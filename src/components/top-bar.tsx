"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";

export function Menu() {
  return (
    <>
      <main className="flex flex-row bg-slate-900 pl-5 pt-3">
        <NavigationMenu className="px-6">
          <NavigationMenuList>
            <div className="flex flex-row gap-5">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink>
                    <span
                      className={cn(
                        "text-base font-bold text-background/70 hover:text-background/90",
                      )}
                    >
                      Home
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/profile" legacyBehavior passHref>
                  <NavigationMenuLink>
                    <span
                      className={cn(
                        "text-base font-bold text-background/70 hover:text-background/90",
                      )}
                    >
                      Profile
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/playlists" legacyBehavior passHref>
                  <NavigationMenuLink>
                    <span
                      className={cn(
                        "text-base font-bold text-background/70 hover:text-background/90",
                      )}
                    >
                      Playlists
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className="ml-auto pr-10">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/api/auth/signout" legacyBehavior passHref>
                <NavigationMenuLink>
                  <span
                    className={cn(
                      "text-base font-bold text-background/70 hover:text-background/90",
                    )}
                  >
                    Sign Out
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </main>
    </>
  );
}
