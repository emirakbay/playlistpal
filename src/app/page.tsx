import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {

  const session = await getServerAuthSession();
  console.log("🚀 ~ HomePage ~ session:", session)

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      spotify app
      {
        session && (
          <div className="flex flex-col gap-1">
            <h1>Logged in as {session.user.email}</h1>
            <a href="/api/auth/signout" className="px-2 rounded-md bg-black text-center place-self-center">Sign out</a>
          </div>
        )
      }
    </main>
  );
}
