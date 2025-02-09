import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { StatusTracking } from "../../../components/inventory/status-tracking"; // Ensure the path is correct
import { RentingRequest } from "@/app/types/game"; // Ensure the type is correct
import ModalUpdateBg from "@/components/inventory/modal-update-bg";
import DeleteBoardgame from "@/components/inventory/delete-bg";
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const rentingRequest: RentingRequest = {
    id: 17,
    start_date: "2021-07-01",
    end_date: "2021-07-08",
    status: "pending",
    customer_id: "1",
    bg_id: 1,
    created_at: "2021-07-01",
  };
  const boardgame = {
    id: 10,
    provier_id: "1",
    bg_name: "Catan",
    description:
      "Catan is a multiplayer board game where players collect resources and use them to build roads, settlements and cities in order to earn points.",
    bg_picture: "https://images.unsplash.com/photo-1612838394323-0c3c4e5c4d0e",
    price: 10,
    created_at: "2022-01-01T00:00:00.000000Z",
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>user profile page</div>
          <StatusTracking rentingRequest={rentingRequest} />{" "}
          <ModalUpdateBg boardgame={boardgame} />
          <DeleteBoardgame boardgameId={boardgame.id} />
          {/* Ensure the prop is passed correctly */}
        </div>
      </main>
    </>
  );
}
