import { NextRequest, NextResponse } from "next/server";
import { selectVerificationRequest } from "@/app/(admin-pages)/actions";

// ✅ แก้โครงสร้างพารามิเตอร์ของ API Route ให้ถูกต้อง
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ providerId: string }> }
) {
  const { providerId: id } = await context.params; // ✅ ดึงค่า id ออกจาก params โดยตรง

  console.log(context.params);
  console.log("ming");

  if (!id) {
    return NextResponse.json(
      { status: "error", message: "Provider ID is required" },
      { status: 400 }
    );
  }

  const verificationData = await selectVerificationRequest(id);

  if (!verificationData) {
    return NextResponse.json(
      { status: "error", message: "verification not found" },
      { status: 404 }
    );
  }

  // ✅ เพิ่ม Cache-Control เพื่อรองรับ Caching บน Vercel
  const res = NextResponse.json(
    { status: "success", data: verificationData },
    { status: 200 }
  );
  // res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
