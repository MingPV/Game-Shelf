import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProviderFormCard from "@/components/user-pages/verification-form";
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
    } else if (!user_data[0].isProvider) {
      redirect("/home");
    } else {
      //  select index 0 of array [user_data] => user_data
      user_data_value = user_data[0];
    }
  } else {
    redirect("/sign-in");
  }

  const req = await selectVerificationRequest(user_data_value.uid);
  if (req) redirect("/home");

  return <ProviderFormCard providerId={user_data_value.uid} />;
}
