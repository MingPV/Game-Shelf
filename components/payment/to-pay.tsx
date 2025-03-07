"use client";

import { BoardgameItems } from "@/components/payment/to-pay-item";
import { selectMyToPayBoardGame } from "@/app/(payment-pages)/actions";
import { useEffect, useState, useCallback } from "react";
import { UserData } from "@/app/types/user";
import Skeleton from "./skeleton";
import { useDebouncedCallback } from "use-debounce";

export default function ToPayList() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchUserData = useCallback(async () => {
    setIsFetching(true);

    const user_data = await selectMyToPayBoardGame();
    //console.log("Fetched data:", user_data);
  
    if (user_data && user_data.length > 0) {
      //console.log("Fetched UID:", user_data[0]?.uid);
      setUserData(user_data[0]);
    }
    
    setIsFetching(false);

  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  
  return (
    <>
      <main className="w-full flex flex-col gap-5">
        {isFetching ? (
          <div className="w-[85%] mx-auto bg-white bg-opacity-10 rounded-2xl p-1 lg:p-2">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (userData ? (
            <div>
              <div className="flex justify-center text-3xl">
                <p className="font-bold">{userData.username}</p>'s to pay Boardgame
              </div>
              <BoardgameItems player_id={userData?.uid || ""} />
            </div>
          ) : null )
        }
      </main>
    </>
  );
}
