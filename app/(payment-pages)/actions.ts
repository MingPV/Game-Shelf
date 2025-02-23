// function in (payment-pages)

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
}

export const selectToPayBoardGameById = async (playerId: string) => {
    const supabase = await createClient();
    
     // Fetch unpaid board game payments
    const { data: payments, error: paymentError } = await supabase
        .from("rental_requests")
        .select("*, invoices(*), users!rental_requests_provider_id_fkey(*), boardgames(*)")
        .eq("customer_id", playerId)
        .eq("status", "waiting for payment");

    if (paymentError || !payments) {
        console.error('Error fetching payments:', paymentError);
        return null;
    }

    console.log("Payments: ",payments);
    return payments;


};
