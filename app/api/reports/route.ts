import { cookies } from "next/headers";
import { getAllReports } from "@/app/(admin-pages)/actions";
import { NextResponse } from "next/server";

export async function GET() {
  // อ่าน Cookie จาก request
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token")?.value || "No Token";

  console.log(userToken);

  // ดึงข้อมูลรายงานจาก Database
  const reportData = await getAllReports();

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: reportData, token: userToken },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  // res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
