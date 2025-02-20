"use client";

import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import mockBoardGame from "../../public/mock_user.jpeg";
import { RentingRequestJoinBoardgameJoinProvider } from "@/app/types/game";

function StatusTag({ status }: { status: string }) {
    const statusClassMap = new Map<string, string>([
        ["completed", "badge-outline"],
        ["cenceled", "badge-error"],
        ["renting", "badge-success"],
        ["reserved", "bg-yellow-400 text-black"],
        ["requested", "badge-neutral"],
    ]);
    
    const classes = statusClassMap.get(status);
    return (
      <span className={`badge badge-lg pb-7 ${classes} hidden sm:block`}>
        {status}
      </span>
    );
}

function ReviewTag({ score }: { score: number | null}) {
    if (!score || score > 5) return (
        <button className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-7 h-7">
            <span className="flex">Review<span className="hidden sm:block pl-1">this boardgame</span></span>
        </button>
    );
    else return (
        <div className="rating">
            <input
                type="radio"
                className="mask mask-star-2 bg-yellow-400"
                checked={score==1} 
                readOnly
            />
            <input
                type="radio"
                className="mask mask-star-2 bg-yellow-400"
                checked={score==2} 
                readOnly
            />
            <input
                type="radio"
                className="mask mask-star-2 bg-yellow-400"
                checked={score==3} 
                readOnly
            />
            <input
                type="radio"
                className="mask mask-star-2 bg-yellow-400"
                checked={score==4} 
                readOnly
            />
            <input
                type="radio"
                className="mask mask-star-2 bg-yellow-400"
                checked={score==5} 
                readOnly
            />
        </div>
    );
}

export default function MyRentalCard({data} : {data: RentingRequestJoinBoardgameJoinProvider}) {
    const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center border p-4 sm:p-6 rounded-lg gap-3 sm:gap-6">
            <div className="relative w-full sm:w-[160px] h-[160px] sm:aspect-square">
            <Image 
                alt="boardgame image"
                src={data.boardgames.bg_picture ? data.boardgames.bg_picture : mockBoardGame} 
                fill
                className="rounded-lg object-cover"
            />
            </div>
            <div className="flex flex-col w-full h-full">
                <div className="flex justify-between sm:items-center w-full pb-3">
                    <div className="font-bold text-xl">{data.boardgames.bg_name}</div>
                    <StatusTag status={data.status} />
                </div>
            
                <div className="flex flex-col w-full">
                    <div className="flex pb-1">
                        <div className="font-bold w-24 sm:w-36">Store:</div>
                        <div>{data.provider.username}</div>
                    </div>
                    <div className="flex pb-1">
                        <div className="font-bold w-24 sm:w-36">Date:</div>
                        <div>{dateFormatter.format(new Date(data.start_date))} - {dateFormatter.format(new Date(data.end_date))}</div>
                    </div>
                    <div className="flex pb-1">
                        <div className="font-bold w-24 sm:w-36">Total price:</div>
                        <div>{data.boardgames.price}&nbsp;Baht</div>
                    </div>
                    <div className="flex">
                        <div className="font-bold w-24 sm:w-36 pb-1">My rating:</div>
                        <ReviewTag score={data.bg_id % 10} />
                    </div>
                </div>
            </div>
        </div>
    );
}
