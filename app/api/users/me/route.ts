import { NextResponse } from "next/server";
import { getMyUserData } from "@/app/(user-pages)/actions";
import { UserData } from "@/app/types/user";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token")?.value || "No Token";

  if (userToken == "No Token") {
    return NextResponse.json(
      { status: "success", data: null },
      { status: 200 }
    );
  }

  // ดึงข้อมูลรายงานจาก Database
  const myData: UserData = await getMyUserData();

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: myData },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  //   res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  console.log(myData);

  return res;
}
