import { NextResponse } from "next/server";
import { selectGamesByFilterAction } from "@/app/(game-pages)/actions";
import { selectProvidersByFilterAction } from "@/app/(user-pages)/actions";

export async function GET(req: Request) {
  try {
    // Parse URL query parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Extract parameters from query string
    const filterParams = {
      searchValue: searchParams.get("searchValue") || "", // Search text
      page: searchParams.get("page") || "1", // Current page (default 1)
      itemsPerPage: searchParams.get("itemsPerPage") || "10", // Items per page (default 10)
      maxPage: searchParams.get("maxPage") || "1", // Max pages (default 1)
    };

    console.log("🛢️ Fetching from Database");
    const filteredProviders = await selectProvidersByFilterAction(
      filterParams.searchValue,
      parseInt(filterParams.page, 10),
      parseInt(filterParams.itemsPerPage, 10),
      parseInt(filterParams.maxPage, 10)
    );

    // สร้าง Response พร้อมส่ง Cookie กลับไปได้
    const res = NextResponse.json(
      { status: "success", data: filteredProviders },
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
