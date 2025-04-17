import { NextResponse } from "next/server";
import { selectMyRentingRequestByStatus } from "@/app/(rental-pages)/actions";

export async function GET(req: Request) {
  try {
    // Parse URL query parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Extract parameters from query string
    const filterParams = {
      status: searchParams.get("status") || "", // Search text
      month: searchParams.get("month") || "", // Parse minPrice
      year: searchParams.get("year") || "", // Parse maxPrice
    };

    console.log("🛢️ Fetching from Database");
    const data = await selectMyRentingRequestByStatus(
      filterParams.status,
      filterParams.month,
      filterParams.year
    );

    // สร้าง Response พร้อมส่ง Cookie กลับไปได้
    const res = NextResponse.json(
      { status: "success", data: data },
      { status: 200 }
    );

    // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
    // res.headers.set(
    //   "Cache-Control",
    //   "s-maxage=3600, stale-while-revalidate=60"
    // );

    return res;
  } catch (error) {
    console.error("❌ Error filtering rentals:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to filter rentals" },
      { status: 500 }
    );
  }
}
