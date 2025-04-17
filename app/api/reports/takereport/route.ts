import { NextResponse } from "next/server";
import { updateTakeReport } from "@/app/(admin-pages)/actions";
export async function POST(req: Request) {
  try {
    console.log("hereeeeeee");
    const body = await req.json();

    const { id, status, admin_id } = body;

    if (!id || !status || !admin_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await updateTakeReport(id, status, admin_id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
