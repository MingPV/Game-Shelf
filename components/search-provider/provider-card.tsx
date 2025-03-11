"use client";

import { useState } from "react";
import { UserData } from "@/app/types/user";
import Link from "next/link";

type BoardgameType = {
  [key: string]: string;
};

export default function ProviderCard({ provider }: { provider: UserData }) {
  const [filled, setFilled] = useState<boolean>(false);
  return (
    <div className="flex flex-col p-3  w-full md:w-64 bg-white/10 rounded-t-2xl items-center space-y-2 justify-between border-b-2 border-opacity-0  border-white hover:border-opacity-20">
      <div className="flex flex-col gap-1">
        <div className="h-56 w-56 rounded-xl ">
          <img
            src={provider.profilePicture}
            alt={provider.username}
            className="rounded-full w-full h-56"
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between text-xs text-gs_white/50 w-full">
            <p>name</p>
            <p>rental success</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between text-md text-gs_white w-full">
            <p>{provider.username}</p>
            <p className="text-lime-500 ">
              {provider.rental_success.toString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full gap-2">
        <Link
          className="w-full font-semibold text-sm px-4  text-center rounded-xl py-2 self-end hover:border border border-white border-opacity-10 bg-white bg-opacity-10 hover:bg-opacity-15"
          href={`/profile/${provider.username}`}
        >
          Go to Profile
        </Link>
      </div>
    </div>
  );
}
