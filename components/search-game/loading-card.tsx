"use client";

import { useState } from "react";

export default function LoadingGameCard() {
  return (
    <div className="flex flex-col p-3 w-full md:w-64 bg-white/10 rounded-xl items-center space-y-2 skeleton bg-black opacity-30">
      <div className="h-[65%] w-full rounded-xl relative opacity-0">
        <img src={"/mock_user.jpeg"} className="rounded-xl" />
        <button className="absolute bottom-1 left-1 hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
      </div>
      <div className="h-1/5 w-full flex-col">
        <p className="text-right mt-1 text-sm bg-white w-1/2 rounded-lg opacity-20">
          ----------
        </p>
        <p className="text-right mt-1 text-sm bg-white w-1/3 rounded-lg opacity-20">
          ------
        </p>
      </div>
      <button
        className="font-semibold text-sm px-4 w-2/5 rounded-xl py-2 self-end hover:border  bg-white  opacity-20"
        onClick={() => alert("clicked!")}
      >
        Details
      </button>
    </div>
  );
}
