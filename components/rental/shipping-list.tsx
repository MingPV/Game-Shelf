"use client";

import { useState } from "react";
import { RentingRequestJoinBoardgameJoinCustomer } from "@/app/types/game";
import { AiOutlineHome } from "react-icons/ai";
import { PiPackage } from "react-icons/pi";
import RentingShippingCard from "./shipping-card";

export default function RentingShippingList() {
  const [reservedRequests, setReservedRequests] = useState<RentingRequestJoinBoardgameJoinCustomer[]>([]);
  const [rentingRequests, setRentingRequests] = useState<RentingRequestJoinBoardgameJoinCustomer[]>([]);
  const [showReserved, setShowReserved] = useState<boolean>(true);
  
  return (
    <div className="w-full md:w-10/12 h-[calc(100vh-240px)] md:h-[calc(100vh-180px)]">

      {/* Labtop Layout */}
      <div className="hidden lg:flex gap-8 justify-center">
        <RentingShippingCard 
          title="shipped" 
          icon={<PiPackage strokeWidth={5} />} 
          status="reserved" 
          nextStatus="renting" 
          requests={reservedRequests}
          setRequests={setReservedRequests}
          setNextRequest={setRentingRequests} 
        />
        <RentingShippingCard
          title="returned" 
          icon={<AiOutlineHome strokeWidth={8} />} 
          status="renting" 
          nextStatus="available" 
          requests={rentingRequests}
          setRequests={setRentingRequests}
          setNextRequest={null} 
        />
      </div>

      {/* Phone Layout */}
      <div className="p-2 bg-white/10 rounded-lg lg:hidden">
        <div className="flex w-full gap-2 rounded-lg bg-white/10 p-2 mb-2 font-bold">
          <button className={`flex gap-2 items-center justify-center w-1/2 py-2 rounded-lg ${showReserved ? 'bg-gs_purple_gradient' : 'bg-transparent'}`} onClick={() => setShowReserved(true)}>
            To be shipped
            <PiPackage className="hidden sm:block" strokeWidth={5} />
          </button>
          <button className={`flex gap-2 items-center justify-center w-1/2 py-2 rounded-lg ${!showReserved ? 'bg-gs_purple_gradient' : 'bg-transparent'}`} onClick={() => setShowReserved(false)}>
            To be returned
            <AiOutlineHome className="hidden sm:block" strokeWidth={8} />
          </button>
        </div>

        <div className={`flex w-full justify-center h-[calc(100vh-240px)] ${showReserved ? "" : "hidden"}`}>
          <RentingShippingCard 
            title="shipped" 
            icon={<PiPackage strokeWidth={5} />} 
            status="reserved" 
            nextStatus="renting" 
            requests={reservedRequests}
            setRequests={setReservedRequests}
            setNextRequest={setRentingRequests} 
          />
        </div>

        <div className={`flex w-full justify-center h-[calc(100vh-240px)] ${!showReserved ? "" : "hidden"}`}>
        <RentingShippingCard 
          title="returned" 
          icon={<AiOutlineHome strokeWidth={8} />} 
          status="renting" 
          nextStatus="available" 
          requests={rentingRequests}
          setRequests={setRentingRequests}
          setNextRequest={null} 
        />
        </div>
      </div>
    </div>
  );
}
