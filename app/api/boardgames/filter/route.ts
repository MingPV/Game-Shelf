// import { NextResponse } from "next/server";
// import redis from "@/lib/redis";
// import { selectGamesByFilterAction } from "@/app/(game-pages)/actions";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.json();
//     const cacheKey = `boardgames:${JSON.stringify(formData)}`;

//     // Check Redis Cache
//     const cachedData = await redis.get(cacheKey);
//     if (cachedData) {
//       console.log("✅ Serving from Redis Cache");
//       return NextResponse.json({
//         status: "success",
//         data: JSON.parse(cachedData),
//       });
//     }

//     console.log("🛢️ Fetching from Database");
//     const filteredBoardGames = await selectGamesByFilterAction(formData);

//     // Store in Redis with 1-hour expiration
//     await redis.set(cacheKey, JSON.stringify(filteredBoardGames), "EX", 3600);

//     return NextResponse.json({ status: "success", data: filteredBoardGames });
//   } catch (error) {
//     console.error("❌ Error filtering board games:", error);
//     return NextResponse.json(
//       { status: "error", message: "Failed to filter board games" },
//       { status: 500 }
//     );
//   }
// }
