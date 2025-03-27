// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { getMyUserData, selectUserById } from "@/app/(user-pages)/actions";

// export async function GET() {

//   const userData = await selectUserById();

//   // สร้าง Response พร้อมส่ง Cookie กลับไปได้
//   const res = NextResponse.json(
//     { status: "success", data: userData },
//     { status: 200 }
//   );

//   // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
//   res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

//   return res;
// }
