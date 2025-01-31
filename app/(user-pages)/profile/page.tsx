import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { StatusTracking } from "../../../components/inventory/status-tracking"; // Ensure the path is correct
import { RentingRequest } from "@/app/types/game"; // Ensure the type is correct

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const rentingRequest: RentingRequest = {
    id: 1,
    start_date: "2021-07-01",
    end_date: "2021-07-08",
    status: "pending",
    customer_id: "1",
    bg_id: "1",
    created_at: "2021-07-01",
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>user profile page</div>
          <StatusTracking rentingRequest={rentingRequest} />{" "}
          {/* Ensure the prop is passed correctly */}
        </div>
      </main>
    </>
  );
}
