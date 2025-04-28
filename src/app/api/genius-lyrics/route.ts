import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    const isLocal = process.env.NODE_ENV === "development";

    const browser = await puppeteer.launch({
      args: [
        ...(isLocal ? puppeteer.defaultArgs() : chromium.args),
        "--disable-web-security",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-features=IsolateOrigins,site-per-process",
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      ],
      defaultViewport: { width: 1200, height: 800 },
      executablePath:
        process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath()),
      headless: chromium.headless,
    });

    try {
      const page = await browser.newPage();

      // Set cookies and headers to appear more like a real browser
      await page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      });

      // Navigate with shorter timeout and block unnecessary resources
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        const resourceType = request.resourceType();
        if (["image", "stylesheet", "font", "media"].includes(resourceType)) {
          request.abort();
        } else {
          request.continue();
        }
      });

      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      // Wait for lyrics container with shorter timeout
      await page.waitForSelector('[data-lyrics-container="true"]', {
        timeout: 10000,
      });

      const lyricsHtml = await page.evaluate(() => {
        const containers = document.querySelectorAll(
          '[data-lyrics-container="true"]',
        );
        return Array.from(containers)
          .map((container) => {
            // Clone the container to avoid modifying the original
            const clone = container.cloneNode(true) as HTMLElement;

            // Remove unwanted elements
            const unwantedSelectors = [
              "script",
              ".LyricsHeader__Container",
              ".ReferentFragment",
              '[data-exclude-from-selection="true"]',
              "noscript",
              ".InlineAvatar",
              ".Tooltip",
              ".MetadataTooltip",
            ];

            unwantedSelectors.forEach((selector) => {
              clone.querySelectorAll(selector).forEach((el) => el.remove());
            });

            // Replace <br> tags with newline characters
            clone.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));

            // Get the text content preserving line breaks
            const text = clone.textContent || "";

            // Split into lines and clean each line
            return text
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0)
              .join("\n");
          })
          .join("\n\n"); // Add extra line break between containers
      });

      await browser.close();

      return Response.json({
        html: lyricsHtml,
        url: url,
      });
    } catch (error) {
      await browser.close();
      throw error;
    }
  } catch (error) {
    console.error("Error extracting lyrics:", error);
    return Response.json(
      { error: "Failed to extract lyrics" },
      { status: 500 },
    );
  }
}
