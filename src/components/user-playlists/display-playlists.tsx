"use client";

import React from "react";
import { useScroll } from "~/hooks/use-scroll";
import { type Playlist, type SimplifiedPlaylist } from "~/types/spotify-types";
import { FeaturedSlider } from "../album-artwork";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function DisplayPlaylists({
  items,
  playlistsType,
}: {
  items: Playlist[] | SimplifiedPlaylist[];
  playlistsType: "owned" | "liked" | "featured";
}) {
  const { isScrolling, setIsScrolling } = useScroll();

  const uniqueItems = items.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id),
  );

  return (
    <section className="flex h-1/3 flex-col gap-2 px-10 pt-2">
      <span className="">
        {playlistsType === "featured"
          ? "Featured Playlists"
          : playlistsType === "owned"
            ? "Owned Playlists"
            : "Liked Playlists"}
      </span>
      <div className="relative">
        <ScrollArea
          onScrollStart={() => setIsScrolling(true)}
          onScrollEnd={() => setIsScrolling(false)}
        >
          <div className="flex space-x-4 pb-4 pt-2">
            {uniqueItems.map(
              (playlist: Playlist | SimplifiedPlaylist, index: number) => (
                <FeaturedSlider
                  album={{
                    name: playlist.name,
                    artist: playlist.owner.display_name,
                    cover: playlist.images?.[0]?.url ?? "/playlistpal.png",
                    order: index + 1,
                  }}
                  key={index}
                  className="w-[150px] lg:h-[230px] lg:w-[150px] lg:rounded-md lg:object-cover lg:transition-all lg:hover:scale-105"
                  aspectRatio="square"
                  width={250}
                  height={330}
                  externalUrl={playlist.external_urls.spotify}
                  uri={playlist.uri}
                  displayArtist={true}
                  isScrolling={isScrolling}
                />
              ),
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
