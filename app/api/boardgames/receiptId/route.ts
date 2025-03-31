import { NextResponse } from "next/server";
import { selectBoardgameByReceiptId } from "@/app/(payment-pages)/actions";

export async function GET(req: Request) {
  try {
    // Parse URL query parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Extract parameters from query string
    const filterParams = {
      receipt_id: searchParams.get("receipt_id") || "", // Search text
    };

    console.log("🛢️ Fetching from Database");
    const data = await selectBoardgameByReceiptId(
      Number(filterParams.receipt_id)
    );

    // สร้าง Response พร้อมส่ง Cookie กลับไปได้
    const res = NextResponse.json(
      { status: "success", data: data },
      { status: 200 }
    );

    // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
    res.headers.set(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=60"
    );

    return res;
  } catch (error) {
    console.error("❌ Error filtering rentals:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to filter rentals" },
      { status: 500 }
    );
  }
}
