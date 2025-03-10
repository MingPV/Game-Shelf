import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

// Ensure environment variables are set
if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET in .env.local"
  );
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event;
  try {
    const body = await req.text(); // Get raw body for Stripe signature verification
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: err.message` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const paymentSuccessData = event.data.object;
      const sessionId = paymentSuccessData.id;

      try {
        const { data, error } = await supabase
          .from("invoices")
          .update({ status: paymentSuccessData.status })
          .eq("session_id", sessionId)
          .select();

        const { data: requestData, error: requestError } = await supabase
          .from("rental_requests")
          .update({ status: "reserved" })
          .eq("id", data?.[0]?.request_id)
          .select();

        console.log("ming");
        console.log(data);

        if (!error && !requestError) {
          console.log("mingBanana");
          console.log(requestData[0].end_date);
          console.log(requestData[0]);
          console.log(data[0].commission_fee);
          console.log(data[0]);
          const { data: data2, error: error2 } = await supabase
            .from("receipts")
            .insert([
              {
                receipt_detail: "payment success",
                end_date: new Date(requestData[0].end_date),
                process_fee: data[0].commission_fee,
                invoice_id: data[0].id,
                amount: data[0].amount,
                provider_id: data[0].payout_to,
                customer_id: data[0].payer,
              },
            ])
            .select();
        }
      } catch (error) {
        console.error("Database Update Error:", error);
        return NextResponse.json(
          { error: "Database update failed" },
          { status: 500 }
        );
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Acknowledge receipt of the event
  return new NextResponse(null, { status: 200 });
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
