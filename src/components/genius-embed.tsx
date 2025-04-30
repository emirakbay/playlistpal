"use client";

import { useEffect, useState } from "react";

interface GeniusEmbedProps {
  embedContent: string;
}

export default function GeniusEmbed({ embedContent }: GeniusEmbedProps) {
  const [lyrics, setLyrics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processLyrics = () => {
      try {
        // Split content by line breaks and clean up
        const lines = embedContent
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        setLyrics(lines);
      } catch (err) {
        console.error("Error processing lyrics:", err);
        setError("Failed to load lyrics");
      } finally {
        setIsLoading(false);
      }
    };

    processLyrics();
  }, [embedContent]);

  if (isLoading) {
    return (
      <div className="mx-auto my-4 w-full max-w-2xl rounded-lg bg-gray-100 p-4">
        <p className="text-center text-gray-500">Loading lyrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-4 w-full max-w-2xl rounded-lg bg-red-50 p-4">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (lyrics.length === 0) {
    return (
      <div className="mx-auto my-4 w-full max-w-2xl rounded-lg bg-gray-100 p-4">
        <p className="text-center text-gray-500">No lyrics available</p>
      </div>
    );
  }

  return (
    <div className="mx-auto my-4 w-full max-w-2xl">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="flex flex-col space-y-2">
          {lyrics.map((line, index) => {
            // Detect line types
            const isHeader = line.startsWith("[") && line.endsWith("]");
            const isContributor = line.startsWith("(") && line.endsWith(")");
            const isTitle = line.includes("için şarkı sözleri");
            const isEmptyLine = line.trim().length === 0;

            if (isEmptyLine) {
              return <div key={index} className="h-4" />;
            }

            return (
              <div
                key={index}
                className={`
                  ${isTitle ? "mb-6" : ""}
                  ${isHeader ? "mb-2 mt-4" : ""}
                  ${isContributor ? "mb-2" : ""}
                `}
              >
                <p
                  className={`
                    ${
                      isTitle
                        ? "text-center text-xl font-bold text-black"
                        : isHeader
                          ? "font-bold text-blue-600"
                          : isContributor
                            ? "text-sm italic text-gray-600"
                            : "text-black"
                    }
                    ${!isTitle && !isHeader ? "leading-relaxed" : ""}
                  `}
                >
                  {line}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
