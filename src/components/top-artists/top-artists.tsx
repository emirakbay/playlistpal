import React from "react";
import { type Artist } from "~/types/spotify-types";
import { FeaturedSlider } from "../album-artwork";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function TopArtists(props: {
  items: {
    items: Artist[] | null;
  };
}) {
  return (
    <section className="flex h-1/3 flex-col gap-2 px-10 pt-2">
      <span className="">Top Artists Lately</span>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4 pt-2">
            {props.items.items?.map((artist: Artist, index: number) => (
              <FeaturedSlider
                key={index}
                album={{
                  name: artist.name,
                  artist: artist.genres[0],
                  cover: artist.images[1]?.url,
                  order: index + 1,
                }}
                className="w-[150px] lg:h-[230px] lg:w-[150px] lg:rounded-md lg:object-cover lg:transition-all lg:hover:scale-105"
                aspectRatio="square"
                width={250}
                height={330}
                externalUrl={artist.external_urls.spotify}
                uri={artist.uri}
                displayArtist={true}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
