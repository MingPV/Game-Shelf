"use client";
import { useState } from "react";
export default function BoardGameCard({
  name,
  picture,
  price,
  description,
  status,
}: {
  name: string;
  picture: string;
  price: number;
  description: string;
  status: string;
}) {
  const statusClass =
    status === "available"
      ? "bg-green-600 hover:bg-green-700"
      : "bg-orange-600 hover:bg-orange-700";
  const [showProgess, setShowProgess] = useState(false);

  return (
    <div
      className={`card card-side shadow-xl border-white border-[1px] m-5 relative transition-all duration-300 ${showProgess ? "h-[350px]" : "h-[250px]"}`}
    >
      <img
        src={picture}
        alt="boardgame picture"
        className="object-cover object-top rounded-xl m-3 w-1/3"
      />
      <div className="card-body flex flex-col">
        <p className="text-2xl font-semibold">{name}</p>
        <button
          className={`absolute top-0 right-0 mt-5 mr-10 rounded px-5 py-2 ${statusClass}`}
          onClick={() => setShowProgess(!showProgess)}
        >
          {status}
        </button>
        <p>type: </p>
        <p>price: {price}</p>
        <div>
          <p>{description}</p>
          <div className="flex justify-end">
            <button className="bg-emerald-600 rounded px-5 py-2 hover:bg-emerald-700">
              edit condition or details
            </button>
          </div>
        </div>
        {showProgess && (
          <ul className="steps mt-5">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Choose plan</li>
            <li className="step">Purchase</li>
            <li className="step">Receive Product</li>
          </ul>
        )}
      </div>
    </div>
  );
}
