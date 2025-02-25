"use client";

import { selectGameAction } from "@/app/(game-pages)/actions";
import { selectUserById } from "@/app/(user-pages)/actions";
import { Boardgame } from "@/app/types/game";
import { ReviewData } from "@/app/types/review";
import { UserData } from "@/app/types/user";
import React, { useEffect, useState } from "react";

interface ReviewCardProps {
  reviewData: ReviewData;
}

export default function ReviewCard({ reviewData }: ReviewCardProps) {
  const [player, setPlayer] = useState<UserData | null>(null);
  const [boardgame, setBoardgame] = useState<Boardgame | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      const fetchData = await selectUserById(reviewData.customer_id);
      setPlayer(fetchData[0]);
    };
    const fetchBoardgame = async () => {
      const fetchData = await selectGameAction(reviewData.bg_id);
      setBoardgame(fetchData);
    };

    fetchBoardgame();
    fetchPlayer();
  }, []);

  return (
    <div className="flex flex-col min-w-56 w-56 bg-white/10 rounded-xl items-center justify-between mr-4">
      <div className="flex flex-col w-full p-4">
        <div className=" text-xs text-gs_white/50">name</div>
        <div className=" text-md text-gs_white w-full">
          {boardgame?.bg_name}
        </div>
        <div className=" text-xs text-gs_white/50">player</div>
        <div className=" text-md text-gs_white w-full">{player?.username}</div>
        <div className=" text-xs text-gs_white/50">comment</div>
        <div className=" text-md text-gs_white w-full">
          {
            "This game is so much fun and provider is very kind. Thank you to let me rent this game"
          }
        </div>
      </div>
      <div className=" flex flex-row justify-center text-md  w-full bg-black bg-opacity-20 p-1 text-yellow-500">
        <div className="rating">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400 hover:cursor-default "
            defaultChecked={reviewData.rating == 1}
            disabled
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400 hover:cursor-default"
            defaultChecked={reviewData.rating == 2}
            disabled
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400 hover:cursor-default"
            defaultChecked={reviewData.rating == 3}
            disabled
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400 hover:cursor-default"
            defaultChecked={reviewData.rating == 4}
            disabled
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400 hover:cursor-default"
            defaultChecked={reviewData.rating == 5}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
