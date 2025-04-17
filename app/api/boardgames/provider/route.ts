import { NextResponse } from "next/server";
import { selectProviderBoardgameByFilterAction } from "@/app/(user-pages)/actions";

export async function GET(req: Request) {
  try {
    // Parse URL query parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Extract parameters from query string
    const filterParams = {
      bg_name: searchParams.get("bg_name") || "", // Search text
      provider_id: searchParams.get("provider_id") || "", // Parse minPrice
      selectedTypeFilter: searchParams.get("selectedTypeFilter") || "", // Parse maxPrice
    };

    console.log("🛢️ Fetching from Database");
    const { data: filteredBoardGames } =
      await selectProviderBoardgameByFilterAction(
        filterParams.bg_name,
        filterParams.provider_id,
        filterParams.selectedTypeFilter
          ? filterParams.selectedTypeFilter.split(",")
          : []
      );

    // สร้าง Response พร้อมส่ง Cookie กลับไปได้
    const res = NextResponse.json(
      { status: "success", data: filteredBoardGames },
      { status: 200 }
    );

    // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
    // res.headers.set(
    //   "Cache-Control",
    //   "s-maxage=3600, stale-while-revalidate=60"
    // );

    return res;
  } catch (error) {
    console.error("❌ Error filtering board games:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to filter board games" },
      { status: 500 }
    );
  }
}
