import { NextResponse } from "next/server";
import { selectInfoByUsername } from "@/app/(user-pages)/actions";

export async function GET(req: Request) {
  try {
    // Parse URL query parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Extract parameters from query string
    const filterParams = {
      searchValue: searchParams.get("searchValue") || "", // Search text
    };

    console.log(filterParams);

    console.log("🛢️ Fetching from Database");
    const userData = await selectInfoByUsername(filterParams.searchValue);

    // สร้าง Response พร้อมส่ง Cookie กลับไปได้
    const res = NextResponse.json(
      { status: "success", data: userData },
      { status: 200 }
    );

    // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
    res.headers.set(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=60"
    );

    return res;
  } catch (error) {
    console.error("❌ Error filtering users:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to filter users" },
      { status: 500 }
    );
  }
}
