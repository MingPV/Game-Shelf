// function in (user-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { url } from "inspector";

export const updateProviderAction = async (formData: FormData) => {
  const profile_image = formData.get("profile_image") as File;
  const phone_number = formData.get("phone_number")?.toString();
  const location = formData.get("location")?.toString();
  const payment_method = formData.get("payment_method")?.toString();
  const credentials = formData.get("credentials") as File;
  const userId = formData.get("userId")?.toString();

  console.log("Update Provider");
  console.log(formData);

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }

  console.log(user);

  let publicProfileImageURL = "";

  if (profile_image) {
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
        .upload(credName, profile_image);
        
    if (uploadError) {
        console.log("Upload file error.", uploadError);
        return;
    }

    const publicCredentialsImageURL = supabase.storage
        .from("credentials")
        .getPublicUrl(credName).data.publicUrl;

    console.log("credentials:", publicCredentialsImageURL);

  const { data, error } = await supabase
    .from("users")
    .update({
      profilePicture: publicCredentialsImageURL,
      phoneNumber: phone_number,
      paymentMethod: payment_method,
      credentials: publicCredentialsImageURL,
    })
    .eq("uid", userId);

  if (error) {
    encodedRedirect("error", "/", "Failed to update provider.");
  }

  return encodedRedirect("success", "/", "Update provider success.");
};

