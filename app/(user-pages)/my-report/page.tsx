"use client";

import ReportList from "@/components/user-pages/reportlist";

export default function MyReport({}: {}) {
  return (
    <>
      <main className="flex  flex flex-col items-center gap-6  w-full">
        <div className="flex flex-col items-center justify-center md:w-10/12 w-full">
          <div className="text-2xl font-bold pb-4">Report History</div>
          <div className="flex items-center justify-center w-11/12 sm:w-10/12">
            <ReportList />
          </div>
        </div>
      </main>
    </>
  );
}
