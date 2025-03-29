import { cookies } from "next/headers";
import { selectAllBoardgameType } from "@/app/(game-pages)/actions";
import { NextResponse } from "next/server";

export async function GET() {
  // ดึงข้อมูลรายงานจาก Database
  const types = await selectAllBoardgameType();

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: types },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
