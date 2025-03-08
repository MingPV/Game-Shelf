"use client";

import { Boardgame } from "@/app/types/game";
import HeartButton from "./heart-button";
import { useEffect, useState } from "react";
import { UserData } from "@/app/types/user";
import { useDebouncedCallback } from "use-debounce";
import { getMyUserData } from "@/app/(user-pages)/actions";
import { createRentalRequest } from "@/app/(rental-pages)/actions";
import { useRouter } from "next/navigation";

export default function GameDetailLeft({
  boardgame,
  provider,
}: {
  boardgame: Boardgame;
  provider: UserData | null;
}) {
  const [myData, setMyData] = useState<UserData>();
  const [filled, setFilled] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDate, setTotalDate] = useState<number>(0);
  const [isSending, setIsSending] = useState(false);

  const router = useRouter();

  const calculateTotalDate = useDebouncedCallback(() => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    setTotalDate(differenceInDays);
  }, 500);

  useEffect(() => {
    const fetchMyData = async () => {
      const fetchData = await getMyUserData();
      setMyData(fetchData);
      console.log(fetchData);
    };

    fetchMyData();
    calculateTotalDate();
  }, [startDate, endDate]);

  const today = new Date().toISOString().split("T")[0];

  const checkOK = async () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const todayDate = new Date(today);

    if (start < todayDate || end < todayDate) {
      alert("Dates cannot be in the past.");
      return;
    }

    // Validation: End date must be after start date
    if (end <= start) {
      alert("End date must be after the start date.");
      return;
    }

    if (!startDate || !endDate) {
      alert("No date selected.");
      return;
    }

    console.log(startDate);
    console.log(endDate);

    // alert("confirm!");

    if (!myData || !provider) {
      return;
    }

    setIsSending(true);

    const { data, error } = await createRentalRequest(
      start,
      end,
      myData.uid,
      provider.uid,
      boardgame.id
    );
    if (!error) {
      setIsSending(false);
      setOpenDialog(false);
    } else {
      setIsSending(false);
    }
  };

  const handleModal = () => {
    if (!myData) {
      router.push("/sign-in");
      return;
    }
    setOpenDialog(true);
  };

  return (
    <div className="flex flex-col p-4 md:p-6 lg:p-10 bg-white/10 rounded-xl items-center justify-between gap-3 lg:gap-6 w-80 self-center lg:w-96 md:h-auto">
      <div className="w-4/5 md:w-[90%] rounded-xl">
        <img
          src={boardgame.bg_picture}
          alt={boardgame.bg_name}
          className="rounded-xl"
        />
      </div>

      <div className="space-y-1 w-full">
        <div className="flex flex-row justify-between text-sm md:text-base text-gs_white/50 w-full">
          <p>name</p>
          <p>baht / day</p>
        </div>

        <div className="flex flex-row justify-between text-lg md:text-xl lg:text-2xl font-semibold text-gs_white w-full gap-10">
          <p>{boardgame.bg_name}</p>
          <p>{boardgame.price}</p>
        </div>
      </div>

      <div className="flex flex-row w-full gap-2">
        <HeartButton
          filled={filled}
          onChange={(filled: boolean) => setFilled(filled)}
        />
        <button
          className="w-full font-semibold text-sm px-4 rounded-xl py-2 self-end border border-white border-opacity-0 hover:border-opacity-80 bg-gs_purple_gradient"
          onClick={handleModal}
          disabled={myData?.isProvider || boardgame.status == "unavailable"}
        >
          {myData?.isProvider ? (
            <div className="text-xs text-white text-opacity-50 font-serif">
              you can't booking as a provider
            </div>
          ) : boardgame.quantity == boardgame.renting ? (
            <div>out of stock</div>
          ) : (
            <div>Rent</div>
          )}
        </button>
      </div>
      {boardgame.quantity == boardgame.renting ? (
        <div className="w-full flex justify-end text-sm font-bold text-slate-300 text-opacity-50">
          out of stock
        </div>
      ) : (
        <div className="w-full flex justify-end text-sm font-bold text-slate-300 text-opacity-50">
          {boardgame.quantity - boardgame.renting} boardgames in stock
        </div>
      )}

      <dialog open={openDialog} className="modal">
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="modal-box bg-slate-50 w-1/2  flex flex-col text-black space-y-5 shadow-none">
            <p className="font-bold text-lg md:text-xl lg:text-2xl">Booking Request</p>

            <div className="flex flex-col md:flex-row w-full">
              <p className="w-full md:w-1/5 lg:w-1/4 font-semibold">Name :</p>
              <p>{boardgame.bg_name}</p>
            </div>

            <div className="flex flex-col md:flex-row w-full">
              <p className="w-full md:w-1/5 lg:w-1/4 font-semibold">Store :</p>
              <p>{provider ? provider.username : "N/A"}</p>
            </div>

            <div className="flex flex-col md:flex-row w-full">
              <p className="w-full md:w-1/5 lg:w-1/4 font-semibold">Price :</p>
              <p>{boardgame.price} Bath/Day</p>
            </div>

            <div className="flex flex-col md:flex-row w-full">
              <p className="w-full md:w-1/5 lg:w-1/4 font-semibold">Date :</p>
              <div className="flex flex-col md:flex-row gap-0 md:gap-2 lg:gap-4">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white text-black text-sm lg:text-base border-slate-700 text-center rounded-md border black-calendar-icon"
                />
                <p>to</p>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white text-black text-sm lg:text-base border-slate-700 text-center rounded-md border black-calendar-icon"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full">
              <p className="w-full md:w-1/5 lg:w-1/4 font-semibold">Total :</p>
              <p
                className={`${totalDate < 0 ? "text-red-600 font-bold" : ""}`}
              >
                {totalDate < 0
                  ? "Invalid date"
                  : `${totalDate} Days (${boardgame.price * totalDate} Bath in Total)`}
              </p>
            </div>

              <div className="w-full flex flex-row justify-between text-white h-9 gap-4 my-6">
                <button
                  onClick={() => setOpenDialog(false)}
                  className="w-1/2 border rounded-xl bg-red-500"
                >
                  cancel
                </button>
                <button
                  className="w-1/2 border rounded-xl bg-green-500"
                  onClick={checkOK}
                >
                  confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
