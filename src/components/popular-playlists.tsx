import React from "react";
import { FeaturedPlaylists, SimplifiedPlaylist } from "~/types/spotify-types";
import { AlbumArtwork } from "./album-artwork";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function PopularPlaylists(props: {
  playlists: FeaturedPlaylists;
}) {
  return (
    <section className="flex flex-col gap-2 bg-gradient-to-l from-amber-400 via-lime-500 to-red-500 px-10 pt-2">
      <span className="text-black">Top Playlists Lately</span>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {props.playlists.playlists.items.map(
              (playlist: SimplifiedPlaylist) => (
                <AlbumArtwork
                  key={playlist.name}
                  album={{
                    name: playlist.name,
                    artist: playlist.owner.display_name,
                    cover: playlist.images[0]?.url,
                  }}
                  className="w-[150px] sm:w-[50px] lg:h-[230px] lg:w-[150px] lg:rounded-md lg:object-cover lg:transition-all lg:hover:scale-105"
                  aspectRatio="square"
                  width={250}
                  height={330}
                  externalUrl={playlist.external_urls.spotify}
                  uri={playlist.uri}
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
