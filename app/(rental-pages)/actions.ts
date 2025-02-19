// function in (rental-pages)

"use server";

import { createClient } from "@/utils/supabase/server";

export const selectMyRentingRequest = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: user_data, error: getUserError } = await supabase
    .from("users")
    .select("*")
    .eq("uid", user?.id);

  if (getUserError) {
    console.log(getUserError);
    throw new Error("Failed to fetch user");
  }

  const { data: rental_requests, error: getRequestsError } = await supabase
    .from("rental_requests")
    .select("*")
    .eq("provider_id", user?.id);

  if (getRequestsError) {
    console.log(getRequestsError);
    throw new Error("Failed to fetch my rental requests");
  }

  return rental_requests;
};

export const deleteRentingRequest = async (rental_id: number) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("rental_requests")
    .delete()
    .eq("id", rental_id);

  if (error) {
    console.log(error);
    throw new Error("Failed to delete rental request");
  }

  return { message: "delete rental request success." };
};

export const updateRentingRequestStatus = async (
  rental_id: number,
  status: string
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rental_requests")
    .update({ status: status })
    .eq("id", rental_id)
    .select();

  console.log("mingming");
  console.log(data);
  console.log(rental_id);

  if (error) {
    console.log(error);
    throw new Error("Failed to update rental request");
  }

  return data;
};

export const selectPlayerRentingRequest = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: user_data, error: getUserError } = await supabase
    .from("users")
    .select("*")
    .eq("uid", user?.id);

  if (getUserError) {
    console.log(getUserError);
    throw new Error("Failed to fetch user");
  }

  const { data: rental_requests, error: getRequestsError } = await supabase
    .from("rental_requests")
    .select("*")
    .eq("customer_id", user?.id);

  if (getRequestsError) {
    console.log(getRequestsError);
    throw new Error("Failed to fetch my rental requests");
  }

  return rental_requests;
};
