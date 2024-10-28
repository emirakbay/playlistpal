"use client";

import React from "react";
import { useScroll } from "~/hooks/use-scroll";
import { type Track } from "~/types/spotify-types";
import { FeaturedSlider } from "../album-artwork";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function TopTracks(tracks: { items: Track[] }) {
  const { isScrolling, setIsScrolling } = useScroll();

  return (
    <section className="flex h-1/3 flex-col gap-2 px-4 pt-2 sm:h-2/5 sm:gap-3 sm:px-12 sm:pt-3">
      <span className="text-base sm:text-lg">Top 50 Lately</span>
      <div className="relative">
        <ScrollArea
          onScrollStart={() => setIsScrolling(true)}
          onScrollEnd={() => setIsScrolling(false)}
        >
          <div className="flex space-x-3 pb-3 pt-2 sm:space-x-5 sm:pb-5 sm:pt-3">
            {tracks.items.map((album: Track, index: number) => (
              <FeaturedSlider
                key={index}
                album={{
                  name: album.name,
                  artist: album.artists[0]?.name,
                  cover: album.album.images[0]?.url,
                  order: index + 1,
                }}
                className="w-[120px] sm:w-[180px] lg:h-[260px] lg:w-[180px] lg:rounded-lg lg:object-cover lg:transition-all lg:hover:scale-105"
                aspectRatio="square"
                width={180}
                height={240}
                externalUrl={album.external_urls.spotify}
                uri={album.uri}
                displayArtist={true}
                isScrolling={isScrolling}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
