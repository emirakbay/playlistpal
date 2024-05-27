"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList, navigationMenuTriggerStyle
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";

export function Menu() {
  return (
    <>
      <main className="flex flex-row">
        <NavigationMenu className="px-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className={cn("text-lg font-bold", "text-black")}>
                    Home
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/profile" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className={cn("text-lg font-bold", "text-black")}>
                    Profile
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/api/auth/signout" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className={cn("text-lg font-bold", "text-black")}>
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
