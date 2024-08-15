import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function GetRecommendations(props: any) {
  return (
    <>
      <section className="flex h-1/3 flex-col gap-2 px-10 pt-2">
        <span className="">Recommended Tracks</span>
        <div className="relative">
          <ScrollArea>
            <div className="flex space-x-8 pb-4 pt-2">
              {props.recommendedTracks.tracks.map(
                (album: any, index: number) => (
                  <div
                    key={index}
                    className="w-[150px] lg:h-[230px] lg:w-[150px] lg:rounded-md lg:object-cover lg:transition-all lg:hover:scale-105"
                  >
                    <img src={album.album.images[1]?.url} alt={album.name} />
                    <div className="flex flex-col pt-4 gap-2">
                      <span className="text-center text-sm font-medium leading-none">
                        {album.name}
                      </span>
                      <span className="text-center text-sm font-medium leading-none">
                        {album.artists[0]?.name}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
    </>
  );
}
