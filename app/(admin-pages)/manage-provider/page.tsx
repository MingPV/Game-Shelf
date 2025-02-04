import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import VerificationList from "@/components/admin-pages/verification-list";

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
      <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center w-10/12">
          <div className="text-2xl font-bold pb-2">Manage Provider Page</div>
          <VerificationList />
        </div>
      </main>
    </>
  );
}
