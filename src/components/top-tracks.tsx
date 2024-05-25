import React from "react";
import { Track } from "~/types/spotify-types";
import { AlbumArtwork } from "./album-artwork";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function TopTracks(tracks: { items: Track[] }) {
  console.log("🚀 ~ TopTracks ~ tracks:", tracks);
  return (
    <section className="flex flex-col gap-2 bg-gradient-to-l from-amber-400 via-lime-500 to-red-500 px-10 pt-2">
      <span className="text-black">Top 50 Lately</span>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4 pt-2">
            {tracks.items.map((album: Track, index: number) => (
              <AlbumArtwork
                key={album.name}
                album={{
                  name: album.name,
                  artist: album.artists[0]?.name,
                  cover: album.album.images[1]?.url,
                  order: index + 1,
                }}
                className="w-[150px] lg:h-[220px] lg:w-[150px] lg:rounded-md lg:object-cover lg:transition-all lg:hover:scale-105"
                aspectRatio="square"
                width={250}
                height={330}
                externalUrl={album.external_urls.spotify}
                uri={album.uri}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
