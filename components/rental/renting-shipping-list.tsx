"use client";

import { selectMyRentingRequestByStatus, updateRentingRequestStatus } from "@/app/(rental-pages)/actions";
import { useState, useEffect } from "react";
import { RentingRequestJoinBoardgameJoinCustomer } from "@/app/types/game";
import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { PiPackage } from "react-icons/pi";

export default function RentingShippingList() {
  const [reservedRequests, setReservedRequests] = useState<RentingRequestJoinBoardgameJoinCustomer[]>([]);
  const [rentingRequests, setRentingRequests] = useState<RentingRequestJoinBoardgameJoinCustomer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });

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
        <div className="flex gap-8 w-11/12 justify-center min-h-[calc(100vh-180px)]">
            <div className="overflow-x-auto bg-white/10 p-4 rounded-lg w-1/2">
            <div className="flex font-bold text-xl items-center gap-2">
                To be shipped
                <PiPackage strokeWidth={5} />
            </div>
            {reservedRequests.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr className="border-white border-opacity-50">
                            <th></th>
                            <th></th>
                            <th>Boardgame</th>
                            <th>Username</th>
                            <th>Ship within</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {reservedRequests?.map((item, index) => (
                        <tr key={index} className="border-white border-opacity-50">
                        <td>{index + 1}</td>
                        <td>
                            <div className="relative h-12 w-12 aspect-square">
                                <Image
                                src={item.boardgames.bg_picture}
                                alt="boardgame"
                                fill
                                className="rounded-lg object-cover"
                                />
                            </div>
                        </td>
                        <th>{item.boardgames.bg_name}</th>
                        <td>{item.customer.username}</td>
                        <td>{dateFormatter.format(new Date(item.start_date))}</td>
                        <th>
                            <label className="flex items-center">
                                <input type="checkbox" className="checkbox [--chkbg:theme(colors.purple.500)] [--chkfg:white]" />
                            </label>
                        </th>
                        </tr>
                    ))}
                    <tr></tr>
                    </tbody>
                </table>
                
            ) : isLoading ? (
            <>
                Loading...
            </>
            ) : (
            <p>No reserved requests</p>
            )}
                <div className="flex w-full justify-end underline pt-3">select all</div>
                <div className="flex w-full justify-center">
                    <button className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-7 h-7 mt-4 px-8">
                        Ship
                    </button>
                </div>
            </div>

            
            <div className="overflow-x-auto bg-white/10 p-4 rounded-lg w-1/2  min-h-[calc(100vh-180px)]">
                <div className="flex font-bold text-xl items-center gap-2">
                    To be returned
                    <AiOutlineHome strokeWidth={8} />
                </div>
                {rentingRequests.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr className="border-white border-opacity-50">
                                <th></th>
                                <th></th>
                                <th>Boardgame</th>
                                <th>Username</th>
                                <th>Ship within</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {rentingRequests?.map((item, index) => (
                            <tr key={index} className="border-white border-opacity-50">
                            <td>{index + 1}</td>
                            <td>
                                <div className="relative h-12 w-12 aspect-square">
                                    <Image
                                    src={item.boardgames.bg_picture}
                                    alt="boardgame"
                                    fill
                                    className="rounded-lg object-cover"
                                    />
                                </div>
                            </td>
                            <th>{item.boardgames.bg_name}</th>
                            <td>{item.customer.username}</td>
                            <td>{dateFormatter.format(new Date(item.start_date))}</td>
                            <th>
                                <label className="flex items-center">
                                    <input type="checkbox" className="checkbox [--chkbg:theme(colors.purple.500)] [--chkfg:white]" />
                                </label>
                            </th>
                            </tr>
                        ))}
                        <tr></tr>
                        </tbody>
                    </table>
                
            ) : isLoading ? (
            <>
                Loading...
            </>
            ) : (
                <p>No renting requests</p>
            )}
                <div className="flex w-full justify-end underline pt-3">select all</div>
                <div className="flex w-full justify-center">
                    <button className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-7 h-7 mt-4 px-6">
                        Return
                    </button>
                </div>
            </div>
        </div>
    );
}