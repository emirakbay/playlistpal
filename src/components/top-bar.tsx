import { cn } from "~/lib/utils";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "./ui/menubar";

export function Menu() {
  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-6">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">PlaylistPal</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About PlaylistPal</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="relative">Playlist</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>New</MenubarSubTrigger>
            <MenubarSubContent className="w-[230px]">
              <MenubarItem>
                Song <MenubarShortcut></MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Playlist <MenubarShortcut></MenubarShortcut>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <a href="/account">Account</a>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          style={{
            marginLeft: "auto",
          }}
        >
          <a href="/api/auth/signout">Signout</a>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
