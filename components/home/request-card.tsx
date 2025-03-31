"use client";

import { Boardgame, RentingRequest } from "@/app/types/game";
import React, { useEffect, useState } from "react";

interface RentalCardProps {
  requestData: RentingRequest;
}

export default function RequestCard({ requestData }: RentalCardProps) {
  const [boardgame, setBoardgame] = useState<Boardgame | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function formatDateRange(startDateStr: string, endDateStr: string): string {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };

    const startStr = startDate.toLocaleDateString("en-GB", options);
    const endStr = endDate.toLocaleDateString("en-GB", options);
    const year = endDate.getFullYear();

    return `${startStr} - ${endStr} ${year}`;
  }

  useEffect(() => {
    const fetchBoardgameById = async (
      boardgameID: Number
    ): Promise<{
      data: Boardgame;
      token: string;
    }> => {
      const res = await fetch(`/api/boardgames/${boardgameID}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchBoardgame = async () => {
      const { data: fetchData } = await fetchBoardgameById(requestData.bg_id);
      setBoardgame(fetchData);
      setIsLoading(false);
    };

    fetchBoardgame();
  }, []);

  return isLoading ? null : (
    <div className="flex flex-col min-w-48 w-48 bg-amber-700 bg-opacity-80 rounded-xl items-center justify-between mr-4">
      <div className="flex flex-col w-full p-4">
        <div className=" text-xs text-gs_white/50">name</div>
        <div className=" text-md text-gs_white w-full">
          {boardgame?.bg_name}
        </div>
        {/* <div className=" text-xs text-gs_white/50">player</div>
        <div className=" text-md text-gs_white w-full">{"player_name"}</div> */}
      </div>
      <div className=" flex flex-row justify-center text-md text-white text-opacity-40 w-full bg-black bg-opacity-20 p-1 text-xs ">
        {formatDateRange(requestData.start_date, requestData.end_date)}
      </div>
    </div>
  );
}

// export function RequestLoadingCard() {
//   return (
//     <div className="flex flex-col w-48 bg-amber-700 bg-opacity-80 rounded-xl items-center justify-between mr-4 skeleton opacity-0">
//       <div className="flex flex-col w-full p-4">
//         <div className=" text-xs text-gs_white/50">name</div>
//         <div className=" text-md text-gs_white w-full bg-white opacity-30 rounded-lg">
//           ----------------
//         </div>
//       </div>
//       <div className=" flex flex-row justify-center text-md text-white text-opacity-40 w-full bg-black bg-opacity-20 p-1 text-xs opacity-0">
//         {"formatDateRange(requestData.start_date, requestData.end_date)"}
//       </div>
//     </div>
//   );
// }
