import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import Footer from "~/components/footer/page";
import Menu from "~/components/menu";
import { NextAuthProvider } from "~/providers";

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
  return (
    <html lang="en" className={`${GeistSans.variable} scroll-smooth`}>
      <NextAuthProvider session={session}>
        <body className="min-h-screen items-center bg-black text-white sm:flex-col lg:flex-row">
          <Menu />
          {children}
          <Footer />
        </body>
      </NextAuthProvider>
    </html>
  );
}
