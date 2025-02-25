"use client";

import { SearchProviders } from "@/components/search-provider/search-items";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center items-center mb-32">
        <div className="flex flex-col items-center justify-center font-bold">
          <SearchProviders />
        </div>
      </main>
    </>
  );
}
