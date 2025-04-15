import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { findMatchingTrack, searchGenius } from "~/app/api/genius-service";
import { fetchTrack } from "~/app/api/spotify-service";
import GeniusEmbed from "~/components/genius-embed";
import { authOptions } from "~/server/auth";

export default async function TrackPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const track = await fetchTrack(params.id, session);

  if (!track) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Track not found</p>
      </div>
    );
  }

  const searchResult = await searchGenius(
    `${track.name} ${track.artists[0]?.name}`,
  );

  const matchingTrack = findMatchingTrack(
    searchResult,
    track.name,
    track.artists.map((artist) => artist.name),
  );

  let lyricsHtml = null;
  if (matchingTrack) {
    try {
      const lyricsResponse = await fetch(matchingTrack.url);
      lyricsHtml = await lyricsResponse.text();
    } catch (error) {
      console.error("Failed to fetch lyrics:", error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Track Info Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative h-32 w-32 overflow-hidden rounded-lg">
              <Image
                src={track.album.images[0]?.url ?? "/playlistpal.png"}
                alt={track.album.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">{track.name}</h1>
              <div className="flex flex-wrap gap-2">
                {track.artists.map((artist) => (
                  <a
                    key={artist.id}
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:underline"
                  >
                    {artist.name}
                  </a>
                ))}
              </div>
              <a
                href={track.album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:underline"
              >
                {track.album.name}
              </a>
            </div>
          </div>

          {/* Track Details */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-lg font-semibold">Track Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">
                  {Math.floor(track.duration_ms / 60000)}:
                  {((track.duration_ms % 60000) / 1000)
                    .toFixed(0)
                    .padStart(2, "0")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Popularity</p>
                <p className="font-medium">{track.popularity}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Release Date</p>
                <p className="font-medium">
                  {new Date(track.album.release_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Track Number</p>
                <p className="font-medium">
                  {track.track_number} / {track.album.total_tracks}
                </p>
              </div>
            </div>
          </div>

          {/* Spotify Link */}
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1ed760] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[#1ed760]/90"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            Play on Spotify
          </a>
        </div>

        {/* Lyrics Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Lyrics</h2>
          {lyricsHtml ? (
            <GeniusEmbed embedContent={lyricsHtml} />
          ) : (
            <div className="rounded-lg bg-gray-50 p-6 text-center">
              <p className="text-gray-500">
                No lyrics available for this track
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
