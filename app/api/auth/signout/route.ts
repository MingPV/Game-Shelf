import { signOutAction } from "@/app/(auth-pages)/actions";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  await signOutAction();

  // revalidateTag("user-data");

  const res = new NextResponse(JSON.stringify({ message: "Logged out" }), {
    status: 200,
  });
  return res;
}
