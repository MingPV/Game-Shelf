"use client";

import React from "react";
import Link from "next/link";

export default function LastBoardgameCard() {
  return (
    <Link
      href="/inventory"
      prefetch={true}
      className="flex flex-col   w-56  bg-slate-600/10 rounded-xl items-center space-y-2 justify-center hover:bg-black/10 hover:cursor-pointer border border-white border-opacity-0 hover:border-opacity-10 transition duration-300 "
    >
      <div className="w-56 flex flex-col justify-center items-center mb-6 ">
        <div className="text-white text-opacity-20 text-9xl transition duration-300 hover:text-opacity-10">
          ➞
        </div>
        <div className="text-white text-opacity-20 text-1xl transition duration-300 hover:text-opacity-10">
          Go to Inventory
        </div>
      </div>
    </Link>
  );
}
