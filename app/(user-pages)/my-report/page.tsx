"use client";

import ReportList from "@/components/user-pages/reportlist";

export default function MyReport({}: {}) {
  return (
    <>
      <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center md:w-10/12 w-full">
          <div className="text-2xl font-bold pb-4">My Report Page</div>
          <div className="flex items-center justify-center w-10/12">
            <ReportList />
          </div>
        </div>
      </main>
    </>
  );
}
