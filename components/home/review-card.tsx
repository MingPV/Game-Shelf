"use client";

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
    const fetchUserByID = async (
      userID: string
    ): Promise<{
      data: UserData[];
      token: string;
    }> => {
      const res = await fetch(`/api/users/${userID}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };
    const fetchBoardgameById = async (
      boardgameID: Number
    ): Promise<{
      data: Boardgame;
      token: string;
    }> => {
      const res = await fetch(`/api/boardgames/${boardgameID}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchPlayer = async () => {
      const { data: fetchData } = await fetchUserByID(reviewData.customer_id);
      setPlayer(fetchData[0]);
    };
    const fetchBoardgame = async () => {
      const { data: fetchData } = await fetchBoardgameById(reviewData.bg_id);
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
      <div className=" flex flex-row justify-center text-md  w-full bg-black bg-opacity-20 p-1 text-yellow-500 rounded-b-xl">
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
