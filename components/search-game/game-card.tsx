"use client";

import { useState } from "react";
import { Boardgame } from "@/app/types/game";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa6";
import { UserData } from "@/app/types/user";
import { selectUserById } from "@/app/(user-pages)/actions";
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
  const router = useRouter();
  const [provider, setProvider] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await selectUserById(boardgame.provider_id); // assuming selectUserById is a function that returns data
      console.log("data", data);
      setProvider(data); // set the data returned from the function to the state
    };

    fetchData(); // invoke the async function
  }, [boardgame.provider_id]);

  return (
    <div
      className="flex flex-col p-3 w-64 bg-white/10 rounded-xl items-center justify-between space-y-2"
      data-testid="game-card"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="w-32 h-32 self-center md:h-56 md:w-56 rounded-xl">
          <img
            src={boardgame.bg_picture}
            alt={boardgame.bg_name}
            className="rounded-xl w-full h-32 md:h-56"
          />
        </div>

        <div className="flex flex-col w-full mt-2">
          <div className="flex flex-row justify-between text-xs text-gs_white/50 w-full">
            <p>name</p>
            <p>baht / day</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between text-base text-gs_white w-full">
            <p data-testid="game-title">{boardgame.bg_name}</p>
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

      <div className="flex flex-row w-full gap-2 items-center">
        <span className="flex flex-row w-1/2 text-gs_white/80">
          <FaStar className=" text-gs_yellow mr-2 text-xl " />{" "}
          {provider[0]?.rating.toString() == "0"
            ? "N/A"
            : provider[0]?.rating.toString()}
        </span>
        <button
          className="w-full font-semibold text-xs md:text-sm px-4 rounded-xl py-2 self-end hover:border bg-gs_purple_gradient"
          onClick={() => router.push(`/games/${boardgame.id}`)}
        >
          Details
        </button>
      </div>
    </div>
  );
}
