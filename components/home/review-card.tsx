import { ReviewData } from "@/app/types/review";
import React from "react";

interface ReviewCardProps {
  reviewData: ReviewData;
}

export default function ReviewCard({ reviewData }: ReviewCardProps) {
  return (
    <div className="flex flex-col w-full bg-white/10 rounded-xl items-center justify-between mr-4">
      <div className="flex flex-col w-full p-4">
        <div className=" text-xs text-gs_white/50">name</div>
        <div className=" text-md text-gs_white w-full">{"boardgame_name"}</div>
        <div className=" text-xs text-gs_white/50">player</div>
        <div className=" text-md text-gs_white w-full">{"player_name"}</div>
        <div className=" text-xs text-gs_white/50">player</div>
        <div className=" text-md text-gs_white w-full">
          {
            "This game is so much fun and provider is very kind. Thank you to let me rent this game"
          }
        </div>
      </div>
      <div className=" flex flex-row justify-center text-md  w-full bg-black bg-opacity-20 p-1 text-yellow-500">
        star star star star
      </div>
    </div>
  );
}
