"use client";

import { useEffect, useState } from "react";
import RequestCard from "./rental-request-card";
import { RentingRequest } from "@/app/types/game";
import LoadingCard from "./rental-request-loading";
import { UserData } from "@/app/types/user";

export default function RentalRequestList() {
  const [myData, setMyData] = useState<UserData>();
  const [requests, setRequests] = useState<RentingRequest[]>([]);
  const [isLoadingReq, setIsLoadingReq] = useState(true);

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

    const fetchMyRequest = async (): Promise<{
      data: RentingRequest[];
    }> => {
      const res = await fetch("/api/rental/requests", {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    async function fetchData() {
      const { data: res } = await fetchMyRequest();
      const { data: res2 } = await fetchMyData();
      setRequests(res || []);
      setMyData(res2);
      setIsLoadingReq(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center w-10/12">
          <div className="text-2xl font-bold pb-2">Manage Rental Request</div>
          <div className="flex flex-col bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full mb-4">
            <div className="text-lg pb-4 font-bold">Board Game Requested</div>
            <div className="hidden sm:grid grid-flow-col grid-cols-12 mb-2">
              <div className="col-span-6 md:col-span-5 lg:col-span-4 text-xs opacity-60">
                All in shop
              </div>
              <div className="sm:col-span-5  md:col-span-3 lg:col-span-2 text-xs opacity-60">
                Boardgame Name
              </div>
              <div className="hidden md:block md:col-span-3 lg:col-span-2 text-xs opacity-60">
                price
              </div>
              <div className="hidden lg:flex col-span-3 text-xs opacity-60">
                Reservation
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
              {requests.length > 0 && myData ? (
                requests?.map((item) =>
                  item.status == "pending" ? (
                    <RequestCard
                      rentalRequest={item}
                      key={item.id}
                      setRequests={setRequests}
                      provider={myData}
                    />
                  ) : null
                )
              ) : isLoadingReq || !myData ? (
                <>
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                </>
              ) : (
                <p>No verification requests</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
