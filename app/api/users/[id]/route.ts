"use server";

import { NextResponse } from "next/server";
import { selectUserById } from "@/app/(user-pages)/actions";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const params_to_use = await params;
  const userID = params_to_use?.id;

  if (!userID) {
    return NextResponse.json(
      { status: "error", message: "User ID is required" },
      { status: 400 }
    );
  }

  const userData = await selectUserById(userID);

  if (!userData) {
    return NextResponse.json(
      { status: "error", message: "User not found" },
      { status: 404 }
    );
  }

  const res = NextResponse.json(
    { status: "success", data: userData },
    { status: 200 }
  );

  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
