import { NextResponse } from "next/server";
import { selectGamesByFilterAction } from "@/app/(game-pages)/actions";
import { selectProvidersByFilterAction } from "@/app/(user-pages)/actions";
import { updateUserAction } from "@/app/(user-pages)/actions";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, username, phoneNumber, location } = body.updateData;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await updateUserAction(id, username, phoneNumber, location);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
