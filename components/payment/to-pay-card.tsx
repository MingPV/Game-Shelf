"use client";
import { useEffect, useState } from "react";
import { toPayRentingRequest } from "@/app/types/game";
import { TbCurrencyBaht } from "react-icons/tb";

export default function BoardGameCard({
  boardgame,
}: {
  boardgame: toPayRentingRequest;
}) {
  const [boardgameData, setBoardgameData] = useState(boardgame);
  //console.log(boardgame);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB").slice(0, 8); // Format: "DD/MM/YY"
  };

  return (
    <div
      className={`card shadow-xl rounded-sm border border-white border-opacity-60 m-5 relative transition-all duration-300 grid grid-row md:grid-cols-3 gap-4`}
    >
      <div className="bg-white col-span-1 flex justify-start  md:w-full  h-64 m-2 md:m-4 overflow-hidden rounded-xl">
        <img
          src={boardgameData.boardgames.bg_picture}
          alt="boardgame picture"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="card-body flex flex-col p-2 md:p-4 md:col-span-2 m-4">
        <div className="flex items-start justify-between  w-full">
            <p className="text-lg font-semibold capitalize break-all md:text-2xl lg:text-3xl">
                {boardgameData.boardgames.bg_name}
            </p>
            <span className="col-span-3 md:col-span-4 flex items-center border rounded-md p-2">
                {boardgameData.invoices.amount} THB
            </span>
          
        </div>
        <div className="grid grid-cols-6 gap-4">

            <p className="font-bold col-span-3 md:col-span-2 flex items-center">provider:</p>
            <p className="col-span-3 md:col-span-4 flex items-center">
                {boardgameData.users.username}
            </p>

            <p className="font-bold col-span-3 md:col-span-2 flex items-center">date:</p>
            <p className="col-span-3 md:col-span-4 flex items-center">
                {formatDate(boardgameData.start_date)} &nbsp;- &nbsp;
                {formatDate(boardgameData.end_date)}
            </p>

            <p className="font-bold col-span-3 md:col-span-2 flex items-center">price:</p>
            <p className="col-span-3 md:col-span-4 flex items-center">
                {boardgameData.boardgames.price} 
                <TbCurrencyBaht /> / day
            </p>

            <p className="font-bold col-span-3 md:col-span-2 flex">status:</p>
            <div className="col-span-3 md:col-span-4">
                <a
                    href={boardgameData.invoices.payment_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn bg-gs_purple_gradient border-none flex-col px-10"
                    >
                    Pay Now
                    {/* <span className="text-xs ml-2 opacity-80">within 00:25:44</span> */}
                </a>
                <p className="text-xs opacity-50 mt-2">* please pay before the provider cancels this order</p>
            </div>

        </div>
      </div>
    </div>
  );
}
