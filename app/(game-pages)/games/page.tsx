"use client";

import { SearchItems } from "@/components/search-game/search-items";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 w-full">
        <SearchItems />
      </main>
    </>
  );
}
