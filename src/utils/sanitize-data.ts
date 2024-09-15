/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Track } from "~/types/spotify-types";

const removeProperties = (obj: any, props: string[]) => {
  props.forEach((prop) => delete obj[prop]);
};

export const sanitizeTopSongsData = (data?: { items: Track[] } | Track[]) => {
  if (Array.isArray(data)) {
    data.forEach((item: any) => {
      removeProperties(item, ["available_markets"]);
    });
    data.forEach((item: any) => {
      removeProperties(item.album, [
        "album_type",
        "available_markets",
        "release_date",
        "release_date_precision",
        "total_tracks",
        "type",
      ]);
    });
  } else if (data) {
    data.items.forEach((item: any) => {
      removeProperties(item.album, [
        "album_type",
        "available_markets",
        "href",
        "release_date",
        "release_date_precision",
        "total_tracks",
        "type",
      ]);

      item.artists.forEach((artist: any) => {
        removeProperties(artist, [
          "available_markets",
          "external_urls",
          "href",
          "id",
          "uri",
        ]);
      });

      removeProperties(item, [
        "available_markets",
        "disc_number",
        "duration_ms",
        "explicit",
        "external_ids",
        "href",
        "is_local",
        "popularity",
        "preview_url",
        "track_number",
        "type",
      ]);
    });
  }
};
