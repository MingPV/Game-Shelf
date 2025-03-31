import { NextResponse } from "next/server";
import { getMyUserData } from "@/app/(user-pages)/actions";
import { UserData } from "@/app/types/user";

export async function GET() {
  // ดึงข้อมูลรายงานจาก Database
  const myData: UserData = await getMyUserData();

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: myData },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
