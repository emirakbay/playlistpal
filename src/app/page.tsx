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
      `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=24`,
      {
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      },
    );
    const data = await res.json();
    return data;
  };

  const fetchProfile = async () => {
    const res = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${session.user.access_token}`,
      },
    });
    const data = await res.json();
    return data;
  };

  const songs = await fetchTopSongs();
  const profile = (await fetchProfile()) as any;
  console.log("🚀 ~ HomePage ~ profile:", profile);

  return (
    <>
      <div className="flex flex-row items-center justify-center bg-black">
        <span className="text-white">Spotify App</span>
      </div>
      <div className="flex flex-col items-center justify-center  bg-gradient-to-b from-[#3b6d02] to-[#172c15]">
        <span className="text-white">{profile.display_name}</span>
        <Image
          src={profile.images[1].url}
          alt={profile.display_name}
          className="h-20 w-20 rounded-md"
          width={300}
          height={300}
        />
        <span>{profile.email}</span>
        <span>{profile.country}</span>
        <span>{profile.product}</span>
        <span>{profile.followers.total}</span>
        <a href="/api/auth/signout" className="bg-green-600 px-2">
          sign out
        </a>
      </div>
      <section className="flex h-[calc(100vh-1.50rem)] flex-col items-center bg-gradient-to-b from-[#3b6d02] to-[#172c15] p-2 px-20 pt-2 align-top text-white">
        <div className="grid grid-cols-6 items-baseline gap-10">
          {songs.items.map((song: any) => {
            return (
              <div key={song.id} className="flex flex-col gap-5">
                <img
                  src={song.album.images[0].url}
                  alt={song.album.name}
                  className="h-20 w-20 rounded-md"
                />
                <div className="flex flex-col items-center justify-center font-semibold text-black">
                  <span className="self-baseline text-lg">{song.name}</span>
                  <span className="self-baseline text-sm">
                    {song.artists[0].name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
