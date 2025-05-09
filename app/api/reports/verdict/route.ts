import { NextResponse } from "next/server";
import { updateReportVerdict } from "@/app/(admin-pages)/actions";
import { report } from "process";
export async function POST(req: Request) {
  try {
    console.log("hereeeeeee");
    const body = await req.json();

    const { reportId, verdict } = body;
    console.log(body);
    console.log(reportId, verdict);

    if (!reportId || !verdict) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await updateReportVerdict(reportId, verdict);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
