import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Menu } from "~/components/top-bar";
import { NextAuthProvider } from "~/providers";

export const metadata = {
  title: "playlistpal",
  description:
    "Discover your top tracks and personalized music recommendations, tailored to your listening habits.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: never;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <NextAuthProvider session={session}>
        <body>
          <Menu />
          <section className="min-h-screen items-center bg-slate-900 text-white sm:flex-col lg:flex-row">
            {children}
          </section>
        </body>
      </NextAuthProvider>
    </html>
  );
}
