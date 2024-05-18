/* eslint-disable */
import {
  getServerSession,
  User,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import Spotify from "next-auth/providers/spotify";

import { env } from "~/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      access_token: string;
      refresh_token: string;
      expires_at: number;
      token_type: string;
      scope: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    // role: UserRole;
    id: string;
    name: string;
    access_token: string;
    refresh_token: string;
    expires_at: number;
    token_type: string;
    scope: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.providerAccountId,
          access_token: token.access_token,
          refresh_token: token.refresh_token,
          expires_at: token.expires_at,
          token_type: token.token_type,
          scope: token.scope,
        } as User,
        expires: session.expires.toString(),
      };
    },
    signIn: async ({ user, account, profile }) => {
      if (account?.provider === "spotify") {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user, account, profile, session }) => {
      if (token && Number(token.expires_at) * 1000 < Date.now()) {
        const refreshTokenUrl = "https://accounts.spotify.com/api/token";
        try {
          const response = await fetch(refreshTokenUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${Buffer.from(
                `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
              ).toString("base64")}`,
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
            }),
          });
          if (!response.ok) {
            throw token;
          }
          const data = await response.json();
          return {
            ...token,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_at: data.expires_in,
            token_type: data.token_type,
            scope: data.scope,
          };
        } catch (error) {
          console.log("Error refreshing access token", error);
        }
      }

      if (user) {
        token.accessToken = account?.access_token;
        token.refreshToken = account?.refresh_token;
        token.expiresIn = account?.expires_at;
        token.tokenType = account?.token_type;
        token.scope = account?.scope;
        return {
          ...account,
          name: user.name,
          id: user.id,
          access_token: account?.access_token,
          refresh_token: account?.refresh_token,
          expires_at: account?.expires_at,
          token_type: account?.token_type,
          scope: account?.scope,
        };
      }
      return token;
    },
  },
  providers: [
    Spotify({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          code_challenge_method: "S256",
          client_id: env.SPOTIFY_CLIENT_ID,
          scope:
            "user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-follow-read user-follow-modify",
          response_type: "code",
          redirect_uri: env.SPOTIFY_REDIRECT_URI,
        },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
