import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { selectGamesByFilterAction } from "@/app/(game-pages)/actions";
import { selectBannedUserByDateAndName } from "@/app/(user-pages)/actions";

export async function GET(req: Request) {
  try {
    // Parse URL query parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const month = searchParams.get("month")?.toString() || "undefined";
    const year = searchParams.get("year")?.toString() || "undefined";
    const username = searchParams.get("username")?.toString() || "";

    console.log("🛢️ Fetching from Database");
    const filteredUser = await selectBannedUserByDateAndName(
      month,
      year,
      username
    );

    // สร้าง Response พร้อมส่ง Cookie กลับไปได้
    const res = NextResponse.json(
      { status: "success", data: filteredUser },
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
