"use client";

import MyRentalList from "@/components/rental/my-rental-list";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center md:w-10/12 w-full">
          <div className="text-2xl font-bold pb-2">My Rental Page</div>
          <MyRentalList />
        </div>
      </main>
    </>
  );
}
