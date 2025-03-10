// function in (payment-pages)

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { selectRentalRequestById } from "../(rental-pages)/actions";
import { Receipt } from "../types/receipt";
import { selectGameAction } from "../(game-pages)/actions";

export const selectMyToPayBoardGame = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //console.log(user);

  if (!user) {
    return redirect("/sign-in");
  }

  let user_data_value = null;

  const { data: user_data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", user?.id);

  if (user_data) {
    if (user_data[0].is_admin) {
      return redirect("/admin-homepage");
    } else if (user_data[0].isProvider) {
      return redirect("/home");
    } else {
      //  select index 0 of array [user_data] => user_data
      user_data_value = user_data[0];
    }
  }
  //console.log(user_data);
  return user_data;
};

export const selectToPayBoardGameById = async (playerId: string) => {
  const supabase = await createClient();

  // Fetch unpaid board game payments
  const { data: payments, error: paymentError } = await supabase
    .from("rental_requests")
    .select(
      "*, invoices(*), users!rental_requests_provider_id_fkey(*), boardgames(*)"
    )
    .eq("customer_id", playerId)
    .eq("status", "unpaid");

  if (paymentError || !payments) {
    console.error("Error fetching payments:", paymentError);
    return null;
  }

  console.log("Payments: ", payments);
  return payments;
};

export const selectMyReceipts = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //console.log(user);

  if (!user) {
    return redirect("/sign-in");
  }

  let user_data_value = null;

  const { data: user_data, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("uid", user?.id);

  if (userError) {
    throw new Error(`Select user failed: ${userError.message}`);
  }

  const { data, error } = await supabase
    .from("receipts")
    .select("*")
    .eq("provider_id", user_data[0].uid);

  if (error) {
    throw new Error(`Select receipts failed: ${error.message}`);
  }

  return data;
};

export const selectInvoiceById = async (invoiceId: number) => {
  const supabase = await createClient();

  // Fetch unpaid board game payments
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .single();

  if (error) {
    throw new Error(`Select invoice failed: ${error.message}`);
  }

  return data;
};

export const selectBoardgameByReceiptId = async (receiptId: number) => {
  const supabase = await createClient();

  // Fetch unpaid board game payments
  const { data: receiptData, error: receiptError } = await supabase
    .from("receipts")
    .select("*")
    .eq("id", receiptId)
    .single();

  if (receiptError) {
    throw new Error(`Select receipts failed: ${receiptError.message}`);
  }

  const invoiceData = await selectInvoiceById(receiptData.invoice_id);
  const rentalData = await selectRentalRequestById(invoiceData.request_id);
  const boardgame = await selectGameAction(rentalData.bg_id);

  return boardgame;
};
