"use client";

import { useEffect, useState } from "react";
import { RentingRequest } from "@/app/types/game";

export default function ReportRentalCard({
    reportRental, isSelected
}: {
    reportRental: RentingRequest,
    isSelected: boolean
}) {
    
    const [rentalData, setRentalData] = useState<RentingRequest>(reportRental);
    
    function StatusTag({ status }: { status: string }) {
           const statusClassMap = new Map<string, string>([
             ["complete", "border border-input"],
             ["pending", "bg-sky-500 text-slate-100"],
             ["unpaid", "bg-amber-600 text-slate-100"],
             ["canceled", "badge-error"],
             ["renting", "badge-success"],
             ["reserved", "bg-yellow-500 text-slate-100"],
           ]);
         
           const classes = statusClassMap.get(status);
           return (
             <span
               className={`rounded-lg px-3 py-2 transition-transform transform ${classes} block`}
             >
               {status}
             </span>
           );
    }

    function formatDateRange(endDateStr: string): string {
        const endDate = new Date(endDateStr);
    
        const options: Intl.DateTimeFormatOptions = {
          day: "2-digit",
          month: "short",
        };
    
        const endStr = endDate.toLocaleDateString("en-GB", options);
        const year = endDate.getFullYear();
    
        return `${endStr} ${year}`;
      }

    return (
        <div className={`card shadow-xl rounded-sm border border-white border-opacity-60 m-5 
                        relative transition-all duration-300 grid grid-cols-3 gap-2 text-xs 
                        ${isSelected ? "bg-gs_gray bg-opacity-20" : ""} rounded-lg`}>
            <div className="bg-white col-span-1 flex justify-start md:w-full m-2 h-32 md:m-4 max-lg:hidden overflow-hidden rounded-xl">
                <img
                src={rentalData.boardgames?.bg_picture}
                alt="boardgame picture"
                className="w-full h-full object-cover object-top"
                />
            </div>

            <div className="card-body flex flex-col p-2 col-span-2 m-4 max-lg:col-span-3">
                <div className="flex items-start justify-between w-full">
                    <p className="text-sm font-semibold capitalize break-all">
                        {rentalData.boardgames?.bg_name}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <p className="font-bold col-span-1 flex items-center">
                        {rentalData?.users?.isProvider ? "provider:" : "player:"}
                    </p>
                    <p className="col-span-1 flex items-center">
                        {rentalData.users?.username}
                    </p>

                    <p className="font-bold col-span-1 flex items-center">
                        start date:
                    </p>
                    <p className="col-span-1 flex items-center">
                        {formatDateRange(rentalData.start_date)}
                    </p>

                    <p className="font-bold col-span-1 flex items-center">
                        end date:
                    </p>
                    <p className="col-span-1 flex items-center">
                        {formatDateRange(rentalData.end_date)}
                    </p>


                    {/* <div className="col-span-1"></div> */}
                    <p className="flex items-center col-span-1">
                        <StatusTag status={rentalData.status}/>
                    </p>
                </div>
            </div>
        </div>
    );
}
