import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface userData {
  uid: string;
  email: string;
  username: string;
  profilePicture: string;
  phoneNumber: string;
  paymentMethod: string;
  isProvider: boolean;
  is_verified: boolean;
  is_disabled: boolean;
  location: string;
  credentials: string;
  maxQuota: number;
  created_at: string;
  admin_id: Number;
  is_admin: boolean;
}

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
          <div>manage provider page</div>
        </div>
      </main>
    </>
  );
}
