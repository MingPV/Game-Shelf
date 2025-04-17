import { NextResponse } from "next/server";
import { selectGamesByFilterAction } from "@/app/(game-pages)/actions";
import { deleteGameAction } from "@/app/(game-pages)/actions";
import { updateGameAction } from "@/app/(game-pages)/actions";
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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, boardgame_name, description, price, bg_picture, quantity } =
      body;
    const formData = new FormData();
    formData.append("id", id);
    formData.append("boardgame_name", boardgame_name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("bg_picture", bg_picture as File);
    formData.append("quantity", quantity);

    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await updateGameAction(formData);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// export async function DELETE(req: Request) {
//   try {
//     // Parse URL query parameters
//     const body = await req.json();
//     const { boardgameId } = body;

//     // Extract the ID of the board game to delete

//     if (!boardgameId) {
//       return NextResponse.json(
//         { status: "error", message: "Game ID is required" },
//         { status: 400 }
//       );
//     }

//     console.log(`🗑️ Deleting board game with ID: ${boardgameId}`);

//     // Call your delete action or database logic here
//     const deleteResult = await deleteGameAction(boardgameId);

//     return NextResponse.json(
//       { status: "success", message: "Board game deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ Error deleting board game:", error);
//     return NextResponse.json(
//       { status: "error", message: "Failed to delete board game" },
//       { status: 500 }
//     );
//   }
// }
