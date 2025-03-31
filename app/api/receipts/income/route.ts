import { NextResponse } from "next/server";
import { selectMyReceipts } from "@/app/(payment-pages)/actions";

export async function GET() {
  // ดึงข้อมูลรายงานจาก Database
  const myReceipts = await selectMyReceipts();

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: myReceipts },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
