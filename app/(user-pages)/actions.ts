// function in (user-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { url } from "inspector";
import { revalidatePath } from "next/cache";
import { error } from "console";
import { UserData } from "../types/user";

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
    .order("rental_success", { ascending: false })
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

export const getLast9Notifications = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("receiver_id", userId) //comment this on test
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

export const getAllNotifications = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("receiver_id", userId)
    .order("created_at", { ascending: false }); // Ensure latest notifications are fetched first

  if (error) {
    throw new Error("Failed to select all notifications.");
  }

  return data;
};

export const selectProvidersByFilterAction = async (
  name: string,
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

  // Step 1: Get total count first

  let count_items;
  let countError;

  const { count: count_itemstmp, error: countErrortmp } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true }) // head: true gets only the count, not the rows
    .ilike("username", `%${name}%`);

  count_items = count_itemstmp;
  countError = countErrortmp;

  let fetch_error = null;
  let fetch_data = null;

  if (countError) {
    console.error(countError);
  } else if (count_items !== null && count_items > 0) {
    // Step 2: Only fetch data if count > 0

    let query = supabase
      .from("users")
      .select("*", { count: "exact" })
      .ilike("username", `%${name}%`)
      .range(from, to);
    // .overlaps("types", selectedTypeFilter);

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
};

export const createReviewAction = async (
  customer_id: string,
  provider_id: string,
  comment: string,
  rating: number,
  bg_id: number,
  rental_id: number
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        customer_id: customer_id,
        provider_id: provider_id,
        comment: comment,
        rating: rating,
        bg_id: bg_id,
        rental_id: rental_id,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Failed to create review");
  }

  return { data, error };
};

export const updateRentalRequestRating = async (
  rental_id: number,
  rating: number
) => {
  const supabase = await createClient();

  await supabase
    .from("rental_requests")
    .update({
      rating: rating,
    })
    .eq("id", rental_id)
    .select();
};

export const updateProviderRating = async (
  provider_id: string,
  rating: number,
  averageRating: number,
  cnt: number
) => {
  const supabase = await createClient();

  await supabase
    .from("users")
    .update({
      rating: (averageRating * cnt + rating) / (cnt + 1),
      rating_count: cnt + 1,
    })
    .eq("uid", provider_id)
    .select();
};

export const selectReviewByProviderId = async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("provider_id", userId)
    .order("created_at", { ascending: false }); // Order by newest first

  if (error) {
    throw new Error("Failed to fetch top providers.");
  }

  return data;
};

export const updateUserAction = async (formData: FormData) => {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const username = formData.get("username")?.toString();
  const phoneNumber = formData.get("phoneNumber")?.toString();
  const location = formData.get("location")?.toString();

  const { data, error } = await supabase
    .from("users")
    .update({
      username: username,
      phoneNumber: phoneNumber,
      location: location,
    })
    .eq("uid", id);

  if (error) {
    encodedRedirect("error", "/", "Failed to update profile.");
  }

  revalidatePath("/");
  // return encodedRedirect("success", "/home", "Update boardgame success.");
  return;
};

export const banUserAction = async (uid: string, ban_until: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      is_banned: true,
      ban_start: new Date(),
      ban_until: new Date(ban_until),
    })
    .eq("uid", uid);

  if (error) {
    throw new Error("Failed to ban user");
  }

  console.log("ming");
  console.log(uid);
  console.log(ban_until);
  console.log(new Date(ban_until));

  // revalidatePath("/");
  // return encodedRedirect("success", "/home", "Update boardgame success.");
  return;
};

export const updateProviderAction2 = async (formData: FormData) => {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const username = formData.get("username")?.toString();
  const phoneNumber = formData.get("phoneNumber")?.toString();
  const location = formData.get("location")?.toString();
  const credentials = formData.get("credentials")?.toString();

  const { data, error } = await supabase
    .from("users")
    .update({
      username: username,
      phoneNumber: phoneNumber,
      location: location,
      credentials: credentials,
    })
    .eq("uid", id);

  if (error) {
    encodedRedirect("error", "/", "Failed to update profile.");
  }

  revalidatePath("/");
  // return encodedRedirect("success", "/home", "Update boardgame success.");
  return;
};

export const updateProfilePicAction = async (formData: FormData) => {
  const id = formData.get("id")?.toString();
  const profile_picture = formData.get("profile_picture") as File;
  const supabase = await createClient();

  let publicProfilePictureURL = null;
  let error_message2;
  console.log("profile_picture", profile_picture);
  if (
    profile_picture &&
    profile_picture.toString() != "undefined" &&
    profile_picture != undefined
  ) {
    const fileName = randomUUID();
    const { error: uploadError } = await supabase.storage
      .from("user_profiles")
      .upload(fileName, profile_picture);
    if (uploadError) {
      console.log("Upload file error.", uploadError);
      error_message2 = uploadError;
      return;
    }

    publicProfilePictureURL = supabase.storage
      .from("user_profiles")
      .getPublicUrl(fileName).data.publicUrl;

    const { data, error } = await supabase
      .from("users")
      .update({ profilePicture: publicProfilePictureURL })
      .eq("uid", id);
  }

  if (error_message2) {
    encodedRedirect("error", "/", "Failed to update boardgame.");
  }
  revalidatePath("/");
  // return encodedRedirect("success", "/home", "Update boardgame success.");
  return;
};

