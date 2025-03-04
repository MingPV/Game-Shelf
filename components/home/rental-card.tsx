"use client";

import { RentingRequest } from "@/app/types/game";
import React from "react";

interface RentalCardProps {
  rentalData: RentingRequest;
}

export default function RentalCard({ rentalData }: RentalCardProps) {
  return (
    <div className="flex flex-col w-full bg-white/10 rounded-xl items-center justify-between mr-4">
      <div className="flex flex-col w-full p-4">
        <div className=" text-xs text-gs_white/50">name</div>
        <div className=" text-md text-gs_white w-full">{"boardgame_name"}</div>
        <div className=" text-xs text-gs_white/50">player</div>
        <div className=" text-md text-gs_white w-full">{"player_name"}</div>
      </div>
      <div className=" flex flex-row justify-center text-md text-gs_white w-full bg-black bg-opacity-20 p-1">
        {"status"}
      </div>
    </div>
  );
}
