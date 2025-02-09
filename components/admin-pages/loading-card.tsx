"use client";

import { FaCheck, FaXmark } from "react-icons/fa6";

export default function LoadingCard() {
  return (
    <>
      <div className="flex flex-col justify-center rounded-sm border border-white border-opacity-60 p-4 w-full bg-black opacity-10 skeleton">
        <div className="flex justify-between items-center pb-2 opacity-0">
          <div className="flex gap-2 items-center font-bold">
            <div className="flex relative h-7 w-7 rounded-full">
              <img
                alt="provider profile"
                src={"/mock_user.jpeg"}
                sizes="28px"
                className="rounded-full"
              />
            </div>
            {"params.users.username"}
          </div>
          {"new Date(params.created_at).toLocaleString()"}
        </div>
        <div className="opacity-0">
          {" "}
          <span className="font-bold pr-1">Email:</span> {"params.users.email"}{" "}
        </div>
        <div className="opacity-0">
          {" "}
          <span className="font-bold pr-1">Phone:</span>{" "}
          {"params.users.phoneNumber"}{" "}
        </div>
        <div className="opacity-0">
          {" "}
          <span className="font-bold pr-1">Location:</span>{" "}
          {"params.users.location"}{" "}
        </div>
        <div className="opacity-0">
          {" "}
          <span className="font-bold pr-1">Payment Method:</span>{" "}
          {"params.users.paymentMethod"}{" "}
        </div>
        <div className="opacity-0">
          {" "}
          <span className="font-bold pr-1">Credential:</span>{" "}
          <a className="underline" href={"params.users.credentials"}>
            {" "}
            {"params.users.credentials"}{" "}
          </a>
        </div>

        <div className="flex gap-2 pt-4 opacity-0">
          <button className="btn btn-outline btn-sm">
            <FaXmark />
            Denied
          </button>
          <button className="btn btn-success btn-sm">
            <FaCheck />
            Accept
          </button>
        </div>
      </div>
    </>
  );
}
