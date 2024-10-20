"use client";

import { signIn } from "next-auth/react";
import { SpotifyLogo } from "~/app/api/auth/signin/spotify-logo";
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
      className={cn("", className)}
      size="lg"
      onClick={() => signIn(providerId, { callbackUrl: "/" })}
    >
      <SpotifyLogo className="mr-2 h-6 w-6" /> Login with {providerName}
    </Button>
  );
}
