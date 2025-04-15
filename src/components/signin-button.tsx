"use client";

import { signIn } from "next-auth/react";
import { SpotifyLogo } from "~/components/ui/spotify-logo";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface SignInButtonProps {
  providerId: string;
  providerName: string;
  className?: string;
}

export function SignInButton({
  providerId,
  providerName,
  className,
}: SignInButtonProps) {
  return (
    <Button
      className={cn("h-14 text-lg", className)}
      size="lg"
      onClick={() => signIn(providerId, { callbackUrl: "/" })}
    >
      <SpotifyLogo className="mr-2 h-10 w-10" /> Login with {providerName}
    </Button>
  );
}
