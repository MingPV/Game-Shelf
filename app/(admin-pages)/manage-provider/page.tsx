import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import VerificationList from "@/components/admin-pages/verification-list";
import { Suspense } from "react";

export default async function ManageProvider() {
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
      redirect("/home");
    }
    admin_id = user_data[0].admin_id;
  }

  return <VerificationList adminId={admin_id} />;
}
