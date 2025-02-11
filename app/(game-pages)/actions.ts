// function in (game-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { json } from "stream/consumers";

export const addGameAction = async (formData: FormData) => {
  console.log("get formData, add game : ", formData);
  const boardgame_name = formData.get("boardgame_name")?.toString();
  const description = formData.get("description")?.toString();
  const bg_picture = formData.get("bg_picture") as File;
  const price = formData.get("price")?.toString();
  const boardgame_type = formData.getAll("boardgame_type");
  // console.log("boardgame_type", boardgame_type);
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
      types: boardgame_type,
    },
  ]);

  if (error) {
    encodedRedirect("error", "/home", "Failed to add boardgame.");
  }

  // return encodedRedirect("success", "/home", "Add boardgame success.");
  revalidatePath("/");
  return;
};

export const updateGameAction = async (formData: FormData) => {
  console.log("formdata at update game action", formData);
  const boardgame_name = formData.get("boardgame_name")?.toString();
  const description = formData.get("description")?.toString();
  const bg_picture = formData.get("bg_picture") as File;
  const price = formData.get("price")?.toString();
  const id = formData.get("id")?.toString();
  const boardgame_type = formData.getAll("boardgame_type");

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
        types: boardgame_type,
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
        types: boardgame_type,
      })
      .eq("id", id);
    error_message2 = error_message;
  }

  if (error_message2) {
    encodedRedirect("error", "/", "Failed to update boardgame.");
  }
  revalidatePath("/");
  // return encodedRedirect("success", "/home", "Update boardgame success.");
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
    encodedRedirect("error", "/home", "Failed to delete boardgame.");
  }
  console.log("delete ", id);

  // return encodedRedirect("success", "/home", "Delete boardgame success.");
  revalidatePath("/");
  return;
};

export const selectAllBoardgameType = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("boardgame_type").select("*");

  if (error) {
    throw new Error("Failed to fetch boardgame types");
    console.log(error);
  }
  console.log("data boardgame type", data);
  console.log(error);

  return data;
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
  maxPage: number,
  selectedTypeFilter: string[]
) => {
  let page_to_fetch = page;

  if (page > maxPage) {
    page_to_fetch = 1;
  }

  console.log("from select action", selectedTypeFilter);

  const supabase = await createClient();
  const from = (page_to_fetch - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("boardgames")
    .select("*", { count: "exact" })
    .like("bg_name", `%${name}%`)
    .gte("price", price[0])
    .lte("price", price[1])
    .range(from, to);

  // Apply .overlaps() only if selectedTypeFilter is not empty
  query = selectedTypeFilter.length
    ? query.overlaps("types", selectedTypeFilter)
    : query;

  const { data, error, count } = await query;

  if (error) {
    console.log("error22222");
    console.log(error);
    throw new Error("Failed to fetch boardgames.");
  }

  return { data, count };
};

export const selectRentingRequest = async (boardgameId: Number) => {
  const supabase = await createClient();
  console.log(boardgameId);

  const { data, error } = await supabase
    .from("rental_requests")
    .select("*")
    .eq("bg_id", boardgameId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.log(error);
    throw new Error("Failed to fetch rental request");
  }
  console.log("renting req", data);

  return data;
};

export const selectProviderBoardgameByFilterAction = async (
  bg_name: string,
  providerId: string,
  selectedTypeFilter: string[]
) => {
  console.log("from select action", selectedTypeFilter);

  const supabase = await createClient();

  let query = supabase
    .from("boardgames")
    .select("*", { count: "exact" })
    .eq("provider_id", providerId)
    .like("bg_name", `%${bg_name}%`);

  // Apply .overlaps() only if selectedTypeFilter is not empty
  query = selectedTypeFilter.length
    ? query.overlaps("types", selectedTypeFilter)
    : query;

  const { data, error, count } = await query;

  if (error) {
    console.log("error22222");
    console.log(error);
    throw new Error("Failed to fetch boardgames.");
  }

  return { data, count };
};
