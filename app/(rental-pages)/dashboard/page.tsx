"use client";
import DashBoard from "@/components/rental/dashboard";
export default function DashBoardPage() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center items-center mb-32 w-full">
        <div className="flex flex-col items-center justify-center font-bold w-full">
          <DashBoard />
        </div>
      </main>
    </>
  );
}
