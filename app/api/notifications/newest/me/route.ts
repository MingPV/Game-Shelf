import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getLast9Notifications } from "@/app/(user-pages)/actions";

export async function GET() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token")?.value || "No Token";

  const payload = JSON.parse(atob(userToken.split(".")[1]));

  const notifications = await getLast9Notifications(payload.userData.uid);

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: notifications },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
