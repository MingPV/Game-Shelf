import { NextResponse } from "next/server";
import { selectPlayerRentingRequest } from "@/app/(rental-pages)/actions";

export async function GET() {
  // ดึงข้อมูลรายงานจาก Database
  const myRental = await selectPlayerRentingRequest();

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: myRental },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
