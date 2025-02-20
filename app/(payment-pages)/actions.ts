// function in (payment-pages)

"use server";

import { createClient } from "@/utils/supabase/server";

export const selectToPayBoardGameById = async (playerId: string) => {
    const supabase = await createClient();
    
     // Fetch unpaid board game payments
    const { data: payments, error: paymentError } = await supabase
        .from("rental_requests")
        .select("*")
        .eq("customer_id", playerId)
        .eq("status", "waiting for payment");

    if (paymentError || !payments) {
        console.error('Error fetching payments:', paymentError);
        return null;
    }

    console.log(payments);

    // Extract board game IDs
    const boardGameIds = payments.map(p => p.bg_id);
    const requestIds = payments.map(p => p.id);
    const providerIds = payments.map(p => p.provider_id);
    
    console.log("BoardGame IDs:", boardGameIds);
    console.log("Request IDs:", requestIds);
    console.log("Provider IDs:", providerIds);

    // Fetch board game prices separately
    const { data: boardGames, error: boardGameError } = await supabase
        .from("boardgames")
        .select("*")
        .in("id", boardGameIds);

    if (boardGameError || !boardGames) {
        console.error("Error fetching board games:", boardGameError);
        return null;
    }

    // Fetch invoice details based on request_id
    const { data: invoices, error: invoiceError } = await supabase
        .from("invoices")
        .select("*")
        .in("request_id", requestIds);

    if (invoiceError || !invoices) {
        console.error("Error fetching invoices:", invoiceError);
        return null;
    }

     // Fetch user details based on provider_id
     const { data: users, error: userError } = await supabase
        .from("users")
        .select("*")
        .in("uid", providerIds);

    if (userError || !users) {
        console.error("Error fetching users:", userError);
        return null;
    }

     // Create maps for quick lookup
     const boardGameMap = Object.fromEntries(boardGames.map(bg => [bg.id, bg]));
     const invoiceMap = Object.fromEntries(invoices.map(inv => [inv.request_id, inv]));
     const userMap = Object.fromEntries(users.map(user => [user.uid, user]));
 
     // Merge results
     const mergedData = payments.map(p => ({
         ...p,
         board_game: boardGameMap[p.bg_id] || null,
         invoice: invoiceMap[p.id] || null,
         provider: userMap[p.provider_id] || null
     }));

    return mergedData;
};
