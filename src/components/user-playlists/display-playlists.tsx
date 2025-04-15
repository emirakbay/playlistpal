"use client";

import React from "react";
import { useScroll } from "~/hooks/use-scroll";
import { type Playlist, type SimplifiedPlaylist } from "~/types/spotify-types";
import { FeaturedSlider } from "../featured-slider";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function DisplayPlaylists({
  items,
  playlistsType,
}: {
  items: Playlist[] | SimplifiedPlaylist[];
  playlistsType: "owned" | "liked";
}) {
  const { isScrolling, setIsScrolling } = useScroll();

  const uniqueItems = items
    .filter((item): item is Playlist | SimplifiedPlaylist => item != null)
    .filter(
      (item, index, self) => index === self.findIndex((t) => t?.id === item.id),
    );

  return (
    <section className="flex h-1/3 flex-col gap-2 px-4 pt-2 sm:h-2/5 sm:gap-3 sm:px-12 sm:pt-3">
      <span className="text-base sm:text-lg">
        {playlistsType === "owned" ? "Owned Playlists" : "Liked Playlists"}
      </span>
      <div className="relative">
        <ScrollArea
          onScrollStart={() => setIsScrolling(true)}
          onScrollEnd={() => setIsScrolling(false)}
        >
          <div className="flex space-x-3 pb-3 pt-2 sm:space-x-5 sm:pb-5 sm:pt-3">
            {uniqueItems.map(
              (playlist: Playlist | SimplifiedPlaylist, index: number) => (
                <FeaturedSlider
                  isScrolling={isScrolling}
                  type="playlist"
                  album={{
                    name: playlist.name,
                    artist: playlist.owner.display_name,
                    cover: playlist.images?.[0]?.url ?? "/playlistpal.png",
                    order: index + 1,
                  }}
                  key={index}
                  className="w-[120px] sm:w-[180px] lg:h-[260px] lg:w-[180px] lg:rounded-lg lg:object-cover lg:transition-all lg:hover:scale-105"
                  aspectRatio="square"
                  width={180}
                  height={240}
                  externalUrl={playlist.external_urls.spotify}
                  uri={playlist.uri}
                  displayArtist={true}
                  id={playlist.id}
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
