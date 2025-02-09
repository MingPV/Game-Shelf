// function in (game-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

export const addGameAction = async (formData: FormData) => {
  const boardgame_name = formData.get("boardgame_name")?.toString();
  const description = formData.get("description")?.toString();
  const bg_picture = formData.get("bg_picture") as File;
  const price = formData.get("price")?.toString();

  const supabase = await createClient();

  const fileName = randomUUID();

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
    encodedRedirect("error", "/home", "Failed to add boardgame.");
  }

  return encodedRedirect("success", "/home", "Add boardgame success.");
};

export const updateGameAction = async (formData: FormData) => {
  const boardgame_name = formData.get("boardgame_name")?.toString();
  const description = formData.get("description")?.toString();
  const bg_picture = formData.get("bg_picture")?.toString();
  const price = formData.get("price")?.toString();
  const id = formData.get("id")?.toString();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("boardgames")
    .update({
      bg_name: boardgame_name,
      description: description,
      bg_picture: bg_picture,
      price: price,
    })
    .eq("id", id);

  if (error) {
    encodedRedirect("error", "/home", "Failed to update boardgame.");
  }

  return encodedRedirect("success", "/home", "Update boardgame success.");
};

export const deleteGameAction = async (formData: FormData) => {
  const supabase = await createClient();

  const id = formData.get("id")?.toString();

  const { data, error } = await supabase
    .from("boardgames")
    .delete()
    .eq("id", id);

  if (error) {
    encodedRedirect("error", "/home", "Failed to delete boardgame.");
  }

  return encodedRedirect("success", "/home", "Delete boardgame success.");
};

export const selectGameAction = async (id: Number) => {
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

  return data;
};

export const selectGamesByFilterAction = async (
  name: string,
  price: [number, number],
  page: number,
  itemsPerPage: number,
  maxPage: number
) => {
  let page_to_fetch = page;

  if (page > maxPage) {
    page_to_fetch = 1;
  }

  const supabase = await createClient();
  const from = (page_to_fetch - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data, error, count } = await supabase
    .from("boardgames")
    .select("*", { count: "exact" })
    .like("bg_name", `%${name}%`)
    .gte("price", price[0])
    .lte("price", price[1])
    .range(from, to);

  if (error) {
    console.log("error22222");
    console.log(error);
    throw new Error("Failed to fetch boardgames.");
  }

  return { data, count };
};
