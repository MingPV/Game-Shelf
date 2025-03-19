"use client";

import {
  selectMyRentingRequestByStatus2,
  updateRentingRequestStatus,
  updateUserRentalSuccess,
} from "@/app/(rental-pages)/actions";
import { updateBoardgameRentingCount } from "@/app/(game-pages)/actions";
import { useState, useEffect } from "react";
import { RentingRequestJoinBoardgameJoinCustomer } from "@/app/types/game";
import Image from "next/image";
import { JSX } from "react";
import { SetStateAction, Dispatch } from "react";
import MyRentalModal from "./my-rental-modal";
import RentingShippingLoading from "./shipping-loading";
import Link from "next/link";

type RentingListProps = {
  title: string;
  icon: JSX.Element;
  status: "reserved" | "renting";
  nextStatus: "renting" | "complete";
  requests: RentingRequestJoinBoardgameJoinCustomer[];
  setRequests: Dispatch<
    SetStateAction<RentingRequestJoinBoardgameJoinCustomer[]>
  >;
  setNextRequest: Dispatch<
    SetStateAction<RentingRequestJoinBoardgameJoinCustomer[]>
  > | null;
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

export default function RentingShippingCard({
  title,
  icon,
  status,
  nextStatus,
  requests,
  setRequests,
  setNextRequest,
}: RentingListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const res = await selectMyRentingRequestByStatus2(status);
      setRequests(res || []);
      setIsLoading(false);
    }
    fetchData();
  }, [status]);

  useEffect(() => {
    if (tag != "done") return;
    if (selectedId == null) return;
    const selectedRequest = requests.find((r) => r.id === selectedId);
    setRequests((prev) => prev.filter((r) => r.id !== selectedId));
    if (setNextRequest && selectedRequest) setNextRequest((prev) => [...prev, selectedRequest]);
    updateRentingRequestStatus(selectedId, nextStatus);
    if (status == "renting") {
      updateUserRentalSuccess(selectedId);
      updateBoardgameRentingCount(selectedId);
    }
  }, [tag]);

  return (
    <div className="flex flex-col items-center bg-white/10 px-2 py-0 lg:p-4 rounded-lg w-full lg:w-1/2">
      <div className="font-bold text-xl items-center gap-2 hidden lg:flex">
        To be {title} {icon}
      </div>
      {requests.length > 0 ? (
        <div>
          <div className="overflow-y-auto flex-grow mt-4 rounded-lg h-[calc(100vh-280px)] lg:h-[calc(100vh-270px)]">
            <table className="table">
              <thead>
                <tr className="border-white border-opacity-50">
                  <th className="hidden sm:table-cell"></th>
                  <th className="hidden sm:table-cell"></th>
                  <th>Boardgame</th>
                  <th className="hidden sm:table-cell">Username</th>
                  <th>{status == "reserved" ? "Ship within" : "Return date"}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {requests.map((item, index) => (
                  <tr key={index} className="border-white border-opacity-50">
                    <td className="hidden sm:table-cell">{index + 1}</td>
                    <td className="hidden sm:table-cell">
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
                    <td className="hidden sm:table-cell">
                      <Link
                        href={`/profile/${item.customer.username}`}
                        className="hover:underline"
                      >
                        {item.customer.username}
                      </Link>
                    </td>
                    <td>{dateFormatter.format(new Date(item.start_date))}</td>
                    <th>
                      <button
                        className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-7 h-7 lg:min-h-7 lg:h-7 px-2"
                        onClick={() => {
                          setSelectedId(item.id);
                          setTag(status === "reserved" ? "before_ship" : "after_return");
                          setShowModal(true);
                        }}
                      >
                        {status === "reserved" ? "Ship" : "Return"}
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      ) : isLoading ? (
        <RentingShippingLoading />
      ) : (
        <p className="pt-6">No {status} requests</p>
      )}

      {/* confirm modal */}
      {showModal && selectedId && (
        <MyRentalModal
          tag={tag}
          request_id={selectedId}
          setShowModal={setShowModal}
          setTag={setTag}
        />
      )}
    </div>
  );
}
