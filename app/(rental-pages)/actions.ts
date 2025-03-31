// function in (rental-pages)

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { encodedRedirect } from "@/utils/utils";

export const selectMyRentingRequest = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
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

export const selectMyRentingRequestByStatus2 = async (status: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rental_requests, error: getRequestsError } = await supabase
    .from("rental_requests")
    .select(
      "*, boardgames(*), customer:users!rental_requests_customer_id_fkey(*)"
    )
    .eq("provider_id", user?.id)
    .eq("status", status);

  if (getRequestsError) {
    console.log(getRequestsError);
    throw new Error(
      `Failed to fetch my rental requests with status: ${status}`
    );
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

  if (!user) {
    redirect("/sign-in");
  }

  // const { data: user_data, error: getUserError } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("uid", user?.id);

  // if (getUserError) {
  //   console.log(getUserError);
  //   throw new Error("Failed to fetch user");
  // }

  const { data: rental_requests, error: getRequestsError } = await supabase
    .from("rental_requests")
    .select(
      "*, boardgames(*), provider:users!rental_requests_provider_id_fkey(*)"
    )
    .eq("customer_id", user?.id);

  if (getRequestsError) {
    console.log(getRequestsError);
    throw new Error("Failed to fetch my rental requests");
  }

  console.log(rental_requests);

  return rental_requests;
};

export const createRentalRequest = async (
  start_date: Date,
  end_date: Date,
  customer_id: string,
  provider_id: string,
  bg_id: Number
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rental_requests")
    .insert([
      {
        start_date: start_date,
        end_date: end_date,
        customer_id: customer_id,
        provider_id: provider_id,
        bg_id: bg_id,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Failed to create rental request");
  }

  return { data, error };
};

export const selectMyRentingRequestByStatus = async (
  status: string,
  month: string,
  year: string
) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // const status = formData.get("status")?.toString();
  // const month = formData.get("month")?.toString() || "undefined";
  // const year = formData.get("year")?.toString() || "undefined";

  if (month !== "undefined" && year !== "undefined") {
    const curMonth = parseInt(month) + 1;
    const curYear = parseInt(year);

    const nextMonth = curMonth + 1;
    const nextYear = nextMonth === 13 ? curYear + 1 : curYear;

    const { data: user_data, error: getUserError } = await supabase
      .from("users")
      .select("*")
      .eq("uid", user?.id);

    if (getUserError) {
      console.log(getUserError);
      throw new Error("Failed to fetch user");
    }

    const { data: rentalRequests, error } = await supabase
      .from("rental_requests")
      .select(
        `
    *,
    boardgames:bg_id (*),
    users:customer_id(*)
  `
      )
      .eq("provider_id", user?.id)
      .eq("status", status)
      .gte(
        "start_date",
        `${curYear}-${curMonth.toString().padStart(2, "0")}-01`
      ) // Filter for the first day of the current month
      .lt(
        "start_date",
        `${nextYear}-${nextMonth.toString().padStart(2, "0")}-01`
      ); // Filter for the first day of the next month, using nextMonth

    if (error) {
      console.log(error);
      throw new Error("Failed to fetch my rental requests");
    }

    console.log(`${curYear}-${curMonth.toString().padStart(2, "0")}-01`);
    console.log(`${nextYear}-${nextMonth.toString().padStart(2, "0")}-01`);
    console.log("----------------------------------------------------");
    return rentalRequests;
  }

  const { data: rentalRequests, error } = await supabase
    .from("rental_requests")
    .select(
      `
    *,
    boardgames:bg_id (*),
    users:customer_id(*)
  `
    )
    .eq("provider_id", user?.id)
    .eq("status", status);

  if (error) {
    console.log(error);
    throw new Error("Failed to fetch my rental requests");
  }

  return rentalRequests;
};

export const selectRentalRequestUnpaid = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: invoices, error: getInvoicesError } = await supabase
    .from("invoices") // Assuming your table is named "invoices"
    .select(
      `
    *,
    rental_requests (
      *,
      boardgames: bg_id (*),
      users: customer_id (*)
    )
  `
    )
    .eq("status", "pending")
    .eq("rental_requests.status", "unpaid")
    .eq("payout_to", user?.id);

  if (getInvoicesError) {
    console.log(getInvoicesError);
    throw new Error("Failed to fetch invoices");
  }

  // Return the invoices with their associated rental requests
  return invoices;
};

export const cancelMultipleInvoices = async (formData: FormData) => {
  const invoiceIds = formData.getAll("invoice_ids[]");
  console.log(invoiceIds);
  if (invoiceIds.length > 0) {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("cancel_multiple_invoices", {
      invoice_ids: invoiceIds,
    });

    if (error) {
      throw new Error(`Transaction failed: ${error.message}`);
    }

    return data;
  }
  return;
};

export const selectRentalRequestById = async (request_id: number) => {
  const supabase = await createClient();

  const { data: rental_requests, error: getRequestsError } = await supabase
    .from("rental_requests")
    .select("*")
    .eq("id", request_id)
    .single();

  if (getRequestsError) {
    console.log(getRequestsError);
    throw new Error("Failed to fetch a rental request");
  }

  return rental_requests;
};

export const updateUserRentalSuccess = async (rental_id: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rental_requests")
    .select("*")
    .eq("id", rental_id)
    .single();

  if (error) {
    throw new Error("Failed to fetch a rental request");
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("uid", data.provider_id)
    .single();

  if (userError) {
    throw new Error("Failed to fetch a user");
  }

  const new_rental_success = userData.rental_success + 1;

  const { data: updateData, error: updateError } = await supabase
    .from("users")
    .update({ rental_success: new_rental_success })
    .eq("uid", data.provider_id)
    .select();

  if (updateError) {
    throw new Error("Failed to update a user");
  }

  return updateData;
};

export const addImagetoRentalRequest = async (
  img: File,
  tag: string,
  request_id: number
) => {
  const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   console.error("User not authenticated");
  //   return;
  // }

  let publicImageURL = null;

  if (img.size > 0) {
    const randomName = `${request_id}-${tag}-${randomUUID()}`;
    console.log("File name:", randomName);

    const { error: uploadError } = await supabase.storage
      .from("evidence")
      .upload(randomName, img);

    if (uploadError) {
      console.log("Upload file error.", uploadError);
      return;
    }

    publicImageURL = supabase.storage.from("evidence").getPublicUrl(randomName)
      .data.publicUrl;

    console.log("evidence:", publicImageURL);
  }

  const { data, error } = await supabase
    .from("rental_requests")
    .update({
      [tag]: publicImageURL,
      [tag + "_timestamp"]: new Date().toISOString(),
    })
    .eq("id", request_id);

  if (error) {
    console.log(error);
    // encodedRedirect("error", "/my-rental", "Failed to update rental request.");
  }
};
