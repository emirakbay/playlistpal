"use client";

import React from "react";
import { useScroll } from "~/hooks/use-scroll";
import { type Track } from "~/types/spotify-types";
import { FeaturedSlider } from "../album-artwork";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function TopTracks(tracks: { items: Track[] }) {
  const { isScrolling, setIsScrolling } = useScroll();

  return (
    <section className="flex h-1/3 flex-col gap-2 px-10 pt-2">
      <span className="">Top 50 Lately</span>
      <div className="relative">
        <ScrollArea
          onScrollStart={() => setIsScrolling(true)}
          onScrollEnd={() => setIsScrolling(false)}
        >
          <div className="flex space-x-4 pb-4 pt-2">
            {tracks.items.map((album: Track, index: number) => (
              <FeaturedSlider
                key={index}
                album={{
                  name: album.name,
                  artist: album.artists[0]?.name,
                  cover: album.album.images[0]?.url,
                  order: index + 1,
                }}
                className="w-[150px] lg:h-[230px] lg:w-[150px] lg:rounded-md lg:object-cover lg:transition-all lg:hover:scale-105"
                aspectRatio="square"
                width={250}
                height={330}
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
