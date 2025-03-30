"use client";

import { RentingRequestJoinBoardgameJoinProvider } from "@/app/types/game";
import { useEffect, useState } from "react";
import MyRentalCard from "./my-rental-card";
import MyRentalLoading from "./my-rental-loading";
import { UserData } from "@/app/types/user";

export default function MyRentalList() {
  const [rentals, setRentals] = useState<
    RentingRequestJoinBoardgameJoinProvider[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const fetchMyData = async (): Promise<{
      data: UserData;
      token: string;
    }> => {
      const res = await fetch("/api/users/me", {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchMyRental = async (): Promise<{
      data: RentingRequestJoinBoardgameJoinProvider[];
    }> => {
      const res = await fetch("/api/rental/myRental", {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchData = async () => {
      const { data: fetched } = await fetchMyRental();
      const { data: fetched2 } = await fetchMyData();
      setRentals(fetched);
      setUserData(fetched2);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full mb-4 gap-4">
      {rentals.length > 0 && userData ? (
        rentals?.map((item, index) => (
          <MyRentalCard key={index} data={item} userData={userData} />
        ))
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
