"use client";

import { Button } from "~/components/ui/button";
import { Music } from "lucide-react";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  providerId: string;
  providerName: string;
}

export function SignInButton({ providerId, providerName }: SignInButtonProps) {
  return (
    <Button
      className="bg-green-500 text-white hover:bg-green-600"
      size="lg"
      onClick={() => signIn(providerId, { callbackUrl: "/" })}
    >
      <Music className="mr-2 h-4 w-4" /> Sign in with {providerName}
    </Button>
  );
}
