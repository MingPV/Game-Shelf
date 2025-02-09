// function in (game-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export const addGameAction = async (formData: FormData) => {
  const boardgame_name = formData.get("boardgame_name")?.toString();
  const description = formData.get("description")?.toString();
  const bg_picture = formData.get("bg_picture") as File;
  const price = formData.get("price")?.toString();

  const supabase = await createClient();

  const fileName = randomUUID();

  console.log("test555");
  console.log(bg_picture);
  console.log(supabase.auth);

  const { error: uploadError } = await supabase.storage
    .from("boardgame_pictures")
    .upload(fileName, bg_picture);
  if (uploadError) {
    console.log("Upload file error.", uploadError);
    return;
  }

  console.log("Upload success.");

  const publicBoardgamePictureURL = supabase.storage
    .from("boardgame_pictures")
    .getPublicUrl(fileName).data.publicUrl;

  const { data, error } = await supabase.from("boardgames").insert([
    {
      bg_name: boardgame_name,
      description: description,
      bg_picture: publicBoardgamePictureURL,
      price: price,
    },
  ]);

  if (error) {
    encodedRedirect("error", "/", "Failed to add boardgame.");
  }

  return encodedRedirect("success", "/", "Add boardgame success.");
};

export const updateGameAction = async (formData: FormData) => {
  const boardgame_name = formData.get("boardgame_name")?.toString();
  const description = formData.get("description")?.toString();
  const bg_picture = formData.get("bg_picture") as File;
  const price = formData.get("price")?.toString();
  const id = formData.get("id")?.toString();

  const supabase = await createClient();

  let publicBoardgamePictureURL = null;
  let error_message2;

  console.log("testttttttt");
  console.log(formData);

  if (bg_picture) {
    const fileName = randomUUID();
    const { error: uploadError } = await supabase.storage
      .from("boardgame_pictures")
      .upload(fileName, bg_picture);
    if (uploadError) {
      console.log("Upload file error.", uploadError);
      return;
    }

    publicBoardgamePictureURL = supabase.storage
      .from("boardgame_pictures")
      .getPublicUrl(fileName).data.publicUrl;

    const { data, error: error_message } = await supabase
      .from("boardgames")
      .update({
        bg_name: boardgame_name,
        description: description,
        bg_picture: publicBoardgamePictureURL || undefined,
        price: price,
      })
      .eq("id", id);
    error_message2 = error_message;
  } else {
    const { data, error: error_message } = await supabase
      .from("boardgames")
      .update({
        bg_name: boardgame_name,
        description: description,

        price: price,
      })
      .eq("id", id);
    error_message2 = error_message;
  }

  if (error_message2) {
    encodedRedirect("error", "/", "Failed to update boardgame.");
  }
  revalidatePath("/");
  // return encodedRedirect("success", "/", "Update boardgame success.");
  return;
};

export const deleteGameAction = async (formData: FormData) => {
  const supabase = await createClient();

  const id = formData.get("id")?.toString();

  const { data, error } = await supabase
    .from("boardgames")
    .delete()
    .eq("id", id);

  if (error) {
    encodedRedirect("error", "/", "Failed to delete boardgame.");
  }
  console.log("delete ", id);

  // return encodedRedirect("success", "/", "Delete boardgame success.");
  revalidatePath("/");
  return;
};

export const selectGameAction = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("boardgames")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Failed to fetch boardgame.");
  }

  return data;
};

export const selectAllGamesAction = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("boardgames").select("*");

  if (error) {
    throw new Error("Failed to fetch boardgames.");
  }

  console.log("testttttt");
  console.log(data);

  return data;
};

export const selectGamesByPageAction = async (page: number) => {
  const supabase = await createClient();
  const itemsPerPage = 30;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data, error } = await supabase
    .from("boardgames")
    .select("*")
    .range(from, to);

  if (error) {
    throw new Error("Failed to fetch boardgames.");
  }

  return data;
};
