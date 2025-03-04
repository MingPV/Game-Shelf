"use client";

import { selectPlayerRentingRequest } from "@/app/(rental-pages)/actions";
import { RentingRequestJoinBoardgameJoinProvider } from "@/app/types/game";
import { useEffect, useState } from "react";
import MyRentalCard from "./my-rental-card";
import MyRentalLoading from "./my-rental-loading";

export default function MyRentalList() {
  const [rentals, setRentals] = useState<RentingRequestJoinBoardgameJoinProvider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRentalHistory = async () => {
      const fetched = await selectPlayerRentingRequest();
      setRentals(fetched);
      setIsLoading(false);
    };

    fetchRentalHistory();
  }, []);
  
  return (
    <div className="flex flex-col items-center bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full mb-4 gap-4">
      {rentals.length > 0 ? (
        rentals?.map((item, index) =>
            <MyRentalCard key={index} data={item} />
        )
        ) : isLoading ? (
        <>
            <MyRentalLoading />
            <MyRentalLoading />
            <MyRentalLoading />
        </>
        ) : (
        <p>No renting requests</p>
      )}
    </div>

  );
}
