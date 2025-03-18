import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ReportFormCard from "@/components/user-pages/report-form-card";
import { selectVerificationRequest } from "@/app/(admin-pages)/actions";

export default async function ProviderForm() {
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
      console.log("userId: ", user_data_value.uid);
    }
  } else {
    redirect("/sign-in");
  }

//   const req = await selectVerificationRequest(user_data_value.uid);
//   if (req) redirect("/home");

  return <ReportFormCard userData={user_data_value} />;
}
