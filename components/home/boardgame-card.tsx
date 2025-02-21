import { Boardgame } from "@/app/types/game";
import Image from "next/image";
import React from "react";

interface BoardgameCardProps {
  boardgameData: Boardgame;
}

export default function BoardgameCard({ boardgameData }: BoardgameCardProps) {
  return (
    <div className="flex flex-col p-3  w-full md:w-64 bg-white/10 rounded-xl items-center space-y-2 justify-between mr-4">
      <div className="flex flex-col gap-1">
        <div className="h-48 w-48 rounded-xl ">
          <img
            src={boardgameData.bg_picture}
            alt={boardgameData.bg_name}
            className="rounded-xl w-full h-48"
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between text-xs text-gs_white/50 w-full">
            <p>name</p>
            <p>baht / day</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between text-md text-gs_white w-full">
            <p>{boardgameData.bg_name}</p>
            <p className="text-lime-500">{boardgameData.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
