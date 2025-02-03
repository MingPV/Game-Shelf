import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProviderCard from "./provider-card";
import { selectAllVerificationRequest } from "../actions";

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

  const res = await selectAllVerificationRequest();
  console.log("All verification requests\n", res);

  return (
    <>
      <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center w-10/12">
          <div className="text-2xl font-bold pb-2">Manage Provider Page</div>
          <div className="flex flex-col bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full"> 
            <div className="text-lg pb-4 font-bold"> Provider Verification Requests </div>
            <div className="flex flex-col gap-4 w-full">
              {
                res.map((item, index) => (
                  <ProviderCard key={index} params={item} />
                ))
                
              }
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
