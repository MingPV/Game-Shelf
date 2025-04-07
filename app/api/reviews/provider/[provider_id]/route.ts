import { NextResponse } from "next/server";
import { selectReviewByProviderId } from "@/app/(user-pages)/actions";

export async function GET(
  req: Request,
  context: { params: Promise<{ provider_id: number }> }
) {
  const { provider_id } = await context.params; // ✅ ดึงค่า id ออกจาก params โดยตรง

  if (!provider_id) {
    return NextResponse.json(
      { status: "error", message: "ProviderID is required" },
      { status: 400 }
    );
  }
  try {
    console.log("🛢️ Fetching from Database");
    const reviews = await selectReviewByProviderId(provider_id.toString());

    // สร้าง Response พร้อมส่ง Cookie กลับไปได้
    const res = NextResponse.json(
      { status: "success", data: reviews },
      { status: 200 }
    );

    // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
    res.headers.set(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=60"
    );

    return res;
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/reviews/provider/{providerId}:  
 *   get:
 *     summary: Get all reviews for a specific provider
 *     tags: [Reviews]
 *     description: Retrieve all provider's reviews by provider ID.
 *     parameters:
 *       - in: path
 *         name: providerId
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider ID
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
 *         description: Provider ID is required
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
 *                   example: Provider ID is required
 *       500:
 *         description: Failed to fetch reviews
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
 *                   example: Failed to fetch reviews
 */
