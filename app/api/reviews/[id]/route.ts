import {
  deleteReviewById,
  selectReviewById,
  updateReviewById,
} from "@/app/(game-pages)/actions";
import { NextRequest, NextResponse } from "next/server";

// ✅ แก้โครงสร้างพารามิเตอร์ของ API Route ให้ถูกต้อง
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: number }> }
) {
  const { id } = await context.params; // ✅ ดึงค่า id ออกจาก params โดยตรง

  if (!id) {
    return NextResponse.json(
      { status: "error", message: "Review ID is required" },
      { status: 400 }
    );
  }

  const reviewData = await selectReviewById(id);

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
 * /api/reviews/{reviewId}:  
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     description: Retrieve a review by its ID.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: The review ID
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
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Review ID is required
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
 *                   example: Review ID is required
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
