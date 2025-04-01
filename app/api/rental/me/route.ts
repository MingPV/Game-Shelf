import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  selectRentalRequestsByPlayerId,
  selectRentalRequestsByProviderId,
} from "@/app/(user-pages)/actions";

export async function GET() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token")?.value || "No Token";

  console.log(userToken);

  if (userToken == "No Token") {
    return NextResponse.json({ status: "success", data: [] }, { status: 200 });
  }

  const payload = JSON.parse(atob(userToken.split(".")[1]));
  const isProvider = payload.userData.isProvider;

  console.log(payload);

  let myRental;

  if (isProvider) {
    // ดึงข้อมูลรายงานจาก Database
    myRental = await selectRentalRequestsByProviderId(payload.userData.uid);
  } else {
    // ดึงข้อมูลรายงานจาก Database
    myRental = await selectRentalRequestsByPlayerId(payload.userData.uid);
  }

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: myRental },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
