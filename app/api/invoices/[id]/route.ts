import { NextRequest, NextResponse } from "next/server";
import { selectInvoiceById } from "@/app/(payment-pages)/actions";

// ✅ แก้โครงสร้างพารามิเตอร์ของ API Route ให้ถูกต้อง
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: number }> }
) {
  const { id } = await context.params; // ✅ ดึงค่า id ออกจาก params โดยตรง

  if (!id) {
    return NextResponse.json(
      { status: "error", message: "Invoice ID is required" },
      { status: 400 }
    );
  }

  const invoiceData = await selectInvoiceById(id);

  if (!invoiceData) {
    return NextResponse.json(
      { status: "error", message: "Invoice not found" },
      { status: 404 }
    );
  }

  // ✅ เพิ่ม Cache-Control เพื่อรองรับ Caching บน Vercel
  const res = NextResponse.json(
    { status: "success", data: invoiceData },
    { status: 200 }
  );
  res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}
