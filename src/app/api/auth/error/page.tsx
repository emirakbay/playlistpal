import { type NextPage } from "next";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface AuthErrorProps {
  searchParams: {
    error?: string;
  };
}

function getErrorMessage(error: string | undefined): string {
  switch (error) {
    case "Configuration":
      return "There is a problem with the server configuration.";
    case "AccessDenied":
      return "You do not have permission to sign in.";
    case "Verification":
      return "The verification link has expired or has already been used.";
    default:
      return "An error occurred during authentication.";
  }
}

const AuthErrorPage: NextPage<AuthErrorProps> = ({ searchParams }) => {
  const errorMessage = getErrorMessage(searchParams.error);

  return (
    <div className="container flex min-h-screen items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-destructive">
            Authentication Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">{errorMessage}</p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/api/auth/signin">Return to Sign In</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthErrorPage;
