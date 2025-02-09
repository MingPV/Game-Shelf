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

  console.log(user);

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

  const credName = randomUUID();

  const { error: uploadError } = await supabase.storage
    .from("credentials")
    .upload(credName, credentials);

  if (uploadError) {
    console.log("Upload file error.", uploadError);
    return;
  }

  const publicCredentialsImageURL = supabase.storage
    .from("credentials")
    .getPublicUrl(credName).data.publicUrl;

  console.log("credentials:", publicCredentialsImageURL);

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
    console.log("Update Provider Error:", error);
    encodedRedirect("error", "/", "Failed to update provider.");
  }

  return encodedRedirect("success", "/", "Update provider success.");
};
