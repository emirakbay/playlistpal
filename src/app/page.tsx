/* eslint-disable*/
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const fetchTopSongs = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=12`,
      {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      },
    );
    const data = await res.json();
    return data;
  };

  const songs = await fetchTopSongs();

  return (
    <>
      <div className="flex h-16 flex-row items-center justify-center bg-black">
        <span className="text-white">Top Tracks Lately</span>
      </div>
      <section className="flex-col items-center bg-gradient-to-b from-[#1db954] to-[#1ed760] p-2 px-20 align-top text-white sm:max-h-max md:pt-28 lg:flex lg:h-[calc(100vh-4rem)]">
        <div className="grid items-baseline gap-10 lg:grid-cols-6">
          {songs.items.map((song: any) => {
            return (
              <div key={song.id} className="flex flex-col sm:items-center">
                <Image
                  src={song.album.images[0].url}
                  alt={song.album.name}
                  className="h-auto w-auto rounded-md"
                  width={150}
                  height={150}
                />
                <div className="flex flex-col items-center text-black">
                  <span className="whitespace-nowrap">{song.name}</span>
                  <span className="text-sm">{song.artists[0].name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
