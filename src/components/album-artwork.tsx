"use client";
import Image from "next/image";

import { cn } from "~/lib/utils";

import { ContextMenu, ContextMenuTrigger } from "./ui/context-menu";

import { useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

type AlbumArtworkProps = {
  album: {
    name: string;
    artist: string | undefined;
    cover: string | undefined;
    order?: number | undefined;
  };
  externalUrl?: string;
  uri?: string;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  className?: string;
};

export function AlbumArtwork({
  album,
  externalUrl,
  uri,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Popover>
              <PopoverTrigger>
                <Image
                  src={album.cover!}
                  alt={album.name}
                  width={width}
                  height={height}
                  className={cn(
                    "h-[250px] w-[250px] rounded-md object-cover transition-all hover:scale-105 sm:h-min sm:w-min sm:rounded-md",
                    aspectRatio === "portrait"
                      ? "aspect-[3/4]"
                      : "aspect-square",
                  )}
                />
                <PopoverContent
                  ref={popoverRef}
                  className="flex h-auto w-auto flex-row gap-2 rounded-md bg-transparent p-2 text-black shadow-md backdrop-blur-lg backdrop-contrast-75 backdrop-saturate-150 backdrop-filter transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-50 hover:backdrop-blur-lg hover:backdrop-contrast-75 hover:backdrop-saturate-150"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <svg
                          onClick={
                            uri
                              ? () => {
                                  window.open(uri, "_blank");
                                }
                              : undefined
                          }
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                          width={26}
                          height={26}
                        >
                          <path
                            fill="#1ed760"
                            d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                          />
                          <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
                        </svg>
                        <TooltipContent>
                          <span>Open in Spotify</span>
                        </TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <svg
                          onClick={
                            externalUrl
                              ? () => {
                                  window.open(externalUrl, "_blank");
                                }
                              : undefined
                          }
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="2 2 21 21"
                          stroke="currentColor"
                          width={26}
                          height={26}
                          className="hidden cursor-pointer md:block lg:block"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                          />
                        </svg>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Open in Browser</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </PopoverContent>
              </PopoverTrigger>
            </Popover>
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
      <div className="space-y-1 text-center text-sm text-black">
        <h3 className="font-medium leading-none">
          {album.order ? (
            <span>
              {album.order}
              {"."}
            </span>
          ) : (
            ""
          )}
          {album.name}
        </h3>
        <p className="text-xs text-black">{album.artist}</p>
      </div>
    </div>
  );
}
