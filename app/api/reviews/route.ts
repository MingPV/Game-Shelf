import { NextResponse } from "next/server";
import { createReviewAction } from "@/app/(user-pages)/actions";
import { selectAllReviews } from "@/app/(game-pages)/actions";

export async function GET() {
  const reviewData = await selectAllReviews();

  if (!reviewData) {
    return NextResponse.json(
      { status: "error", message: "Review not found" },
      { status: 404 }
    );
  }

  // ✅ เพิ่ม Cache-Control เพื่อรองรับ Caching บน Vercel
  const res = NextResponse.json(
    { status: "success", data: reviewData },
    { status: 200 }
  );
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Extract JSON body

    const { customer_id, provider_id, comment, rating, bg_id, rental_id } =
      body;

    // Validate required fields
    if (
      !customer_id ||
      !provider_id ||
      !comment ||
      rating === undefined ||
      !bg_id ||
      !rental_id
    ) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call the action function to insert data
    const { data, error } = await createReviewAction(
      customer_id,
      provider_id,
      comment,
      rating,
      bg_id,
      rental_id
    );

    if (error) {
      return NextResponse.json(
        { status: "error", message: "Failed to create review", error },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: "success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Internal server error", error },
      { status: 500 }
    );
  }
}
