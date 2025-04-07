import { NextResponse } from "next/server";
import { createReviewAction } from "@/app/(user-pages)/actions";
import { selectAllReviews } from "@/app/(game-pages)/actions";

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: interger
 *         customer_id:
 *           type: string
 *           format: uuid
 *         provider_id:
 *           type: string
 *           format: uuid
 *         comment:
 *           type: string
 *         rating:
 *           type: integer
 *         bg_id:
 *           type: integer
 *         rental_id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time 
 *       example:
 *         id: 1
 *         customer_id: "5dc22222-fe6d-414e-83c1-3e1a2fedaa5e" 
 *         provider_id: "453f1dae-8797-41ae-bf56-8dcba006915e" 
 *         comment: "Great service!"   
 *         rating: 4
 *         bg_id: 4
 *         rental_id: 112
 *         created_at: "2025-02-20T12:29:45.903542+00:00"
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API for managing reviews
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
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     description: Retrieve a list of all reviews.
 *     responses:
 *       200:
 *         description: Success
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
 *                     $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:  
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string 
 *                   example: Review not found
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

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     description: Submit a new review for a rental.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 format: uuid
 *               provider_id:
 *                 type: string
 *                 format: uuid
 *               comment:
 *                 type: string
 *               rating:
 *                 type: integer
 *               bg_id:
 *                 type: integer
 *               rental_id:
 *                 type: integer
 *           example:
 *             customer_id: "5dc22222-fe6d-414e-83c1-3e1a2fedaa5e"
 *             provider_id: "453f1dae-8797-41ae-bf56-8dcba006915e"
 *             comment: "Great service!"
 *             rating: 4
 *             bg_id: 4
 *             rental_id: 112
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                  type: object
 *       400:
 *         description: Missing required fields.
 *         content:
 *           application/json:  
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string 
 *                   example: Missing required fields
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:  
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: error
 *                     message:
 *                       type: string 
 *                       example: Failed to create review
 *                     error:
 *                       type: string
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: error
 *                     message:
 *                       type: string 
 *                       example: Internal server error
 *                     error:
 *                       type: string
 */