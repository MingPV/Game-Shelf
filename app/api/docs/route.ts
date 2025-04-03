// app/api/docs/route.ts
import { NextResponse } from "next/server";
import { getApiDocs } from "@/utils/swagger";

export async function GET() {
  const spec = await getApiDocs();
  return NextResponse.json(spec);
}
