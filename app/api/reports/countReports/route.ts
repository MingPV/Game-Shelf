import { NextResponse } from "next/server";
import { countReportsByStatusAndDate } from "@/app/(admin-pages)/actions";

export async function GET(req: Request) {
  try {
    // Parse URL query parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const month = searchParams.get("month")?.toString() || "undefined";
    const year = searchParams.get("year")?.toString() || "undefined";
    const status = searchParams.get("status")?.toString() || "";

    console.log("🛢️ Fetching from Database");
    const filteredReport = await countReportsByStatusAndDate(
      month,
      year,
      status
    );

    // สร้าง Response พร้อมส่ง Cookie กลับไปได้
    const res = NextResponse.json(
      { status: "success", data: filteredReport },
      { status: 200 }
    );

    // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
    res.headers.set(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=60"
    );

    return res;
  } catch (error) {
    console.error("❌ Error filtering board games:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to filter board games" },
      { status: 500 }
    );
  }
}
