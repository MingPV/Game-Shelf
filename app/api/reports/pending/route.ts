import { cookies } from "next/headers";
import { getAllPendingReports } from "@/app/(admin-pages)/actions";
import { NextResponse } from "next/server";

export async function GET() {
  // ดึงข้อมูลรายงานจาก Database
  const reportData = await getAllPendingReports();

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: reportData },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
