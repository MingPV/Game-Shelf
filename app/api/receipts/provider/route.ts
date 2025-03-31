import { NextResponse } from "next/server";
import { selectReceiptsByProviderId } from "@/app/(user-pages)/actions";

export async function GET(req: Request) {
  try {
    // Parse URL query parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Extract parameters from query string
    const filterParams = {
      provider_id: searchParams.get("provider_id") || "", // Parse minPrice
    };

    console.log("🛢️ Fetching from Database");
    const receipts = await selectReceiptsByProviderId(filterParams.provider_id);

    // สร้าง Response พร้อมส่ง Cookie กลับไปได้
    const res = NextResponse.json(
      { status: "success", data: receipts },
      { status: 200 }
    );

    // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
    res.headers.set(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=60"
    );

    return res;
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to fetch receipts" },
      { status: 500 }
    );
  }
}
