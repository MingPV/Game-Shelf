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

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>user profile page</div>
          {/* <StatusTracking rentingRequest={rentingRequest} />{" "}
          <ModalUpdateBg boardgame={boardgame} />
          <DeleteBoardgame boardgameId={boardgame.id} /> */}
          {/* Ensure the prop is passed correctly */}
        </div>
      </main>
    </>
  );
}
