"use client";

import { selectMyRentingRequestByStatus, updateRentingRequestStatus } from "@/app/(rental-pages)/actions";
import { useState, useEffect } from "react";
import { RentingRequestJoinBoardgameJoinCustomer } from "@/app/types/game";

export default function ShippingList() {
  const [reservedRequests, setReservedRequests] = useState<RentingRequestJoinBoardgameJoinCustomer[]>([]);
  const [rentingRequests, setRentingRequests] = useState<RentingRequestJoinBoardgameJoinCustomer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

    const handleReserve = (req: RentingRequestJoinBoardgameJoinCustomer) => {
        setReservedRequests((prevRequests) => prevRequests.filter((r) => r.id !== req.id));
        setRentingRequests((prevRequests) => [...prevRequests, req]);
        updateRentingRequestStatus(req.id, "renting");
    };

    const handleRenting = (req: RentingRequestJoinBoardgameJoinCustomer) => {
        setRentingRequests((prevRequests) => prevRequests.filter((r) => r.id !== req.id));
        updateRentingRequestStatus(req.id, "available");
    };
  
    useEffect(() => {
      async function fetchData() {
        const reservedRes = await selectMyRentingRequestByStatus("reserved");
        setReservedRequests(reservedRes || []);
        const rentingRes = await selectMyRentingRequestByStatus("renting");
        setRentingRequests(rentingRes || []);
        setIsLoading(false);
      }
  
      fetchData();
    }, []);

    return (
        <div className="">
            {reservedRequests.length > 0 ? (
            reservedRequests?.map((item, index) =>
                <div key={index}>
                    {item.bg_id}
                    <button className="btn btn-success ml-4" onClick={() => handleReserve(item)}>Ship</button>
                </div>
            )
            ) : isLoading ? (
            <>
                Loading...
            </>
            ) : (
            <p>No reserved requests</p>
            )}
            <div>---</div>
            {rentingRequests.length > 0 ? (
            rentingRequests?.map((item, index) =>
                <div key={index} className="pb-2">
                    {item.bg_id}
                    <button className="btn btn-success ml-4" onClick={() => handleRenting(item)}>Recieve</button>
                </div>
            )
            ) : isLoading ? (
            <>
                Loading...
            </>
            ) : (
            <p>No renting requests</p>
            )}
        </div>
    );
}