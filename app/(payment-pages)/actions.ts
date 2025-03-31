// function in (payment-pages)

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { selectRentalRequestById } from "../(rental-pages)/actions";
import { Receipt } from "../types/receipt";
import { selectGameAction } from "../(game-pages)/actions";
import { Boardgame, Invoice, RentingRequest } from "../types/game";

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

  const { data, error } = await supabase
    .from("receipts")
    .select("*")
    .eq("provider_id", user.id);

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

  // const fetchRentalByID = async (
  //   rentalID: number
  // ): Promise<{
  //   data: RentingRequest;
  //   token: string;
  // }> => {
  //   const res = await fetch(`/api/rental/${rentalID}`, {
  //     next: { revalidate: 3600 }, // Cache for 1 hour
  //   });
  //   return res.json();
  // };
  // const fetchInvoiceByID = async (
  //   invoiceID: number
  // ): Promise<{
  //   data: Invoice;
  //   token: string;
  // }> => {
  //   const res = await fetch(`/api/invoices/${invoiceID}`, {
  //     next: { revalidate: 3600 }, // Cache for 1 hour
  //   });
  //   return res.json();
  // };
  // const fetchBoardgameByID = async (
  //   boardgameID: number
  // ): Promise<{
  //   data: Boardgame;
  //   token: string;
  // }> => {
  //   const res = await fetch(`/api/boardgames/${boardgameID}`, {
  //     next: { revalidate: 3600 }, // Cache for 1 hour
  //   });
  //   return res.json();
  // };

  // console.log(receiptData);

  // const { data: invoiceData } = await fetchInvoiceByID(receiptData.invoice_id);
  // const { data: rentalData } = await fetchRentalByID(invoiceData.request_id);
  // const { data: boardgame } = await fetchBoardgameByID(rentalData.bg_id);

  const invoiceData = await selectInvoiceById(receiptData.invoice_id);
  const rentalData = await selectRentalRequestById(invoiceData.request_id);
  const boardgame = await selectGameAction(rentalData.bg_id);

  return boardgame;
};
