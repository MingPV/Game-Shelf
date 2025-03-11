"use client";

import { Suspense, useEffect, useState } from "react";
import RequestCard from "./rental-request-card";
import { RentingRequest } from "@/app/types/game";
import { selectMyRentingRequest } from "@/app/(rental-pages)/actions";
import LoadingCard from "./rental-request-loading";

export default function RentalRequestList() {
  const [requests, setRequests] = useState<RentingRequest[]>([]);
  const [isLoadingReq, setIsLoadingReq] = useState(true);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);

  useEffect(() => {
    async function fetchRequest() {
      const res = await selectMyRentingRequest();
      setRequests(res || []);
      setIsLoadingReq(false);
    }

    fetchRequest();
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
              {requests.length > 0 ? (
                requests?.map((item) =>
                  item.status == "pending" ? (
                    <RequestCard rentalRequest={item} key={item.id} setRequests={setRequests} />
                  ) : null
                )
              ) : isLoadingReq ? (
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
