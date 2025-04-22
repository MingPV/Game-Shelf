import { NextResponse } from "next/server";
import { selectRentalRequestUnpaid } from "@/app/(rental-pages)/actions";
import { cancelMultipleInvoices } from "@/app/(rental-pages)/actions";
export async function GET() {
  // ดึงข้อมูลรายงานจาก Database
  const myRental = await selectRentalRequestUnpaid();

  // สร้าง Response พร้อมส่ง Cookie กลับไปได้
  const res = NextResponse.json(
    { status: "success", data: myRental },
    { status: 200 }
  );

  // ตั้งค่า Cache-Control เพื่อให้ Vercel Edge Cache ทำงาน
  // res.headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=60");

  return res;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log("formData", formData);

    // Extract the list of invoice IDs
    const invoiceIds = formData.getAll("invoice_ids[]"); // gets all ids as array
    const cancelFormData = new FormData();

    // Append all invoice IDs to cancelFormData
    invoiceIds.forEach((id) => {
      cancelFormData.append("invoice_ids[]", id as string);
    });

    if (!invoiceIds.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await cancelMultipleInvoices(cancelFormData);

    return NextResponse.json(
      { message: "Invoices updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update invoice:", error);
    return NextResponse.json(
      { error: "Failed to update invoice" },
      { status: 500 }
    );
  }
}
