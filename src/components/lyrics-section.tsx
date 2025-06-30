"use client";

import { useEffect, useState } from "react";
import { type GeniusSong } from "~/app/api/genius-service";
import GeniusEmbed from "./genius-embed";

interface LyricsSectionProps {
  matchingTrack: GeniusSong | null;
}

export default function LyricsSection({ matchingTrack }: LyricsSectionProps) {
  const [lyricsHtml, setLyricsHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matchingTrack) return;

    const fetchLyrics = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `/api/genius-lyrics?url=${encodeURIComponent(matchingTrack.url)}`;
        const response = await fetch(url, {
          cache: "no-store",
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch lyrics:", errorText);
          setError("Failed to load lyrics");
          return;
        }

        const data = await response.json();
        setLyricsHtml(data.html);
      } catch (error) {
        console.error("Error fetching lyrics:", error);
        setError("Failed to load lyrics");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchLyrics();
  }, [matchingTrack]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Lyrics</h2>
      
      {isLoading && (
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
          <p className="text-gray-500">Loading lyrics...</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!isLoading && !error && lyricsHtml && (
        <GeniusEmbed embedContent={lyricsHtml} />
      )}

      {!isLoading && !error && !lyricsHtml && !matchingTrack && (
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <p className="text-gray-500">No lyrics available for this track</p>
        </div>
      )}
    </div>
  );
} 