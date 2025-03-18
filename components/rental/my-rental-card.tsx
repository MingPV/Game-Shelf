"use client";

import Image from "next/image";
import mockBoardGame from "../../public/mock_user.jpeg";
import { RentingRequestJoinBoardgameJoinProvider } from "@/app/types/game";
import Link from "next/link";
import { LuImagePlus } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import MyRentalModal from "./my-rental-modal";
import { useState, useEffect } from "react";

function StatusTag({ status }: { status: string }) {
  const statusClassMap = new Map<string, string>([
    ["complete", "border border-white"],
    ["pending", "bg-sky-500 text-slate-100"],
    ["unpaid", "bg-amber-600 text-slate-100"],
    ["canceled", "badge-error"],
    ["renting", "badge-success"],
    ["reserved", "bg-yellow-500 text-slate-100"],
  ]);

  const classes = statusClassMap.get(status);
  return (
    <span
      className={`rounded-lg px-5 py-2 transition-transform transform ${classes} hidden sm:block`}
    >
      {status}
    </span>
  );
}

function ReviewTag({ score }: { score: number | null }) {
  if (!score || score > 5)
    return (
      <button className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-7 h-7 my-1">
        <span className="flex">
          Review<span className="hidden sm:block pl-1">this boardgame</span>
        </span>
      </button>
    );
  else
    return (
      <div className="rating">
        <input
          type="radio"
          className="mask mask-star-2 bg-yellow-400"
          checked={score == 1}
          readOnly
        />
        <input
          type="radio"
          className="mask mask-star-2 bg-yellow-400"
          checked={score == 2}
          readOnly
        />
        <input
          type="radio"
          className="mask mask-star-2 bg-yellow-400"
          checked={score == 3}
          readOnly
        />
        <input
          type="radio"
          className="mask mask-star-2 bg-yellow-400"
          checked={score == 4}
          readOnly
        />
        <input
          type="radio"
          className="mask mask-star-2 bg-yellow-400"
          checked={score == 5}
          readOnly
        />
      </div>
    );
}

export default function MyRentalCard({
  data,
}: {
  data: RentingRequestJoinBoardgameJoinProvider;
}) {
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  // Calculate the difference in days
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  // Calculate total price
  const totalPrice = days * data.boardgames.price;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("after_ship");
  useEffect(() => {
    if (data.after_ship != null) {
      if (data.before_return != null) {
        setTag(""); // No tag needed
      } else {
        setTag("before_return");
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center w-full border p-4 sm:p-6 rounded-lg gap-3 sm:gap-6">
      <div className="relative w-full sm:w-[160px] h-[160px] sm:aspect-square">
        <Image
          alt="boardgame image"
          src={
            data.boardgames.bg_picture
              ? data.boardgames.bg_picture
              : mockBoardGame
          }
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-between sm:items-center w-full pb-3">
          <div className="font-bold text-xl">{data.boardgames.bg_name}</div>
          <StatusTag status={data.status} />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex pb-1">
            <div className="font-bold w-24 sm:w-36">Store:</div>
            <div>{data.provider.username}</div>
          </div>
          <div className="flex pb-1">
            <div className="font-bold w-24 sm:w-36">Date:</div>
            <div>
              {dateFormatter.format(new Date(data.start_date))} -{" "}
              {dateFormatter.format(new Date(data.end_date))}
            </div>
          </div>
          <div className="flex pb-1">
            <div className="font-bold w-24 sm:w-36">Total price:</div>
            <div>{totalPrice}&nbsp;Baht</div>
          </div>

          {/* After recieved image */}
          {data.status == "renting" && tag == "after_ship" && (
            <div className="flex">
              <div className="font-bold w-24 sm:w-36 pb-1">After recieved:</div>
              <button
                className="btn bg-pink-500 hover:bg-pink-500 border-none min-h-7 h-7 mr-2"
                onClick={() => setShowModal(true)}
              >
                <LuImagePlus />
              </button>
            </div>
          )}
          {data.status == "renting" && tag != "after_ship" && (
            <div className="flex items-center">
              <div className="font-bold w-24 sm:w-36 pb-1">After recieved:</div>
              <FaRegCheckCircle />
            </div>
          )}

          {/* Before return image */}
          {data.status == "renting" && tag == "before_return" && (
            <div className="flex">
              <div className="font-bold w-24 sm:w-36 pb-1">Before return:</div>
              <button
                className="btn bg-pink-500 hover:bg-pink-500 border-none min-h-7 h-7 mr-2"
                onClick={() => setShowModal(true)}
              >
                <LuImagePlus />
              </button>
            </div>
          )}
          {data.status == "renting" && tag == "" && (
            <div className="flex items-center">
              <div className="font-bold w-24 sm:w-36 pb-1">Before return:</div>
              <FaRegCheckCircle />
            </div>
          )}
          {(data.status == "renting" || data.status == "completed") && (
            <div className="flex">
              <div className="font-bold w-24 sm:w-36 pb-1">My rating:</div>
              <ReviewTag score={data.bg_id % 10} />
            </div>
          )}
          {data.status == "unpaid" && (
            <div className="flex">
              <div className="font-bold w-24 sm:w-36 pb-1">Payment:</div>
              <Link
                href="/to-pay"
                className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-7 h-7"
                prefetch={true}
              >
                Go to payment page
              </Link>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <MyRentalModal
          tag={tag}
          request_id={data.id}
          setShowModal={setShowModal}
          setTag={setTag}
        />
      )}
    </div>
  );
}
