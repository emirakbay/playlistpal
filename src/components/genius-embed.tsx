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
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = embedContent;

        // Find ALL lyrics containers, not just the first one
        const lyricsContainers = tempDiv.querySelectorAll(
          '[data-lyrics-container="true"]',
        );

        if (!lyricsContainers || lyricsContainers.length === 0) {
          setLyrics([]);
          setIsLoading(false);
          return;
        }

        // Extract all text content
        let lines: string[] = [];
        let currentLine = "";

        const processNode = (node: Node) => {
          // Skip unwanted containers entirely
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            ((node as HTMLElement).classList.contains(
              "LyricsHeader__Container",
            ) ||
              (node as HTMLElement).classList.contains(
                "PrimisPlayer__Container",
              ) ||
              (node as HTMLElement).classList.contains(
                "InreadContainer__Container-sc-b078f8b1-0",
              ) ||
              (node as HTMLElement).tagName.toLowerCase() === "script")
          ) {
            return;
          }

          if (node.nodeType === Node.TEXT_NODE) {
            const textContent = node.textContent?.trim() ?? "";
            if (textContent) {
              currentLine += textContent;
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const tagName = element.tagName.toLowerCase();

            if (tagName === "br") {
              // Process line break
              if (currentLine) {
                lines.push(currentLine);
                currentLine = "";
              } else if (lines.length > 0) {
                // Empty line for double breaks
                lines.push("");
              }
            } else if (tagName === "i") {
              // Add italic text without additional parentheses
              const italicText = element.textContent?.trim() ?? "";
              if (italicText) {
                currentLine += italicText;
              }
            } else if (tagName === "a") {
              // Handle links (may contain spans)
              const span = element.querySelector("span");
              const linkText =
                span?.textContent?.trim() ?? element.textContent?.trim() ?? "";
              if (linkText) {
                currentLine += linkText;
              }
            } else if (tagName === "div") {
              // For divs, first finish current line if we have content
              if (currentLine) {
                lines.push(currentLine);
                currentLine = "";
              }

              // Process all children
              for (const child of Array.from(element.childNodes)) {
                processNode(child);
              }

              // Ensure we have a line break after div if needed
              if (currentLine) {
                lines.push(currentLine);
                currentLine = "";
              }
            } else {
              // For all other elements, just process their children
              for (const child of Array.from(element.childNodes)) {
                processNode(child);
              }
            }
          }
        };

        // Process all lyrics containers found
        lyricsContainers.forEach((container) => {
          // Process all direct children of lyrics container
          for (const child of Array.from(container.childNodes)) {
            processNode(child);
          }

          // Add a separator between different lyrics containers if we have multiple
          if (lyricsContainers.length > 1 && currentLine) {
            lines.push(currentLine);
            currentLine = "";
            lines.push("---"); // Optional separator between different lyric sections
          }
        });

        // Add any remaining content
        if (currentLine) {
          lines.push(currentLine);
        }

        // Clean up lines
        lines = lines
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .map((line) => {
            return line
              .replace(/\s+/g, " ") // Replace multiple spaces with single space
              .replace(/\[\s+/g, "[") // Clean up spaces after opening brackets
              .replace(/\s+\]/g, "]") // Clean up spaces before closing brackets
              .replace(/\(\s+/g, "(") // Clean up spaces after opening parentheses
              .replace(/\s+\)/g, ")"); // Clean up spaces before closing parentheses
          });

        setLyrics(lines);
      } catch (err) {
        console.error("Error processing lyrics:", err);
        setError("Failed to load lyrics");
      } finally {
        setIsLoading(false);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(processLyrics);
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
        <div className="flex flex-col space-y-1">
          {lyrics.map((line, index) => {
            const isHeader = line.startsWith("[") && line.endsWith("]");
            const isContributor = line.startsWith("(") && line.endsWith(")");
            const isSeparator = line === "---";
            const isTitle = line.includes("için şarkı sözleri");

            return (
              <div
                key={index}
                className={`
                  ${isTitle ? "mb-6" : ""}
                  ${isHeader ? "mb-3 mt-6" : ""}
                  ${isContributor ? "mb-2" : ""}
                  ${isSeparator ? "my-6 border-t border-gray-300" : ""}
                `}
              >
                {!isSeparator ? (
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
                    `}
                  >
                    {line}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
