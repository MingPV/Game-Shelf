import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BoardgameItems } from "@/components/payment/bg-toPay-item";

export default async function ToPayPage() {
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
    } else if (user_data[0].isProvider) {
      redirect("/home");
    } else {
      //  select index 0 of array [user_data] => user_data
      user_data_value = user_data[0];
    }
  }

  return (
    <>
      <main className="w-full flex flex-col gap-5">
        {user_data ? (
          <div className="flex justify-center text-3xl">
            <p className="font-bold">{user_data[0].username}</p>'s to pay Boardgame
          </div>
        ) : null}
        <BoardgameItems player_id={user.id}/>
      </main>
    </>
  );
}
