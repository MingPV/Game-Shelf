"use client";

import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import mockBoardGame from "../../public/mock_user.jpeg"

function StatusTag({ status }: { status: string }) {
    const statusClassMap = new Map<string, string>([
        ["completed", "badge-outline"],
        ["cenceled", "badge-error"],
        ["renting", "badge-success"],
        ["reserved", "badge-warning"],
        ["requested", "badge-neutral"],
    ]);
    
    const classes = statusClassMap.get(status);
    return (
      <span className={`badge badge-lg pt-3 pb-4 ${classes}`}>
        {status}
      </span>
    );
}

function ReviewTag({ score }: { score: number | null}) {
    if (!score) return (
        <button className="btn bg-gs_purple_gradient hover:bg-opacity-60 h-fit">Review this boardgame</button>
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

export default function MyRentalCard() {

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center border p-6 rounded-lg gap-6">
            <Image 
                alt="boardgame image"
                src={mockBoardGame} 
                width={160}
                height={160}
                className="rounded-lg"
            />
            <div className="flex flex-col w-full h-full">
                <div className="flex justify-between items-center w-full pb-3">
                    <div className="font-bold text-xl">Werewolf</div>
                    <StatusTag status="completed" />
                </div>
            
                <div className="flex flex-col w-full">
                    <div className="flex flex-col sm:flex-row pb-2 sm:pb-1">
                        <div className="font-bold w-36">Store:</div>
                        <div>Board & Beyond</div>
                    </div>
                    <div className="flex flex-col sm:flex-row pb-2 sm:pb-1">
                        <div className="font-bold w-36">Date:</div>
                        <div>25/01/2025 - 28/01/2025</div>
                    </div>
                    <div className="flex flex-col sm:flex-row pb-2 sm:pb-1">
                        <div className="font-bold w-36">Total price:</div>
                        <div>200 Baht</div>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <div className="font-bold w-36 pb-1">My rating:</div>
                        <ReviewTag score={3} />
                    </div>
                </div>
            </div>
        </div>
    );
}
