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
