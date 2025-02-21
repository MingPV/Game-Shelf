import { RentingRequest } from "@/app/types/game";
import React from "react";

interface RentalCardProps {
  requestData: RentingRequest;
}

export default function RequestCard({ requestData }: RentalCardProps) {
  return (
    <div className="flex flex-col w-full bg-amber-700 bg-opacity-80 rounded-xl items-center justify-between mr-4">
      <div className="flex flex-col w-full p-4">
        <div className=" text-xs text-gs_white/50">name</div>
        <div className=" text-md text-gs_white w-full">{"boardgame_name"}</div>
        {/* <div className=" text-xs text-gs_white/50">player</div>
        <div className=" text-md text-gs_white w-full">{"player_name"}</div> */}
      </div>
      <div className=" flex flex-row justify-center text-md text-gs_white w-full bg-black bg-opacity-20 p-1 text-xs">
        {"21/10 - 25/10 2025"}
      </div>
    </div>
  );
}
