"use client";

import HomeList from "@/components/home/home-list";
import { HomeSearch } from "@/components/search-game/home-search";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 mb-32">
        {/* <div className="w-full h-[40vh] bg-slate-500">test</div> */}
        <div className="flex flex-row w-full gap-6 ">
          <HomeList />
          <div className="flex-1">
            <HomeSearch />
          </div>
        </div>
      </main>
    </>
  );
}
