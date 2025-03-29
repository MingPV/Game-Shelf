import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { selectGamesByFilterAction } from "@/app/(game-pages)/actions";

export async function GET(req: Request) {
  try {
    // Parse URL query parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Extract parameters from query string
    const filterParams = {
      searchValue: searchParams.get("searchValue") || "", // Search text
      minPrice: parseFloat(searchParams.get("minPrice") || "0"), // Parse minPrice
      maxPrice: parseFloat(searchParams.get("maxPrice") || "99999"), // Parse maxPrice
      page: searchParams.get("page") || "1", // Current page (default 1)
      itemsPerPage: searchParams.get("itemsPerPage") || "10", // Items per page (default 10)
      maxPage: searchParams.get("maxPage") || "1", // Max pages (default 1)
      selectedTypeFilter: searchParams.get("selectedTypeFilter") || "", // Type filter
    };

    // Create a Redis cache key (use JSON to ensure uniqueness)
    // const cacheKey = `boardgames:${JSON.stringify(filterParams)}`;

    // Check if data exists in Redis cache
    // const cachedData = await redis.get(cacheKey);
    // if (cachedData) {
    //   console.log("✅ Serving from Redis Cache");
    //   return NextResponse.json({
    //     status: "success",
    //     data: JSON.parse(cachedData),
    //   });
    // }

    console.log("🛢️ Fetching from Database");
    const filteredBoardGames = await selectGamesByFilterAction(
      filterParams.searchValue,
      [filterParams.minPrice, filterParams.maxPrice] as [number, number],
      parseInt(filterParams.page, 10),
      parseInt(filterParams.itemsPerPage, 10),
      parseInt(filterParams.maxPage, 10),
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
