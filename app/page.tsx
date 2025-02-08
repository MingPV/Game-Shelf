import Counter from "@/components/counter";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import VerificationButton from "@/components/user-pages/verification-button";
export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let user_data_value = null;
  let sentVerifyReq: string = "";

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
  }


  console.log(user);

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>button from daisyUI</div>
          <button className="btn bg-base-300">Click me</button>
          <div>{user?.email}</div>
          <div>
            {user_data_value?.isProvider ? (
              <div className="flex flex-col items-center gap-2">
                You are Provider 
                <VerificationButton provider_id={user_data_value.uid} />
              </div>
            ) : (
              <div>You are Customer</div>
            )}
          </div>
        </div>
        <Counter />
      </main>
    </>
  );
}
