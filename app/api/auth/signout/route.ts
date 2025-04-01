import { signOutAction } from "@/app/(auth-pages)/actions";
import { NextResponse } from "next/server";

export async function POST() {
  await signOutAction();

  const res = new NextResponse(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=; Path=/; HttpOnly; Max-Age=0`, // ลบ Token
      "Cache-Control": "no-store", // ป้องกัน cache
    },
  });
  return res;
}
