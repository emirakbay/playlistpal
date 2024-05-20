import Image from "next/image";

import { cn } from "~/lib/utils";

import { ContextMenu, ContextMenuTrigger } from "./ui/context-menu";

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: any) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={album.cover}
              alt={album.name}
              width={width}
              height={height}
              className={cn(
                "h-[250px] w-[250px] rounded-md object-cover transition-all hover:scale-105 sm:h-min sm:w-min sm:rounded-md",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
              )}
            />
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
      <div className="space-y-1 text-sm text-black">
        <h3 className="font-medium leading-none">
          <span>
            {album.order}
            {". "}
          </span>
          {album.name}
        </h3>
        <p className="text-xs text-black text-muted-foreground">
          {album.artist}
        </p>
      </div>
    </div>
  );
}
