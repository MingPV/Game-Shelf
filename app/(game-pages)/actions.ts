// function in (game-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const addGameAction = async (formData: FormData) => {
  const boardgame_name = formData.get("boardgame_name")?.toString();
  const description = formData.get("description")?.toString();
  const bg_picture = formData.get("bg_picture")?.toString();
  const price = formData.get("price")?.toString();

  const supabase = await createClient();

  const { data, error } = await supabase.from("boardgames").insert([
    {
      bg_name: boardgame_name,
      description: description,
      bg_picture: bg_picture,
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
    encodedRedirect("error", "/", "Failed to update boardgame.");
  }

  return encodedRedirect("success", "/", "Update boardgame success.");
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

  return encodedRedirect("success", "/", "Delete boardgame success.");
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
