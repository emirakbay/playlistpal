import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (request.nextUrl.pathname === "/") {
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
    "/((?!api|_next/static|_next/image|favicon.ico|playlistpal.png|spotify-logo.svg).*)",
  ],
};
