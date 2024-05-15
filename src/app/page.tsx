import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const fetchTopSongs = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10`,
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
      <div className="flex flex-row items-center justify-center bg-black">
        <span className="text-white">Spotify App</span>
      </div>
      <section className="flex h-[calc(100vh-1.50rem)] flex-col items-center bg-gradient-to-b from-[#3b6d02] to-[#172c15] pt-2 align-top text-white">
        <div className="flex flex-col items-baseline justify-center">
          {songs.items.map((song: any) => {
            return (
              <div
                key={song.id}
                className="flex flex-row items-center justify-center"
              >
                <img
                  src={song.album.images[0].url}
                  alt={song.album.name}
                  className="h-20 w-20 rounded-md"
                />
                <div className="flex flex-col items-center justify-center">
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
