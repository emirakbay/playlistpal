/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default config;
