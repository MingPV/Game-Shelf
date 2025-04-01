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
      { status: "error", message: "Invoice ID is required" },
      { status: 400 }
    );
  }

  const reviewData = await selectReviewById(id);

  if (!reviewData) {
    return NextResponse.json(
      { status: "error", message: "Invoice not found" },
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
