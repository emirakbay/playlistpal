import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Track } from "~/types/spotify-types";
import { AlbumArtwork } from "./album-artwork";

export default function TopTracks(tracks: { items: Track[] }) {
  return (
    <section className="flex flex-col gap-2 bg-gradient-to-l from-amber-400 via-lime-500 to-red-500 px-10 pt-2">
      <span className="text-black">Top Tracks Lately</span>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {tracks.items.map((album: Track, index: number) => (
              <AlbumArtwork
                key={album.name}
                album={{
                  name: album.name,
                  artist: album.artists[0]?.name,
                  cover: album.album.images[1]?.url,
                  order: index + 1,
                }}
                className="w-[250px]"
                aspectRatio="square"
                width={250}
                height={330}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
