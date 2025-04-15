import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    SPOTIFY_CLIENT_ID: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
    SPOTIFY_REDIRECT_URI: z.string(),
    SPOTIFY_DEVELOPMENT_REDIRECT_URI: z.string(),
    NEXT_PRODUCTION_URL: z.string(),
    REDIS_PW: z.string(),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.string(),
    ENCRYPTION_KEY: z.string(),
    ENCRYPTION_SALT: z.string(),
    GENIUS_CLIENT_ID: z.string(),
    GENIUS_CLIENT_SECRET: z.string(),
    GENIUS_ACCESS_TOKEN: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    SPOTIFY_DEVELOPMENT_REDIRECT_URI:
      process.env.SPOTIFY_DEVELOPMENT_REDIRECT_URI,
    NEXT_PRODUCTION_URL: process.env.NEXT_PRODUCTION_URL,
    REDIS_PW: process.env.REDIS_PW,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ENCRYPTION_SALT: process.env.ENCRYPTION_SALT,
    GENIUS_CLIENT_ID: process.env.GENIUS_CLIENT_ID,
    GENIUS_CLIENT_SECRET: process.env.GENIUS_CLIENT_SECRET,
    GENIUS_ACCESS_TOKEN: process.env.GENIUS_ACCESS_TOKEN,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
