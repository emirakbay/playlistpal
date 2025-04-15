import { env } from "~/env";

const GENIUS_API_BASE = "https://api.genius.com";

export type GeniusArtist = {
  api_path: string;
  header_image_url: string;
  id: number;
  image_url: string;
  is_meme_verified: boolean;
  is_verified: boolean;
  name: string;
  url: string;
  iq?: number;
};

export type GeniusSong = {
  annotation_count: number;
  api_path: string;
  artist_names: string;
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  lyrics_owner_id: number;
  lyrics_state: string;
  path: string;
  primary_artist_names: string;
  pyongs_count: number | null;
  relationships_index_url: string;
  release_date_components: {
    year: number;
    month: number;
    day: number;
  };
  release_date_for_display: string;
  release_date_with_abbreviated_month_for_display: string;
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  stats: {
    unreviewed_annotations: number;
    hot: boolean;
    pageviews?: number;
  };
  title: string;
  title_with_featured: string;
  url: string;
  featured_artists: GeniusArtist[];
  primary_artist: GeniusArtist;
  primary_artists: GeniusArtist[];
};

export type GeniusSearchResult = {
  highlights: Array<{
    property: string;
    value: string;
    snippet: boolean;
  }>;
  index: string;
  type: string;
  result: GeniusSong;
};

export type GeniusSearchResponse = {
  meta: {
    status: number;
  };
  response: {
    hits: GeniusSearchResult[];
  };
};

export function findMatchingTrack(
  searchResponse: GeniusSearchResponse | undefined | null,
  trackName: string,
  artistNames: string[],
): GeniusSong | null {
  // Handle undefined or null response
  if (!searchResponse?.response?.hits) {
    console.log("No valid search response found");
    return null;
  }

  // Normalize the track name for comparison
  const normalizedTrackName = trackName.toLowerCase().trim();
  console.log("Searching for track:", normalizedTrackName);

  // Create a set of normalized artist names for comparison
  const normalizedArtistNames = new Set(
    artistNames.map((name) => name.toLowerCase().trim()),
  );
  console.log("Looking for artists:", Array.from(normalizedArtistNames));

  // Find the best matching track
  const matchingTrack = searchResponse.response.hits.find((hit) => {
    const song = hit.result;
    console.log("Checking song:", {
      title: song.title,
      fullTitle: song.full_title,
      primaryArtists: song.primary_artists.map((a) => a.name),
      featuredArtists: song.featured_artists.map((a) => a.name),
    });

    // Check if the track name matches (case-insensitive)
    const titleMatch =
      song.title.toLowerCase().includes(normalizedTrackName) ||
      song.full_title.toLowerCase().includes(normalizedTrackName);

    if (!titleMatch) {
      console.log("Title doesn't match");
      return false;
    }

    // Check if any of the primary artists match
    const primaryArtistMatch = song.primary_artists.some((artist) =>
      normalizedArtistNames.has(artist.name.toLowerCase()),
    );

    // Check if any of the featured artists match
    const featuredArtistMatch = song.featured_artists.some((artist) =>
      normalizedArtistNames.has(artist.name.toLowerCase()),
    );

    const artistMatch = primaryArtistMatch || featuredArtistMatch;
    console.log("Artist match result:", artistMatch);

    return artistMatch;
  });

  if (!matchingTrack) {
    console.log("No matching track found in search results");
  } else {
    console.log("Found matching track:", matchingTrack.result.title);
  }

  return matchingTrack?.result ?? null;
}

export async function getGeniusAccessToken() {
  const response = await fetch(`${GENIUS_API_BASE}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: env.GENIUS_CLIENT_ID,
      client_secret: env.GENIUS_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get Genius access token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function searchGenius(query: string) {
  const accessToken = await getGeniusAccessToken();

  const response = await fetch(
    `${GENIUS_API_BASE}/search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to search Genius");
  }

  return response.json();
}

export async function getSongLyrics(songId: string) {
  const accessToken = await getGeniusAccessToken();

  const response = await fetch(`${GENIUS_API_BASE}/songs/${songId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get song lyrics");
  }

  return response.json();
}
