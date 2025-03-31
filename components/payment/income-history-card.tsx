"use client";

import { selectBoardgameByReceiptId } from "@/app/(payment-pages)/actions";
import { Boardgame } from "@/app/types/game";
import { Receipt } from "@/app/types/receipt";
import { UserData } from "@/app/types/user";
import { useEffect, useState } from "react";

interface ReceiptCardProps {
  receipt: Receipt;
}

export default function ReceiptCard({ receipt }: ReceiptCardProps) {
  const [profileURL, setProfileURL] = useState("/mock_provider.jpeg");
  const [boardgame, setBoardgame] = useState<Boardgame>();
  const [customer, setCustomer] = useState<UserData>();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const fetchUserByID = async (
      userID: string
    ): Promise<{
      data: UserData[];
      token: string;
    }> => {
      const res = await fetch(`/api/users/${userID}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchBoardgameByReceipt = async (
      receipt_id: string
    ): Promise<{
      data: Boardgame;
      token: string;
    }> => {
      const queryString = new URLSearchParams({
        receipt_id: receipt_id,
      }).toString();

      const res = await fetch(`/api/boardgames/receiptId?${queryString}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    async function fetchPlayer() {
      const { data: res } = await fetchUserByID(receipt.customer_id);
      if (res.length > 0) {
        setCustomer(res[0]);
      }
    }

    async function fetchBoardgame() {
      // const res = await selectBoardgameByReceiptId(receipt.id);
      const { data: res } = await fetchBoardgameByReceipt(
        receipt.id.toString()
      );
      setBoardgame(res);
      console.log("Banana1123");
      console.log(res);
    }

    fetchPlayer();
    fetchBoardgame();
    setProfileURL(customer?.profilePicture || "/mock_provider.jpeg");
  }, []);

  function formatDateRange(endDateStr: string): string {
    const endDate = new Date(endDateStr);

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };

    const endStr = endDate.toLocaleDateString("en-GB", options);
    const year = endDate.getFullYear();

    return `${endStr} ${year}`;
  }

  return !isHidden ? (
    <>
      <div className="flex flex-col justify-center rounded-sm border border-white border-opacity-30 p-4 w-full  ">
        <div className="flex flex-col gap-4 sm:gap-0 sm:grid sm:grid-flow-col sm:grid-cols-12 items-center ">
          <div className="col-span-6 md:col-span-5 lg:col-span-4 flex gap-2 items-center font-bold">
            <div className="flex relative h-7 w-7 rounded-full">
              <img
                alt="provider profile"
                src={profileURL}
                sizes="28px"
                className="rounded-full"
              />
            </div>
            {customer?.username}
          </div>
          <div className="flex flex-row justify-start sm:col-span-6  md:col-span-4 lg:col-span-3 text-sm">
            <div className="sm:hidden">Boardgame name : </div>
            <div>{boardgame?.bg_name}</div>
          </div>
          <div className="hidden md:block md:col-span-3 lg:col-span-2 text-sm text-lime-500">
            {receipt.amount} Bath
          </div>
          <div className="hidden lg:flex col-span-3 text-sm  items-center justify-start">
            {formatDateRange(receipt.end_date.toString())}
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
