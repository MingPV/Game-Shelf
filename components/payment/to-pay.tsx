"use client";

import { BoardgameItems } from "@/components/payment/to-pay-item";
import { selectMyToPayBoardGame } from "@/app/(payment-pages)/actions";
import { useEffect, useState } from "react";
import { UserData } from "@/app/types/user";

export default function ToPayList() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const user_data = await selectMyToPayBoardGame();
      //console.log("Fetched data:", user_data);

      if (user_data && user_data.length > 0) {
        //console.log("Fetched UID:", user_data[0]?.uid);
        setUserData(user_data[0]);
      }
    }

    fetchUserData();
  }, []);

  return (
    <>
      <main className="w-full flex flex-col gap-5">
        {userData ? (
          <div className="flex justify-center text-3xl">
            <p className="font-bold">{userData.username}</p>'s to pay Boardgame
          </div>
        ) : null}
        <BoardgameItems player_id={userData?.uid || ""} />
      </main>
    </>
  );
}
