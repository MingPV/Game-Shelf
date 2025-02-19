"use client";
import RentalHistory from "@/components/rental/rental-history";
export default function RentalHistoryPage() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <RentalHistory />
        </div>
      </main>
    </>
  );
}
