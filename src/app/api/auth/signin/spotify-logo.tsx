import Image from "next/image";
import { cn } from "~/lib/utils";

export function SpotifyLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/spotify-logo.svg"
      alt="Spotify Logo"
      width={800}
      height={356}
      className={cn("h-auto w-full", className)}
      priority
    />
  );
}
