import Counter from "@/components/counter";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { selectVerificationRequest } from "./(admin-pages)/actions";

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
      if (user_data_value.isProvider) {
        try {
          const req = await selectVerificationRequest(user_data_value.uid);
          if (req) sentVerifyReq = req.status;
        }
        catch { }
      }

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
                { (sentVerifyReq === "pending") && <div className="border rounded-md p-2 text-info border-info" >Waiting For Verification</div> }
                { (sentVerifyReq === "verified") && <div className="border rounded-md p-2 text-green-400 border-green-400" >Verification Completed!</div> }
                { (sentVerifyReq === "") && <Link className="btn btn-outline btn-primary" href="/provider-form">Request For Verification</Link> }
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
