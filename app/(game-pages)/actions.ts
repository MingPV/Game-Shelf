// function in (game-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { json } from "stream/consumers";
import { fetchGamesByFilterAction } from "@/lib/testService";

export const addGameAction = async (formData: FormData) => {
  const boardgame_name = formData.get("boardgame_name")?.toString();
  const description = formData.get("description")?.toString();
  const bg_picture = formData.get("bg_picture") as File;
  const price = formData.get("price")?.toString();
  const boardgame_type = formData.getAll("boardgame_type");
  const quantity = formData.get("quantity")?.toString();
  const supabase = await createClient();

  const fileName = randomUUID();

  let addGameError;

  if (
    bg_picture &&
    bg_picture.toString() != "undefined" &&
    bg_picture != undefined
  ) {
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
        quantity: quantity,
      },
    ]);
    addGameError = error;
  } else {
    const { data, error } = await supabase.from("boardgames").insert([
      {
        bg_name: boardgame_name,
        description: description,
        price: price,
        types: boardgame_type,
        quantity: quantity,
      },
    ]);
    addGameError = error;
  }

  if (addGameError) {
    encodedRedirect("error", "/home", "Failed to add boardgame.");
  }

  // return encodedRedirect("success", "/home", "Add boardgame success.");
  revalidatePath("/");
  return;
};

export const updateGameAction = async (formData: FormData) => {
  const boardgame_name = formData.get("boardgame_name")?.toString();
  const description = formData.get("description")?.toString();
  const bg_picture = formData.get("bg_picture") as File;
  const price = formData.get("price")?.toString();
  const id = formData.get("id")?.toString();
  const boardgame_type = formData.getAll("boardgame_type");
  const quantity = formData.get("quantity")?.toString();
  const supabase = await createClient();

  let publicBoardgamePictureURL = null;
  let error_message2;

  if (
    bg_picture &&
    bg_picture.toString() != "undefined" &&
    bg_picture != undefined
  ) {
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
        bg_picture: publicBoardgamePictureURL,
        price: price,
        types: boardgame_type,
        quantity: quantity,
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
        quantity: quantity,
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

export const deleteGameAction = async (boardgameId: string) => {
  const supabase = await createClient();

  // const id = formData.get("id")?.toString();

  const { data, error } = await supabase
    .from("boardgames")
    .delete()
    .eq("id", boardgameId);

  if (error) {
    encodedRedirect("error", "/home", "Failed to delete boardgame.");
  }

  // return encodedRedirect("success", "/home", "Delete boardgame success.");
  revalidatePath("/");
  return;
};

export const selectAllBoardgameType = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("boardgame_type").select("*");

  if (error) {
    throw new Error("Failed to fetch boardgame types");
  }
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

  const supabase = await createClient();
  const from = (page_to_fetch - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  // Step 1: Get total count first

  const query = supabase
    .from("boardgames")
    .select("*", { count: "exact", head: true }) // head: true gets only the count, not the rows
    .ilike("bg_name", `%${name}%`)
    .gte("price", price[0])
    .lte("price", price[1]);

  if (selectedTypeFilter.length) {
    query.overlaps("types", selectedTypeFilter);
  }

  const { count: count_items, error: countError } = await query;

  let fetch_error = null;
  let fetch_data = null;

  if (countError) {
    console.error(countError);
  } else if (count_items !== null && count_items > 0) {
    // Step 2: Only fetch data if count > 0

    let query = supabase
      .from("boardgames")
      .select("*", { count: "exact" })
      .ilike("bg_name", `%${name}%`)
      .gte("price", price[0])
      .lte("price", price[1])
      .range(from, to);
    // .overlaps("types", selectedTypeFilter);

    // Apply .overlaps() only if selectedTypeFilter is not empty
    query = selectedTypeFilter.length
      ? query.overlaps("types", selectedTypeFilter)
      : query;

    const { data, error } = await query;

    fetch_error = error;
    fetch_data = data;
  } else {
    console.log("No matching rows");
  }

  if (fetch_error) {
    console.log(fetch_error);
    throw new Error("Failed to fetch boardgames.");
  }

  return { fetch_data, count_items };
  // return fetchGamesByFilterAction(name, price, page, itemsPerPage, maxPage, selectedTypeFilter);
};

export const updateBaordgameStatus = async (
  bg_id: Number,
  status: string,
  renting: Number
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("boardgames")
    .update({
      status: status,
      renting: renting,
    })
    .eq("id", bg_id);

  return { data, error };
};

export const updateBoardgameRentingCount = async (bg_id: Number) => {
  const supabase = await createClient();

  const { data, error: fetchError } = await supabase
    .from("boardgames")
    .select("renting")
    .eq("id", bg_id)
    .single();

  if (fetchError) {
    console.error("Error fetching boardgame:", fetchError);
    return;
  }

  const { error: updateError } = await supabase
    .from("boardgames")
    .update({
      renting: data.renting - 1,
      status: "available",
    })
    .eq("id", bg_id);

  if (updateError) {
    console.error("Error updating boardgame:", updateError);
  } else {
    console.log("Boardgame updated successfully");
  }
};

export const selectReviewById = async (reviewId: number) => {
  const supabase = await createClient();

  // Fetch unpaid board game payments
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", reviewId)
    .single();

  if (error) {
    throw new Error(`Select review failed: ${error.message}`);
  }

  return data;
};

export const selectAllReviews = async () => {
  const supabase = await createClient();

  // Fetch unpaid board game payments
  const { data, error } = await supabase.from("reviews").select("*");

  if (error) {
    throw new Error(`Select review failed: ${error.message}`);
  }

  return data;
};

// not test yet
export const updateReviewById = async (
  reviewId: number,
  updatedFields: Partial<{
    customer_id: string;
    provider_id: string;
    comment: string;
    rating: number;
    bg_id: number;
    rental_id: number;
  }>
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .update(updatedFields)
    .eq("id", reviewId)
    .select()
    .single();

  if (error) {
    throw new Error(`Update review failed: ${error.message}`);
  }

  return data;
};

export const deleteReviewById = async (reviewId: number) => {
  const supabase = await createClient();

  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);

  if (error) {
    throw new Error(`Delete review failed: ${error.message}`);
  }

  return { success: true, message: "Review deleted successfully" };
};
