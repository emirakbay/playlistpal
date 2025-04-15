"use client";

import { useEffect, useState } from "react";

interface GeniusEmbedProps {
  embedContent: string;
}

export default function GeniusEmbed({ embedContent }: GeniusEmbedProps) {
  const [lyrics, setLyrics] = useState<string[]>([]);

  useEffect(() => {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = embedContent;

    // Find all divs with data-lyrics-container attribute
    const lyricsContainers = tempDiv.querySelectorAll(
      '[data-lyrics-container="true"]',
    );

    // Extract text content from each container while preserving structure
    const extractedLyrics = Array.from(lyricsContainers)
      .map((container) => {
        // Remove any script tags and other unwanted elements
        const cleanContainer = container.cloneNode(true) as HTMLElement;
        const scripts = cleanContainer.getElementsByTagName("script");
        Array.from(scripts).forEach((script) => script.remove());

        // Function to recursively extract text from nodes
        const extractText = (node: Node): string[] => {
          const lines: string[] = [];

          // Handle text nodes
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim() ?? "";
            if (text) {
              lines.push(text);
            }
          }
          // Handle element nodes
          else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;

            // Skip unwanted elements
            if (element.tagName === "SCRIPT" || element.tagName === "STYLE") {
              return lines;
            }

            // Check if this element should force a line break
            const shouldBreak =
              element.tagName === "BR" ||
              element.tagName === "P" ||
              element.tagName === "DIV";

            // Process child nodes
            Array.from(element.childNodes).forEach((child) => {
              const childLines = extractText(child);
              lines.push(...childLines);
            });

            // Add line break if needed
            if (shouldBreak && lines.length > 0) {
              lines.push("");
            }
          }

          return lines;
        };

        // Extract text from the container
        const lines = extractText(cleanContainer);

        // Join lines with newlines and clean up multiple empty lines
        return lines
          .join("\n")
          .replace(/\n{3,}/g, "\n\n") // Replace 3+ newlines with 2
          .trim();
      })
      .filter((text) => text.length > 0);

    setLyrics(extractedLyrics);
  }, [embedContent]);

  if (lyrics.length === 0) {
    return (
      <div className="mx-auto my-4 w-full max-w-2xl rounded-lg bg-gray-100 p-4">
        <p className="text-center text-gray-500">Loading lyrics...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto my-4 w-full max-w-2xl">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        {lyrics.map((verse, index) => (
          <div
            key={index}
            className="mb-4 whitespace-pre-line text-gray-800"
            data-lyrics-container="true"
          >
            {verse.split("\n").map((line, lineIndex) => {
              // Check if line is a section header (e.g., [Verse 1])
              const isHeader = line.startsWith("[") && line.endsWith("]");
              // Check if line is a contributor note
              const isContributor = line.startsWith("(") && line.endsWith(")");

              return (
                <p
                  key={lineIndex}
                  className={`mb-1 ${
                    isHeader
                      ? "font-bold text-blue-600"
                      : isContributor
                        ? "italic text-gray-500"
                        : ""
                  }`}
                >
                  {line}
                </p>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
