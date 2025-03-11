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
import RentingShippingModal from "./shipping-modal";
import RentingShippingLoading from "./shipping-loading";

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
  const [selectedRequestIds, setSelectedRequestIds] = useState<Set<number>>(
    new Set()
  );
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await selectMyRentingRequestByStatus2(status);
      setRequests(res || []);
      setIsLoading(false);
    }
    fetchData();
  }, [status]);

  const handleUpdateStatus = () => {
    setShowModal(false);
    requests
      .filter((req) => selectedRequestIds.has(req.id))
      .forEach((req) => {
        setRequests((prev) => prev.filter((r) => r.id !== req.id));
        if (setNextRequest) setNextRequest((prev) => [...prev, req]);
        updateRentingRequestStatus(req.id, nextStatus);
        if (status == "renting") {
          updateBoardgameRentingCount(req.bg_id);
          updateUserRentalSuccess(req.id);
        }
      });
    setSelectedRequestIds(new Set());
  };

  return (
    <div className="flex flex-col items-center bg-white/10 px-2 py-0 lg:p-4 rounded-lg w-full lg:w-1/2">
      <div className="flex font-bold text-xl items-center gap-2 hidden lg:flex">
        To be {title} {icon}
      </div>
      {requests.length > 0 ? (
        <div>
          <div className="overflow-y-auto flex-grow mt-4 rounded-lg h-[calc(100vh-360px)] lg:h-[calc(100vh-340px)]">
            <table className="table">
              <thead>
                <tr className="border-white border-opacity-50">
                  <th className="hidden sm:table-cell"></th>
                  <th className="hidden sm:table-cell"></th>
                  <th>Boardgame</th>
                  <th className="hidden sm:table-cell">Username</th>
                  <th>Ship within</th>
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
                      {item.customer.username}
                    </td>
                    <td>{dateFormatter.format(new Date(item.start_date))}</td>
                    <th>
                      <input
                        type="checkbox"
                        className="checkbox [--chkbg:theme(colors.purple.500)] [--chkfg:white]"
                        checked={selectedRequestIds.has(item.id) || selectAll}
                        onChange={(e) => {
                          setSelectedRequestIds((prev) => {
                            const updated = new Set(prev);
                            e.target.checked
                              ? updated.add(item.id)
                              : updated.delete(item.id);
                            return updated;
                          });
                        }}
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="flex w-full justify-end underline pt-3"
            onClick={() => {
              const updated = new Set<number>();
              if (!selectAll) requests.forEach((item) => updated.add(item.id));
              setSelectedRequestIds(updated);
              setSelectAll(!selectAll);
            }}
          >
            Select all
          </button>
          <div className="flex w-full justify-center">
            <button
              className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-9 h-9 lg:min-h-8 lg:h-8 mt-4 px-8 font-bold"
              onClick={() => setShowModal(selectedRequestIds.size > 0)}
            >
              {status === "reserved" ? "Ship" : "Return"}
            </button>
          </div>
        </div>
      ) : isLoading ? (
        <RentingShippingLoading />
      ) : (
        <p className="pt-6">No {status} requests</p>
      )}

      {/* confirm modal */}
      {showModal && (
        <RentingShippingModal
          title={title}
          count={selectedRequestIds.size}
          handleFunction={handleUpdateStatus}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
