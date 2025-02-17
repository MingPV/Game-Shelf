"use client";

import { selectGameAction } from "@/app/(game-pages)/actions";
import {
  deleteRentingRequest,
  updateRentingRequestStatus,
} from "@/app/(rental-pages)/actions";
import {
  createNotificationByUserId,
  selectUserById,
} from "@/app/(user-pages)/actions";
import { Boardgame, RentingRequest } from "@/app/types/game";
import { UserData } from "@/app/types/user";
import { useEffect, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

export default function LoadingCard() {
  return (
    <>
      <div className="flex flex-col justify-center rounded-sm p-4 w-full bg-black opacity-10 skeleton">
        <div className="flex flex-col gap-4 sm:gap-0 sm:grid sm:grid-flow-col sm:grid-cols-12 items-center ">
          <div className="col-span-6 md:col-span-5 lg:col-span-4 flex gap-2 items-center font-bold">
            <div className="flex relative h-7 w-7 rounded-full bg-white opacity-20">
              <img
                alt="provider profile"
                src={"/mock_player.jpg"}
                sizes="28px"
                className="rounded-full "
              />
            </div>
            <div className="bg-white opacity-10 rounded-lg">
              {"customer-----"}
            </div>
          </div>
          <div className="flex flex-row justify-start sm:col-span-5  md:col-span-3 lg:col-span-2 text-sm">
            <div className="sm:hidden">Boardgame name : </div>
            <div className="bg-white opacity-10 rounded-lg w-1/2">
              {"boardga"}
            </div>
          </div>
          <div className="hidden md:block md:col-span-3 lg:col-span-2 text-sm  ">
            <div className="bg-white opacity-10 rounded-lg w-1/2">
              {"board"}
            </div>
          </div>
          <div className="hidden lg:flex col-span-3 text-sm  items-center justify-start ">
            <div className="bg-white opacity-10 rounded-lg w-1/2">-----</div>
          </div>
          <div className="col-span-1 text-sm flex gap-2  items-center justify-end opacity-0">
            <button className="btn btn-outline btn-sm">
              <FaXmark />
            </button>
            <button className="btn btn-success btn-sm">
              <FaCheck />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
