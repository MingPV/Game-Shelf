import { NextRequest, NextResponse } from "next/server";
import { selectUserById } from "@/app/(user-pages)/actions";

// ✅ แก้โครงสร้างพารามิเตอร์ของ API Route ให้ถูกต้อง
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ ดึงค่า id ออกจาก params โดยตรง

  if (!id) {
    return NextResponse.json(
      { status: "error", message: "User ID is required" },
      { status: 400 }
    );
  }

  const userData = await selectUserById(id);

  if (!userData) {
    return NextResponse.json(
      { status: "error", message: "User not found" },
      { status: 404 }
    );
  }

  // ✅ เพิ่ม Cache-Control เพื่อรองรับ Caching บน Vercel
  const res = NextResponse.json(
    { status: "success", data: userData },
    { status: 200 }
  );
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
