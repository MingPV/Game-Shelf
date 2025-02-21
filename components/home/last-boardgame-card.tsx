import { Boardgame } from "@/app/types/game";
import Image from "next/image";
import React from "react";

export default function LastBoardgameCard() {
  return (
    <div className="flex flex-col   w-56  bg-slate-600/10 rounded-xl items-center space-y-2 justify-center hover:bg-black/10 hover:cursor-pointer hover:border hover:border-white hover:border-opacity-10 ">
      <div className="w-56 flex flex-col justify-center items-center mb-6 ">
        <div className="text-white/20 text-9xl">➞</div>
        <div className="text-white/20 text-1xl">Go to Inventory</div>
      </div>
    </div>
  );
}
