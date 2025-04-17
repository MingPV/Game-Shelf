import { NextRequest, NextResponse } from "next/server";
import { selectMyRentingRequestByStatus2 } from "@/app/(rental-pages)/actions";

// ✅ แก้โครงสร้างพารามิเตอร์ของ API Route ให้ถูกต้อง
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ status: string }> }
) {
  const { status } = await context.params; // ✅ ดึงค่า id ออกจาก params โดยตรง

  if (!status) {
    return NextResponse.json(
      { status: "error", message: "status is required" },
      { status: 400 }
    );
  }

  const data = await selectMyRentingRequestByStatus2(status);

  if (!data) {
    return NextResponse.json(
      { status: "error", message: "renting not found" },
      { status: 404 }
    );
  }

  // ✅ เพิ่ม Cache-Control เพื่อรองรับ Caching บน Vercel
  const res = NextResponse.json(
    { status: "success", data: data },
    { status: 200 }
  );
  // res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
