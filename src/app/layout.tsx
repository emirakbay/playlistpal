import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Menu } from "~/components/top-bar";
import { NextAuthProvider } from "~/providers";
import { getServerAuthSession } from "~/server/auth";

export const metadata = {
  title: "playlistpal",
  description:
    "Discover your top tracks and personalized music recommendations, tailored to your listening habits.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default async function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: never;
}) {
  const serverAuthSession = await getServerAuthSession();
  return (
    <html lang="en" className={`${GeistSans.variable} scroll-smooth`}>
      <NextAuthProvider session={session}>
        <body className="min-h-screen items-center bg-slate-900 text-white sm:flex-col lg:flex-row">
          {serverAuthSession && <Menu />}
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
