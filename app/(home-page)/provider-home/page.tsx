import VerificationButton from "@/components/user-pages/verification-button";
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

  let user_data_value = null;

  const { data: user_data, error } = await supabase
    .from("users")
    .select("*")

    // Filters
    .eq("uid", user?.id);

  if (user_data) {
    if (user_data[0].is_admin) {
      redirect("/admin-homepage");
    } else {
      //  select index 0 of array [user_data] => user_data
      user_data_value = user_data[0];
    }
  } else {
    redirect("/home");
  }

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center items-center mb-32">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>{user?.email}</div>
          <div>
            <div className="flex flex-col items-center gap-2">
              You are Provider
              <VerificationButton provider_id={user_data_value.uid} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
