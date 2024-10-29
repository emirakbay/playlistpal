"use client";

import React from "react";
import { useScroll } from "~/hooks/use-scroll";
import { type Artist } from "~/types/spotify-types";
import { FeaturedSlider } from "../album-artwork";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function TopArtists(topArtists: { items: Artist[] }) {
  const { isScrolling, setIsScrolling } = useScroll();

  return (
    <section className="flex h-1/3 flex-col gap-2 px-4 pt-2 sm:h-2/5 sm:gap-3 sm:px-12 sm:pt-3">
      <span className="text-base sm:text-lg">Top Artists Lately</span>
      <div className="relative">
        <ScrollArea
          onScrollStart={() => setIsScrolling(true)}
          onScrollEnd={() => setIsScrolling(false)}
        >
          <div className="flex space-x-3 pb-3 pt-2 sm:space-x-5 sm:pb-5 sm:pt-3">
            {topArtists.items.map((artist: Artist, index: number) => (
              <FeaturedSlider
                key={index}
                album={{
                  name: artist.name,
                  artist: artist.genres[0],
                  cover: artist.images[0]?.url,
                  order: index + 1,
                }}
                className="w-[120px] sm:w-[180px] lg:h-[260px] lg:w-[180px] lg:rounded-lg lg:object-cover lg:transition-all lg:hover:scale-105"
                aspectRatio="square"
                width={180}
                height={240}
                externalUrl={artist.external_urls.spotify}
                uri={artist.uri}
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
