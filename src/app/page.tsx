import { type Session } from "next-auth";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { type Track } from "~/types/spotify-types";

export default async function HomePage() {
  const fetchTopSongs = async (session: Session) => {
    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=12`,
      {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      },
    );
    const data = (await res.json()) as { items: Track[] };
    return data;
  };

  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const songs = await fetchTopSongs(session);

  return (
    <>
      <div className="flex h-16 flex-row items-center justify-center bg-black">
        <span className="text-white">Top Tracks Lately</span>
      </div>
      <section className="flex-col items-center bg-gradient-to-b from-[#1db954] to-[#1ed760] p-2 px-20 align-top text-white sm:max-h-max md:pt-28 lg:flex lg:h-[calc(100vh-4rem)]">
        <div className="grid items-baseline gap-10 lg:grid-cols-6">
          {songs.items.map((song: Track, index: number) => (
            <div key={song.id} className="flex flex-col sm:items-center">
              <Image
                src={song.album.images[0]?.url as string | StaticImport}
                alt={song.album.name}
                className="h-auto w-auto rounded-md"
                width={150}
                height={150}
              />
              <div className="flex flex-col items-center text-black">
                <span className="whitespace-nowrap">
                  {index + 1}. {song.name}
                </span>
                <span className="text-sm">{song.artists[0]?.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
