"use client";

import { useState } from "react";
import { Boardgame } from "@/app/types/game";
import { TbCurrencyBaht } from "react-icons/tb";

type BoardgameType = {
  [key: string]: string;
};

export default function GameCard({
  boardgame,
  boardgame_type,
}: {
  boardgame: Boardgame;
  boardgame_type: BoardgameType;
}) {
  const [filled, setFilled] = useState<boolean>(false);
  // console.log("from game card", boardgame);
  // console.log("boardgame_type", boardgame_type);
  return (
    <div className="flex flex-col p-3  w-full md:w-64 bg-white/10 rounded-xl items-center space-y-2 justify-between">
      <div className="flex flex-col gap-1">
        <div className="h-56 w-full rounded-xl ">
          <img
            src={boardgame.bg_picture}
            alt={boardgame.bg_name}
            className="rounded-xl w-full h-56"
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
            <p>{boardgame.bg_name}</p>
            <p>{boardgame.price}</p>
          </div>
        </div>
        <div className="flex text-xs flex-wrap w-full gap-1 ">
          {boardgame.types?.map((type, index) => (
            <p key={index} className="p-1 rounded-sm bg-gs_white/20">
              {boardgame_type[type] || "Unknown Type"}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-row w-full gap-2">
        <button className="hover:scale-110" onClick={() => setFilled(!filled)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={filled ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="red"
            strokeWidth="2"
            className="size-[1.6em]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>

        <button
          className="w-full font-semibold text-sm px-4 w-4/5 rounded-xl py-2 self-end hover:border bg-gs_purple_gradient"
          onClick={() => alert("clicked!")}
        >
          Details
        </button>
      </div>
    </div>
  );
}
