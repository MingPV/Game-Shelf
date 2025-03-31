"use client";
import { useState } from "react";
import { Boardgame, Boardgame_type, RentingRequest } from "@/app/types/game";
import ModalUpdateBg from "../inventory/modal-update-bg";
import DeleteBoardgame from "../inventory/delete-bg";
import { TbCurrencyBaht } from "react-icons/tb";

type BoardgameType = {
  [key: string]: string;
};

export default function BoardGameCard({
  boardgame,
  boardgame_type,
  boardgame_types,
}: {
  boardgame: Boardgame;
  boardgame_type: BoardgameType;
  boardgame_types: Boardgame_type[];
}) {
  const [boardgameData, setBoardgameData] = useState(boardgame);
  const isAvailable = boardgameData.status === "available";
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className={`card shadow-xl rounded-sm border border-white border-opacity-60 m-5 relative transition-all duration-300 grid grid-row md:grid-cols-3`}
    >
      <div className="bg-white col-span-1 flex justify-start  md:w-full  h-64 m-2 md:m-4 overflow-hidden rounded-xl">
        <img
          src={boardgameData.bg_picture}
          alt="boardgame picture"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="card-body flex flex-col p-2 md:p-4 md:col-span-2 m-4">
        <div className="flex flex-col lg:flex-row items-start justify-between w-full">
          <p className="text-lg font-semibold capitalize break-all md:text-2xl lg:text-3xl">
            {boardgameData.bg_name}
          </p>

          <button
            className={`rounded-lg px-5 py-2 transition-transform transform ${isAvailable ? "bg-gs_green" : "bg-gs_red/60"} hover:opacity-80 `}
          >
            {boardgameData.status}
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <p className="font-bold mt-2 col-span-3 md:col-span-2">Type:</p>
          <ol className="flex flex-wrap mt-2 gap-2 col-span-3 md:col-span-4">
            {boardgameData.types?.map((type, index) => (
              <li
                key={index}
                className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-md shadow-sm"
              >
                {boardgame_type[type]}
              </li>
            ))}
          </ol>

          <p className="font-bold col-span-3 md:col-span-2">Price:</p>
          <p className="col-span-3 md:col-span-4 flex items-center">
            {boardgameData.price} &nbsp;
            <TbCurrencyBaht /> / day
          </p>

          {boardgameData.quantity && (
            <>
              <p className="font-bold col-span-3 md:col-span-2">Quantity:</p>

              <p className="col-span-3 md:col-span-4 flex items-center text-lime-500">
                {boardgameData.quantity} &nbsp; pieces
              </p>
              <p className="font-bold col-span-3 md:col-span-2">
                Currently being rented:
              </p>

              <p className="col-span-3 md:col-span-4 flex items-center text-amber-500">
                {boardgameData.renting} &nbsp; pieces
              </p>
            </>
          )}

          <p className="font-bold col-span-3 md:col-span-2">Description:</p>
          <div className="flex flex-col col-span-4">
            <p className="capitalize break-all "></p>
            <div className="flex flex-col justify-start capitalize break-all">
              {showDetail
                ? boardgameData.description
                : boardgameData.description.slice(0, 50)}
              {!showDetail && boardgameData.description.length > 50 ? (
                <button
                  className="text-gray-100 opacity-70 text-start"
                  onClick={() => setShowDetail(!showDetail)}
                >
                  ..more details
                </button>
              ) : boardgameData.description.length > 50 ? (
                <button
                  className="text-gray-100 opacity-70 text-start"
                  onClick={() => setShowDetail(!showDetail)}
                >
                  show less
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end gap-2">
          <ModalUpdateBg
            boardgame={boardgameData}
            setBoardgameData={setBoardgameData}
            boardgame_types={boardgame_types}
            key={boardgameData.id}
          />
          <DeleteBoardgame boardgameId={boardgameData.id} />
        </div>
      </div>
    </div>
  );
}