export const selectReceiptsByProviderId = async (providerId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("receipts")
    .select("*")
    .eq("provider_id", providerId);

  if (error) {
    throw new Error("Failed to fetch top providers.");
  }

  return data;
};

export const selectInfoByUsername = async (username: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();
  if (error) {
    throw new Error("Failed to fetch info from username");
  }

  return data;
};

export const selectInfoById = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", id)
    .single();
  if (error) {
    throw new Error("Failed to fetch info from username");
  }
  return data;
};

export const selectReports = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }
  console.log(user);

  const { data: user_data, error: getUserError } = await supabase
    .from("users")
    .select("*")
    .eq("uid", user?.id);
  console.log(user_data);

  if (getUserError) {
    console.log(getUserError);
    throw new Error("Failed to fetch user");
  }

  const { data, error } = await supabase
    .from("disputes")
    .select("*")
    .eq("reporter", user?.id)
    .order("status", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch report from player id.");
  }
  return data;
};

export const createReport = async (formData: FormData) => {
  const supabase = await createClient();

  console.log("reportFormData: ", formData);

  const reportType = formData.get("type")?.toString();
  const reporterId = formData.get("reporter")?.toString();
  const reportedId = formData.get("reported")?.toString();
  const rentalIdRaw = formData.get("rental_id");
  const rentalId = rentalIdRaw ? Number(rentalIdRaw) : null;
  const topic = formData.get("topic")?.toString();
  const details = formData.get("details")?.toString();

  const { data, error } = await supabase.from("disputes").insert([
    {
      type: reportType,
      reporter: reporterId,
      report_to: reportedId,
      rental_id: rentalId,
      title: topic,
      details: details,
      status: "waiting",
    },
  ]);

  if (error) {
    console.log("error", error);
    throw new Error("Failed to create report.");
  }

  console.log([
    {
      type: reportType,
      reporter: reporterId,
      report_to: reportedId,
      rental_id: rentalId,
      title: topic,
      details: details,
      status: "waiting",
    },
  ]);
};

export const selectUsersByFilterAction = async (name: string) => {
  console.log("test");
  const supabase = await createClient();

  // Step 1: Get total count first

  let count_items;
  let countError;

  const { count: count_itemstmp, error: countErrortmp } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true }) // head: true gets only the count, not the rows
    .ilike("username", `%${name}%`);

  count_items = count_itemstmp;
  countError = countErrortmp;

  let fetch_error = null;
  let fetch_data = null;

  if (countError) {
    console.error(countError);
  } else if (count_items !== null && count_items > 0) {
    // Step 2: Only fetch data if count > 0

    let query = supabase
      .from("users")
      .select("*", { count: "exact" })
      .ilike("username", `%${name}%`);

    // .overlaps("types", selectedTypeFilter);

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
};

export const selectRentalRequestsByProviderId = async (providerId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rental_requests")
    .select("*, boardgames(*), users!rental_requests_customer_id_fkey(*)")
    .eq("provider_id", providerId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch rental requests.");
  }

  return data;
};

export const selectRentalRequestsByPlayerId = async (playerId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rental_requests")
    .select("*, boardgames(*), users!rental_requests_provider_id_fkey(*)")
    .eq("customer_id", playerId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch rental requests.");
  }

  return data;
};

export const selectBannedUserByDateAndName = async (
  month: string,
  year: string,
  username: string
) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // if (month !== "undefined" && year !== "undefined") {
  const curMonth = parseInt(month) + 1;
  const curYear = parseInt(year);

  const nextMonth = curMonth + 1;
  const nextYear = nextMonth === 13 ? curYear + 1 : curYear;

  let query = supabase
    .from("users")
    .select("*")
    .eq("is_banned", true)
    .lt("ban_start", `${nextYear}-${nextMonth.toString().padStart(2, "0")}-01`) // Started before the next month
    .gt("ban_until", `${curYear}-${curMonth.toString().padStart(2, "0")}-01`); // Ends after the start of the selected month

  // If username is provided, add it to the query
  if (username != "") {
    query = query.ilike("username", `%${username}%`);
  }

  const { data, error } = await query;
  return data;
};

export const unbanUserAction = async (uid: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      is_banned: false,
      ban_start: null,
      ban_until: null,
    })
    .eq("uid", uid);

  if (error) {
    throw new Error("Failed to ban user");
  }

  // revalidatePath("/");
  // return encodedRedirect("success", "/home", "Update boardgame success.");
  return;
};
