import {
  getAllPendingReports,
  getAllReports,
} from "@/app/(admin-pages)/actions";
import { NextResponse } from "next/server";

export async function GET() {
  const reportData = await getAllReports();

  // Create a response with cache headers
  const res = NextResponse.json(
    { status: "success", data: reportData },
    { status: 200 }
  );

  // Set cache headers for Vercel Edge cache
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
