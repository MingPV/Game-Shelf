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
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>game detail page</div>
          {/* maybe have to create more folder and show detail just like game-details/gameID-1 or game-details/gameID-2. */}
        </div>
      </main>
    </>
  );
}
