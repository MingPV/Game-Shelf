// function in (rental-pages)

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const selectMyRentingRequest = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

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

  if (!user) {
    redirect("/sign-in");
  }

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

export const selectMyRentingRequestByStatus = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const status = formData.get("status")?.toString();
  const month = formData.get("month")?.toString() || "undefined";
  const year = formData.get("year")?.toString() || "undefined";

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
