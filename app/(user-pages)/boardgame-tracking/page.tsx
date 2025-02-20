import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BoardGameCard from "@/components/boardgame-tracking/boardgame-card";
import { selectAllBoardgameType } from "@/app/(game-pages)/actions";
import { BoardgameItems } from "@/components/boardgame-tracking/boardgame-item";
export default async function TrackingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  let user_data_value = null;

  const { data: user_data, error } = await supabase
    .from("users")
    .select("*")

    // Filters
    .eq("uid", user?.id);

  // if (user_data) {
  //   if (user_data[0].is_admin) {
  //     redirect("/admin-homepage");
  //   } else if (!user_data[0].isProvider) {
  //     redirect("/home");
  //   } else {
  //     //  select index 0 of array [user_data] => user_data
  //     user_data_value = user_data[0];
  //   }
  // }

  return (
    <>
      <main className="w-full">
        {user_data ? (
          <div className="flex justify-center  text-3xl">
            {user_data[0].username}'s Board game
          </div>
        ) : null}

        <BoardgameItems provider_id={user?.id} />
      </main>
    </>
  );
}
