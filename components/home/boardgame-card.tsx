"use client";

import { Boardgame } from "@/app/types/game";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface BoardgameCardProps {
  boardgameData: Boardgame;
}

export default function BoardgameCard({ boardgameData }: BoardgameCardProps) {
  return (
    <Link
      className="flex flex-col p-3  w-56  bg-white/10 rounded-xl items-center space-y-2 justify-between mr-4 hover:bg-white/20"
      href={`/games/${boardgameData.id}`}
      prefetch={true}
    >
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
    </Link>
  );
}

export function BoardgameLoadingCard() {
  return (
    <div className="flex flex-col p-3  w-56 rounded-xl items-center space-y-2 justify-between mr-4 skeleton bg-black opacity-10">
      <div className="flex flex-col gap-1">
        <div className="h-48 w-48 rounded-xl bg-white opacity-30 ">
          {/* <img src={"/mock_provider.jpeg"} className="rounded-xl w-full h-48" /> */}
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between text-xs text-gs_white/50 w-full">
            <p>name</p>
            <p>baht / day</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between text-md text-gs_white w-full">
            <p className="bg-white opacity-30 rounded-lg">--------------</p>
            <p className="text-lime-500 opacity-0">--</p>
          </div>
        </div>
      </div>
    </div>
  );
}
