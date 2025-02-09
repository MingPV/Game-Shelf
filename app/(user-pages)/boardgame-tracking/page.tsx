import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BoardGameCard from "@/components/boardgame-tracking/bg-tracking-card";

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

  if (user_data) {
    if (user_data[0].is_admin) {
      redirect("/admin-homepage");
    } else if (!user_data[0].isProvider) {
      redirect("/");
    } else {
      //  select index 0 of array [user_data] => user_data
      user_data_value = user_data[0];
    }
  }

  const { data: boardgames } = await supabase
    .from("boardgames")
    .select("*")

    // Filters
    .eq("provider_id", user?.id);

  return (
    <>
      <main>
        {user_data ? (
          <div className="flex justify-center w-screen text-3xl">
            {user_data[0].username}'s Board game
          </div>
        ) : null}
        <div className="border-b border-white w-3/5 mx-auto mb-5 pb-2">
          board game type
        </div>

        {/*card mapping*/}
        <div className="w-3/5 mx-auto bg-gradient-to-l from-slate-700 to-stone-600 rounded-2xl p-5">
          {boardgames?.map((boardgame) => (
            <BoardGameCard
              key={boardgame.id}
              name={boardgame.bg_name}
              picture={boardgame.bg_picture}
              status={boardgame.status}
              price={boardgame.price}
              description={boardgame.description}
            />
          ))}
        </div>
      </main>
    </>
  );
}
