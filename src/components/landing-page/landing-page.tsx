import { BarChart2, Headphones, ListMusic } from "lucide-react";
import { Layout } from "~/three/components/dom/layout";
import { SignInButton } from "../signin-button";
import Beamed8Note from "./beamed-eight-note";
import EightNote from "./eight-note";

export default async function LandingPage() {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col bg-black bg-gradient-to-b text-gray-100">
        <main className="flex-1">
          <section
            className="relative h-[300px] w-full overflow-hidden md:h-[450px] lg:h-[600px]"
            id="hero-section"
          >
            <div className="absolute inset-0 z-0">
              <Beamed8Note />
            </div>
            <div className="relative z-10 flex h-full w-full items-center justify-center">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl/none">
                      Discover Your{" "}
                      <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
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
                    className="bg-white text-black hover:bg-black hover:text-white"
                  />
                </div>
              </div>
            </div>
          </section>
          <section
            id="features"
            className="w-full border-b py-12 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6">
              <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Unlock Your{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  Musical Insights
                </span>
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center rounded-lg bg-gray-900 p-6 text-center shadow-lg transition-transform hover:scale-105">
                  <BarChart2 className="mb-4 h-12 w-12 text-emerald-400" />
                  <h3 className="mb-2 text-xl font-bold">In-depth Analytics</h3>
                  <p className="text-gray-400">
                    Visualize your listening patterns and track your music
                    journey over time.
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-gray-900 p-6 text-center shadow-lg transition-transform hover:scale-105">
                  <ListMusic className="mb-4 h-12 w-12 text-green-400" />
                  <h3 className="mb-2 text-xl font-bold">Smart Playlists</h3>
                  <p className="text-gray-400">
                    Create dynamic playlists based on your mood, activity, or
                    listening history.
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-gray-900 p-6 text-center shadow-lg transition-transform hover:scale-105 sm:col-span-2 sm:mx-auto lg:col-span-1">
                  <Headphones className="mb-4 h-12 w-12 text-teal-400" />
                  <h3 className="mb-2 text-xl font-bold">
                    Personalized Recommendations
                  </h3>
                  <p className="text-gray-400">
                    Discover new artists and tracks tailored to your unique
                    taste.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section
            id="about"
            className="w-full border-t py-12 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Playlistpal
                  </span>
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Playlistpal is your personal music companion, designed to
                  enhance your Spotify experience. We&apos;re passionate about
                  helping music lovers like you discover new dimensions to your
                  listening habits.
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col items-center space-y-2 rounded-lg bg-gray-900 p-4 transition-transform hover:scale-105">
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
                      className="h-10 w-10 text-teal-400"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <h3 className="text-xl font-bold">User-Centric</h3>
                    <p className="text-sm text-gray-400">
                      Built with your music journey in mind
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-lg bg-gray-900 p-4 transition-transform hover:scale-105">
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
                      className="h-10 w-10 text-green-400"
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
                  <div className="flex flex-col items-center space-y-2 rounded-lg bg-gray-900 p-4 transition-transform hover:scale-105 sm:col-span-2 sm:mx-auto lg:col-span-1">
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
                      className="h-10 w-10 text-emerald-400"
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
            className="relative h-[300px] w-full overflow-hidden md:h-[450px] lg:h-[600px]"
          >
            <div className="absolute inset-0 z-0">
              <EightNote />
            </div>
            <div className="relative z-10 flex h-full w-full items-center justify-center">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                      Ready to{" "}
                      <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
                        Explore
                      </span>
                      ?
                    </h2>
                    <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Connect your Spotify account and start uncovering insights
                      about your music taste.
                    </p>
                  </div>
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
      </div>
    </Layout>
  );
}
