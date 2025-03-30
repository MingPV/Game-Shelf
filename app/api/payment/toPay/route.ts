import { NextRequest, NextResponse } from "next/server";
import { selectToPayBoardGameById } from "@/app/(payment-pages)/actions";

export async function GET(req: NextRequest) {
  // ดึงข้อมูลรายงานจาก Database

  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const myRental = await selectToPayBoardGameById(
    searchParams.get("player_id") || ""
  );

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: myRental },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
