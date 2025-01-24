import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  let admin_id = null;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: user_data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", user?.id);

  if (!user) {
    redirect("/sign-in");
  }

  if (user_data) {
    if (!user_data[0].is_admin) {
      redirect("/");
    }
    admin_id = user_data[0].admin_id;
  }

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>Welcome back admin number : {admin_id}</div>
          <button className="btn bg-base-300">Click me</button>
          <div>{user?.email}</div>
        </div>
      </main>
    </>
  );
}
