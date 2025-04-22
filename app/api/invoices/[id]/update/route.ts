import { NextResponse } from "next/server";
import { cancelMultipleInvoices } from "@/app/(rental-pages)/actions";
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
