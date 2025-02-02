import GameCard from "@/components/game-card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 w-full items-center">
        <div className="flex flex-row space-x-6">
          <GameCard/>
          <GameCard/>
          <GameCard/>
        </div>
        <div>hello</div>
      </main>
    </>
  );
}
