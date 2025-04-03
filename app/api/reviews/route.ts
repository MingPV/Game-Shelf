import { NextResponse } from "next/server";
import { createReviewAction } from "@/app/(user-pages)/actions";
import { selectAllReviews } from "@/app/(game-pages)/actions";

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Retrieve a list of all reviews.
 *     responses:
 *       200:
 *         description: Successful response with review data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No reviews found.
 */

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

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     description: Submit a new review for a rental.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - provider_id
 *               - comment
 *               - rating
 *               - bg_id
 *               - rental_id
 *             properties:
 *               customer_id:
 *                 type: string
 *                 example: "12345"
 *               provider_id:
 *                 type: string
 *                 example: "67890"
 *               comment:
 *                 type: string
 *                 example: "Great service!"
 *               rating:
 *                 type: integer
 *                 example: 5
 *               bg_id:
 *                 type: string
 *                 example: "boardgame_001"
 *               rental_id:
 *                 type: string
 *                 example: "rental_001"
 *     responses:
 *       200:
 *         description: Successfully created the review.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Internal server error.
 */

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