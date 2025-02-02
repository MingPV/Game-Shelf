import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProviderCard from "./provider-card";

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

const mock_provider : userData = {
  uid: "0001",
  email: "provider@gmail.com",
  username: "Username",
  profilePicture: "",
  phoneNumber: "02-222-2222",
  paymentMethod: "ABC Bank",
  isProvider: true,
  is_verified: false,
  is_disabled: false,
  location: "254 Phaya Thai Rd, Wang Mai, Pathum Wan, Bangkok 10330",
  credentials: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  maxQuota: 10,
  created_at: new Date().toLocaleString(),
  admin_id: 1,
  is_admin: false,
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
      <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center w-10/12">
          <div className="text-2xl font-bold pb-2">Manage Provider Page</div>
          <div className="flex flex-col bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full"> 
            <div className="text-lg pb-4 font-bold"> Provider Verification Requests </div>
            <ProviderCard params={mock_provider} />
          </div>
        </div>
      </main>
    </>
  );
}
