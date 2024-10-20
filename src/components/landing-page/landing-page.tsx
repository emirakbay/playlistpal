import { BarChart2, Headphones, ListMusic } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "../signin-button";

export default async function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <header className="flex h-16 items-center border-b border-gray-800 px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <Image
            src="/playlistpal.png"
            alt="Playlistpal Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="ml-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
            Playlistpal
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium transition-colors hover:text-indigo-400"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium transition-colors hover:text-indigo-400"
            href="#about"
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Discover Your{" "}
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Music DNA
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Uncover your listening habits, get personalized
                  recommendations, and dive deep into your Spotify stats.
                </p>
              </div>
              <SignInButton
                providerId="spotify"
                providerName="Spotify"
                className="bg-black text-white hover:bg-white hover:text-gray-900"
              />
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full bg-gray-800 py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Unlock Your{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Musical Insights
              </span>
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-gray-900 p-6 text-center shadow-lg transition-transform hover:scale-105">
                <BarChart2 className="mb-4 h-12 w-12 text-indigo-400" />
                <h3 className="mb-2 text-xl font-bold">In-depth Analytics</h3>
                <p className="text-gray-400">
                  Visualize your listening patterns and track your music journey
                  over time.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-gray-900 p-6 text-center shadow-lg transition-transform hover:scale-105">
                <ListMusic className="mb-4 h-12 w-12 text-purple-400" />
                <h3 className="mb-2 text-xl font-bold">Smart Playlists</h3>
                <p className="text-gray-400">
                  Create dynamic playlists based on your mood, activity, or
                  listening history.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-gray-900 p-6 text-center shadow-lg transition-transform hover:scale-105 sm:col-span-2 sm:mx-auto lg:col-span-1">
                <Headphones className="mb-4 h-12 w-12 text-pink-400" />
                <h3 className="mb-2 text-xl font-bold">
                  Personalized Recommendations
                </h3>
                <p className="text-gray-400">
                  Discover new artists and tracks tailored to your unique taste.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="w-full border-t border-gray-500 bg-gray-800 py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Playlistpal
                </span>
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Playlistpal is your personal music companion, designed to
                enhance your Spotify experience. We're passionate about helping
                music lovers like you discover new dimensions to your listening
                habits.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 rounded-lg bg-gray-900 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-indigo-400"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <h3 className="text-xl font-bold">User-Centric</h3>
                  <p className="text-sm text-gray-400">
                    Built with your music journey in mind
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg bg-gray-900 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-purple-400"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                  <h3 className="text-xl font-bold">Data-Driven</h3>
                  <p className="text-sm text-gray-400">
                    Powered by advanced analytics and insights
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg bg-gray-900 p-4 sm:col-span-2 sm:mx-auto lg:col-span-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 text-pink-400"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                  <h3 className="text-xl font-bold">Always Evolving</h3>
                  <p className="text-sm text-gray-400">
                    Continuously improving to serve you better
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="cta"
          className="w-full bg-gradient-to-r from-indigo-900 to-purple-900 py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to explore?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect your Spotify account and start uncovering insights
                  about your music taste.
                </p>
              </div>
              <div className="space-y-2">
                <SignInButton
                  providerId="spotify"
                  providerName="Spotify"
                  className="bg-white text-black hover:bg-black hover:text-white"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full bg-gray-900 py-6">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 justify-center justify-items-center gap-4 text-sm">
            <div>
              <h4 className="mb-2 font-semibold">Product</h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    className="transition-colors hover:text-indigo-400"
                    href="#"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="transition-colors hover:text-indigo-400"
                    href="#"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="transition-colors hover:text-indigo-400"
                    href="#"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Legal</h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    className="transition-colors hover:text-indigo-400"
                    href="#"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="transition-colors hover:text-indigo-400"
                    href="#"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    className="transition-colors hover:text-indigo-400"
                    href="#"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 border-t border-gray-800 pt-6">
            <div className="flex items-center gap-4">
              <Link
                className="text-sm transition-colors hover:text-indigo-400"
                href="#"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className=" h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
            <p className="text-xs text-gray-400">
              © 2024 SpotiStats. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
