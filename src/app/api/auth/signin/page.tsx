"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function LoginPage() {
  const handleSpotifyLogin = async () => {
    await signIn("spotify", { callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="mt-6">
          <div className="mt-6">
            <Button
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1DB954] px-4 py-2 text-white transition-colors duration-300 hover:bg-[#1ED760]"
              onClick={handleSpotifyLogin}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Continue with Spotify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
