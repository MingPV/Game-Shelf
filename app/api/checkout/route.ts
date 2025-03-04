import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

// Ensure the Stripe secret key is available
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

// Initialize Stripe client
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  try {
    const { amount, productName, customer_id, provider_id, request_id } =
      await req.json();

    const supabase = await createClient();

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: { name: productName },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000`,
      cancel_url: `http://localhost:3000`,
    });
    console.log(session);

    const { data, error } = await supabase
      .from("invoices")
      .insert([
        {
          payer: customer_id,
          payout_to: provider_id,
          amount: amount,
          status: "pending",
          commission_fee: amount * 0.1,
          request_id: request_id,
          session_id: session.id,
          payment_url: session.url,
        },
      ])
      .select();

    return NextResponse.json({
      message: "Checkout success.",
      session: session,
      data: data,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Error processing payment" },
      { status: 400 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
