import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isPrivacyPolicyPage = request.nextUrl.pathname === "/privacy-policy";
  const isTermsOfServicePage = request.nextUrl.pathname === "/terms-of-service";
  const isCookiePolicyPage = request.nextUrl.pathname === "/cookie-policy";

  if (
    request.nextUrl.pathname === "/" ||
    isPrivacyPolicyPage ||
    isTermsOfServicePage ||
    isCookiePolicyPage
  ) {
    return NextResponse.next();
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|playlistpal.png|spotify-logo.svg|musical_symbols__notes.glb).*)",
  ],
};
