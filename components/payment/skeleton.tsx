"use client";

import Link from "next/link";
import { TbCurrencyBaht } from "react-icons/tb";

export default function Skeleton() {
  return (
    <>
      <div
        className={`card shadow-xl m-5 relative grid grid-row md:grid-cols-3 skeleton bg-black opacity-10 rounded-sm`}
      >
        <div className="bg-white col-span-1 flex justify-start  md:w-full  h-64 m-2 md:m-4 overflow-hidden rounded-xl opacity-20">
          {/* <img
            src={"/mock_user.jpeg"}
            alt="boardgame picture"
            className="w-full h-full object-cover object-top"
          /> */}
        </div>

        <div className="card-body flex flex-col p-2 md:p-4 md:col-span-2 m-4">
          <div className="flex flex-row items-start justify-between">
            <div>
              <p
                className="text-lg font-semibold capitalize
                      md:text-2xl
                      lg:text-3xl bg-white opacity-20 rounded-lg"
              >
                {"------------"}
              </p>
            </div>

            <div
              className={` px-5 py-2 transition-transform transform  bg-white opacity-20 rounded-lg`}
            >
              {"Available"}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            <p className="font-bold col-span-3 md:col-span-2 flex items-center opacity-0">
              provider:
            </p>
            <p className="col-span-3 md:col-span-4 flex items-center opacity-0">
              provider
            </p>

            <p className="font-bold col-span-3 md:col-span-2 flex items-center opacity-0">
              date:
            </p>
            <p className="col-span-3 md:col-span-4 flex items-center opacity-0">
              {"formatDate(boardgameData.start_date)"} &nbsp;-&nbsp;
              {"formatDate(boardgameData.end_date)"}
            </p>

            <p className="font-bold col-span-3 md:col-span-2 flex items-center opacity-0">
              price:
            </p>
            <p className="col-span-3 md:col-span-4 flex items-center opacity-0">
              {"boardgameData.board_game.price"}
              <TbCurrencyBaht /> / day
            </p>

            <p className="font-bold col-span-3 md:col-span-2 flex opacity-0">
              status:
            </p>
            <div className="col-span-3 md:col-span-4 opacity-20">
              <Link
                href={"boardgameData.invoice.payment_url"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white opacity-20 rounded-lg flex-col px-10"
              >
                {/* <span className="text-xs ml-2 opacity-80">within 00:25:44</span> */}
              </Link>
            </div>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out "max-h-0 opacity-0 "`}
          ></div>
        </div>
      </div>
    </>
  );
}
