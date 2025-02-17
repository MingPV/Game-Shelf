// function in (user-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { url } from "inspector";
import { revalidatePath } from "next/cache";

export const updateProviderAction = async (formData: FormData) => {
  const profile_image = formData.get("profile_image") as File;
  const phone_number = formData.get("phone_number")?.toString();
  const location = formData.get("location")?.toString();
  const payment_method = formData.get("payment_method")?.toString();
  const credentials = formData.get("credentials") as File;
  const userId = formData.get("userId")?.toString();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }

  let publicProfileImageURL = null;

  if (profile_image.size > 0) {
    const profileName = randomUUID();

    const { error: uploadError } = await supabase.storage
      .from("user_profiles")
      .upload(profileName, profile_image);

    if (uploadError) {
      console.log("Upload file error.", uploadError);
      return;
    }

    publicProfileImageURL = supabase.storage
      .from("user_profiles")
      .getPublicUrl(profileName).data.publicUrl;

    console.log("profile:", publicProfileImageURL);
  }

  let publicCredentialsImageURL = null;
  const credName = randomUUID();

  if (
    credentials != undefined &&
    credentials.toString() != "undefined" &&
    credentials
  ) {
    const { error: uploadError } = await supabase.storage
      .from("credentials")
      .upload(credName, credentials);

    if (uploadError) {
      console.log("Upload file error.", uploadError);
      return;
    }

    publicCredentialsImageURL = supabase.storage
      .from("credentials")
      .getPublicUrl(credName).data.publicUrl;

    console.log("credentials:", publicCredentialsImageURL);
  }

  const updateData: Record<string, any> = {};

  if (publicProfileImageURL) updateData.profilePicture = publicProfileImageURL;
  if (phone_number) updateData.phoneNumber = phone_number;
  if (payment_method) updateData.paymentMethod = payment_method;
  if (location) updateData.location = location;
  if (publicCredentialsImageURL)
    updateData.credentials = publicCredentialsImageURL;

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("uid", userId);

  if (error) {
    encodedRedirect("error", "/home", "Failed to update provider.");
  }

  return encodedRedirect("success", "/home", "Update provider success.");
};

export const selectUserById = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", userId);

  if (error) {
    throw new Error("Failed to fetch User.");
  }

  return data;
};

export const getMyUserData = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", user.id);

  if (error) {
    throw new Error("Failed to fetch User.");
  }

  return data[0];
};

export const selectTopProvider = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("isProvider", true)
    .limit(10);

  if (error) {
    throw new Error("Failed to fetch top providers.");
  }

  return data;
};

export const createNotificationByUserId = async (
  userId: string,
  message: string
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .insert([{ receiver_id: userId, message: message }])
    .select();

  if (error) {
    throw new Error("Failed to insert a notification.");
  }

  return data;
};

export const selectLatestBoardgameRequestById = async (boardgameId: Number) => {
  const supabase = await createClient();

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
  const supabase = await createClient();

  let query = supabase
    .from("boardgames")
    .select("*", { count: "exact" })
    .eq("provider_id", providerId)
    .ilike("bg_name", `%${bg_name}%`);

  // Apply .overlaps() only if selectedTypeFilter is not empty
  query = selectedTypeFilter.length
    ? query.overlaps("types", selectedTypeFilter)
    : query;

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Failed to fetch boardgames.");
  }

  return { data, count };
};

export const getLast9Notifications = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("receiver_id", user.id)
    .order("created_at", { ascending: false }) // Ensure latest notifications are fetched first
    .limit(9); // Safer than range(0, 9)

  if (error) {
    throw new Error("Failed to select lastest notifications.");
  }

  return data;
};

export const updateReadNotification = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("receiver_id", user.id)
    .select();

  if (error) {
    throw new Error("Failed to update notifications.");
  }

  return data;
};

export const getAllNotifications = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("receiver_id", user.id)
    .order("created_at", { ascending: false }); // Ensure latest notifications are fetched first

  if (error) {
    throw new Error("Failed to select all notifications.");
  }

  return data;
};
