"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  addGameAction,
  updateGameAction,
  deleteGameAction,
  selectAllBoardgameType,
} from "../actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Home(props: { searchParams: Promise<Message> }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }
  const boardgameTypes = await selectAllBoardgameType();
  console.log("boardgame types ", boardgameTypes);

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>for adding games</div>
          <form className="flex flex-col min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">Add Game</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="boardgame_name">Boardgame Name</Label>
              <Input
                name="boardgame_name"
                placeholder="Boardgame Name"
                required
              />
              <Label htmlFor="description">Description</Label>
              <Input name="description" placeholder="Description" required />
              <Label htmlFor="bg_picture">Picture URL</Label>
              <input name="bg_picture" type="file" required />
              <Label htmlFor="price">Price</Label>
              <Input name="price" placeholder="Price" required />
              <Label htmlFor="boardgame_type">Boardgame Type</Label>
              <div className="flex flex-col gap-2">
                {boardgameTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="boardgame_type"
                      value={type.bg_type_id}
                      defaultChecked={type !== ""}
                    />
                    <p>{type.bg_types}</p>
                  </div>
                ))}
              </div>
              <SubmitButton formAction={addGameAction} pendingText="Adding...">
                Add Game
              </SubmitButton>
            </div>
          </form>
          <form className="flex flex-col min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">Update Game</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="id">Game ID</Label>
              <Input
                name="id"
                placeholder="Game ID (must auto fill and hidden this input field)"
                required
              />
              <Label htmlFor="boardgame_name">Boardgame Name</Label>
              <Input name="boardgame_name" placeholder="Boardgame Name" />
              <Label htmlFor="description">Description</Label>
              <Input name="description" placeholder="Description" />
              <Label htmlFor="bg_picture">Picture URL</Label>
              <input name="bg_picture" type="file" />
              <Label htmlFor="price">Price</Label>
              <Input name="price" placeholder="Price" />
              <SubmitButton
                formAction={updateGameAction}
                pendingText="Updating..."
              >
                Update Game
              </SubmitButton>
            </div>
          </form>
          <form className="flex flex-col min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">Delete Game</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="id">Game ID</Label>
              <Input
                name="id"
                placeholder="Game ID must be auto fill"
                required
              />
              <SubmitButton
                formAction={deleteGameAction}
                pendingText="Deleting..."
              >
                Delete Game
              </SubmitButton>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
