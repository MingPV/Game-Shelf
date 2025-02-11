"use client";
import { useEffect, useState } from "react";
import { Boardgame, Boardgame_type, RentingRequest } from "@/app/types/game";
import ModalUpdateBg from "../inventory/modal-update-bg";
import DeleteBoardgame from "../inventory/delete-bg";
import { TbCurrencyBaht } from "react-icons/tb";
import { StatusTracking } from "../inventory/status-tracking";
import { selectRentingRequest } from "@/app/(game-pages)/actions";

type BoardgameType = {
  [key: string]: string;
};

export default function BoardGameCard({
  boardgame,
  boardgame_type,
}: {
  boardgame: Boardgame;
  boardgame_type: BoardgameType;
}) {
  const isAvailable = boardgame.status === "available";
  const [showProgess, setShowProgess] = useState(false);
  const [rentingRequest, setRentingRequest] = useState<RentingRequest[]>([]);

  const getRentingRequest = async () => {
    const renting_req = await selectRentingRequest(boardgame.id);
    setRentingRequest(renting_req);
    console.log("renting req", renting_req, boardgame.id);
  };

  useEffect(() => {
    if (!isAvailable) {
      getRentingRequest();
    }
  }, [isAvailable]);

  return (
    <div
      className={`card card-side shadow-xl border-white border-[1px] m-5 relative transition-all duration-300 grid grid-row md:grid-cols-3 justify-center items-center`}
    >
      <div className="bg-white col-span-1 flex justify-center items-center  md:w-full  h-64 m-2 md:m-4 overflow-hidden rounded-xl">
        <img
          src={boardgame.bg_picture}
          alt="boardgame picture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="card-body flex flex-col p-2 md:p-4 md:col-span-2 m-4">
        <div className="flex flex-row items-start justify-between w-full">
          <p className="text-3xl font-semibold capitalize">
            {boardgame.bg_name}
          </p>
          <button
            className={`rounded-lg px-5 py-2 transition-transform transform ${isAvailable ? "bg-gs_green" : "bg-gs_red/60"} hover:opacity-80`}
            onClick={() =>
              !isAvailable
                ? setShowProgess(!showProgess)
                : setShowProgess(false)
            }
          >
            {boardgame.status}
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <p className="font-bold col-span-1">Type:</p>
          <ol className="flex flex-wrap gap-2 col-span-4">
            {boardgame.types?.map((type, index) => (
              <li
                key={index}
                className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-md shadow-sm"
              >
                {boardgame_type[type]}
              </li>
            ))}
          </ol>

          <p className="font-bold col-span-1">Price:</p>
          <p className="col-span-4 flex inline-flex items-center">
            {boardgame.price} &nbsp;
            <TbCurrencyBaht /> / day
          </p>

          <p className="font-bold col-span-1">Description:</p>
          <p className="col-span-4 line-clamp-3">{boardgame.description}</p>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out ${
            showProgess
              ? "max-h-screen opacity-100 scale-100 translate-y-0"
              : "max-h-0 opacity-0 "
          }`}
        >
          {showProgess && <StatusTracking rentingRequest={rentingRequest} />}
        </div>

        <div className="flex justify-end gap-2 ">
          <ModalUpdateBg boardgame={boardgame} />
          <DeleteBoardgame boardgameId={boardgame.id} />
        </div>
      </div>
    </div>
  );
}
