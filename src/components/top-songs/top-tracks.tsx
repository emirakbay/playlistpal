"use client";

import React from "react";
import { useScroll } from "~/hooks/use-scroll";
import { type Track } from "~/types/spotify-types";
import { type TimeRangeData } from "~/types/types";
import { FeaturedSlider } from "../featured-slider";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface TopTracksProps {
  items: TimeRangeData<Track>;
}

const TIME_RANGES = {
  short_term: "4 Weeks",
  medium_term: "6 Months",
  long_term: "All Time",
} as const;

export function TopTracks({ items }: TopTracksProps) {
  const { isScrolling, setIsScrolling } = useScroll();

  function renderTrackList(tracks: Track[]) {
    return (
      <div className="flex space-x-3 pb-3 pt-2 sm:space-x-5 sm:pb-5 sm:pt-3">
        {tracks.map((track: Track, index: number) => (
          <FeaturedSlider
            key={track.id}
            album={{
              name: track.name,
              artist: track.artists[0]?.name,
              cover: track.album.images[0]?.url,
              order: index + 1,
            }}
            className="w-[120px] sm:w-[180px] lg:h-[260px] lg:w-[180px] lg:rounded-lg lg:object-cover lg:transition-all lg:hover:scale-105"
            aspectRatio="square"
            width={180}
            height={240}
            externalUrl={track.external_urls.spotify}
            uri={track.uri}
            displayArtist={true}
            isScrolling={isScrolling}
            type="track"
            id={track.id}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="flex h-1/3 flex-col gap-2 px-4 pt-2 sm:h-2/5 sm:gap-3 sm:px-12 sm:pt-3">
      <span className="text-base sm:text-lg">Top Tracks</span>
      <Tabs defaultValue="short_term">
        <TabsList className="mb-2">
          {Object.entries(TIME_RANGES).map(([value, label]) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(TIME_RANGES).map((range) => (
          <TabsContent key={range} value={range}>
            <ScrollArea
              onScrollStart={() => setIsScrolling(true)}
              onScrollEnd={() => setIsScrolling(false)}
            >
              {renderTrackList(
                items[range as keyof TimeRangeData<Track>].items,
              )}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
