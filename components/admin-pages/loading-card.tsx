"use client";

import { FaCheck, FaXmark } from "react-icons/fa6";

export default function LoadingCard() {
  return (
    <>
      <div className="flex flex-col justify-center rounded-sm  p-4 w-full bg-black opacity-10 skeleton">
        <div className="flex justify-between items-center pb-2 ">
          <div className="flex gap-2 items-center font-bold ">
            <div className="flex relative h-7 w-7 rounded-full bg-white opacity-20 ">
              <img
                alt="provider profile"
                src={"/mock_user.jpeg"}
                sizes="28px"
                className="rounded-full"
              />
            </div>
            <div className="bg-white opacity-20 rounded-lg">
              {"username---"}
            </div>
          </div>
          <div className="bg-white opacity-20 rounded-lg">
            {"new Date(params.created_at).toLocaleString()"}
          </div>
        </div>
        <div>
          <span className="bg-white opacity-20 rounded-lg">
            Email: "params.users.email"-----
          </span>
        </div>
        <div>
          <span className="bg-white opacity-20 rounded-lg">
            Email: "params.users.em
          </span>
        </div>
        <div>
          <span className="bg-white opacity-20 rounded-lg">
            Email: "params.users.email"------------
          </span>
        </div>
        <div>
          <span className="bg-white opacity-20 rounded-lg">Email: "para</span>
        </div>
        <div>
          <span className="bg-white opacity-20 rounded-lg">
            Email: "params.users.email"-------------------------------------
          </span>
        </div>

        <div className="flex gap-2 pt-4 ">
          <button className="btn btn-outline btn-sm bg-white opacity-20 ">
            <FaXmark />
            Denied
          </button>
          <button className="btn  btn-sm bg-white opacity-20 ">
            <FaCheck />
            Accept
          </button>
        </div>
      </div>
    </>
  );
}
