import React from "react";
import { FeaturedPlaylists, SimplifiedPlaylist } from "~/types/spotify-types";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { AlbumArtwork } from "./album-artwork";

export default function PopularPlaylists(props: {
  playlists: FeaturedPlaylists;
}) {
  console.log(props.playlists.playlists);
  return (
    <section className="flex flex-col gap-2 bg-gradient-to-l from-amber-400 via-lime-500 to-red-500 px-10 pt-2">
      <span className="text-black">Top Playlists Lately</span>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {props.playlists.playlists.items.map(
              (playlist: SimplifiedPlaylist) => (
                // <div key={playlist.id} className="flex flex-col items-center">
                //   <img
                //     src={playlist.images[0]?.url}
                //     alt={playlist.name}
                //     className="h-[150px] w-[250px] rounded-md object-cover"
                //   />
                //   <span className="text-white">{playlist.name}</span>

                //   <span className="text-white">{playlist.type} type</span>

                //   <span className="text-white">
                //     {playlist.owner.display_name}
                //   </span>
                // </div>
                <AlbumArtwork
                  key={playlist.name}
                  album={{
                    name: playlist.name,
                    artist: playlist.owner.display_name,
                    cover: playlist.images[0]?.url,
                  }}
                  className="w-[250px] lg:h-[220px] lg:w-[150px] lg:rounded-md lg:object-cover lg:transition-all lg:hover:scale-105"
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
