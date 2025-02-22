"use client";

import { selectMyRentingRequestByStatus, updateRentingRequestStatus } from "@/app/(rental-pages)/actions";
import { useState, useEffect } from "react";
import { RentingRequestJoinBoardgameJoinCustomer } from "@/app/types/game";
import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { PiPackage } from "react-icons/pi";
import { JSX } from "react";
import { SetStateAction, Dispatch } from "react";

// import { Tab } from "@headlessui/react";

type RentingListProps = {
  title: string;
  icon: JSX.Element;
  status: "reserved" | "renting";
  nextStatus: "renting" | "available";
  requests: RentingRequestJoinBoardgameJoinCustomer[];
  setRequests: Dispatch<SetStateAction<RentingRequestJoinBoardgameJoinCustomer[]>>;
  setNextRequest: Dispatch<SetStateAction<RentingRequestJoinBoardgameJoinCustomer[]>> | null;
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" });

function RentingList({ title, icon, status, nextStatus, requests, setRequests, setNextRequest }: RentingListProps) {
  const [selectedRequestIds, setSelectedRequestIds] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await selectMyRentingRequestByStatus(status);
      setRequests(res || []);
      setIsLoading(false);
    }
    fetchData();
  }, [status]);

  const handleUpdateStatus = () => {
    requests.filter(req => selectedRequestIds.has(req.id)).forEach(req => {
      setRequests(prev => prev.filter(r => r.id !== req.id));
      if (setNextRequest) setNextRequest((prev) => [ ...prev, req ])
      updateRentingRequestStatus(req.id, nextStatus);
    });
    setSelectedRequestIds(new Set());
  };

  return (
    <div className="flex flex-col items-center bg-white/10 p-4 rounded-lg w-full md:w-1/2">
      <div className="flex font-bold text-xl items-center gap-2">{title} {icon}</div>
      {requests.length > 0 ? (
        <div>
          <div className="overflow-y-auto flex-grow mt-4 rounded-lg h-[calc(100vh-400px)] md:h-[calc(100vh-340px)]">
            <table className="table">
              <thead>
                <tr className="border-white border-opacity-50">
                  <th className="hidden md:table-cell"></th>
                  <th className="hidden md:table-cell"></th>
                  <th>Boardgame</th>
                  <th className="hidden md:table-cell">Username</th>
                  <th>Ship within</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {requests.map((item, index) => (
                  <tr key={index} className="border-white border-opacity-50">
                    <td className="hidden md:table-cell">{index + 1}</td>
                    <td className="hidden md:table-cell">
                      <div className="relative h-12 w-12 aspect-square">
                        <Image src={item.boardgames.bg_picture} alt="boardgame" fill className="rounded-lg object-cover" />
                      </div>
                    </td>
                    <th>{item.boardgames.bg_name}</th>
                    <td className="hidden md:table-cell">{item.customer.username}</td>
                    <td>{dateFormatter.format(new Date(item.start_date))}</td>
                    <th>
                      <input 
                        type="checkbox" 
                        className="checkbox [--chkbg:theme(colors.purple.500)] [--chkfg:white]"
                        checked={selectedRequestIds.has(item.id) || selectAll}
                        onChange={(e) => {
                          setSelectedRequestIds(prev => {
                            const updated = new Set(prev);
                            e.target.checked ? updated.add(item.id) : updated.delete(item.id);
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
          <button className="flex w-full justify-end underline pt-3" onClick={() => {
            const updated = new Set<number>();
            if (!selectAll) requests.forEach(item => updated.add(item.id));
            setSelectedRequestIds(updated);
            setSelectAll(!selectAll);
          }}>
            Select all
          </button>
          <div className="flex w-full justify-center">
            <button className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-7 h-7 mt-4 px-8" onClick={handleUpdateStatus}>
              {status === "reserved" ? "Ship" : "Return"}
            </button>
          </div>
        </div>
      ) : isLoading ? "Loading..." : <p>No {status} requests</p>}
    </div>
  );
}

export default function RentingShippingList() {
  const [reservedRequests, setReservedRequests] = useState<RentingRequestJoinBoardgameJoinCustomer[]>([]);
  const [rentingRequests, setRentingRequests] = useState<RentingRequestJoinBoardgameJoinCustomer[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showReserved, setShowReserved] = useState<boolean>(true);
  
  return (
    <div className="w-full md:w-10/12 h-[calc(100vh-240px)] md:h-[calc(100vh-180px)]">

      {/* Labtop Layout */}
      <div className="hidden md:flex gap-8 justify-center">
        <RentingList 
          title="To be shipped" 
          icon={<PiPackage strokeWidth={5} />} 
          status="reserved" 
          nextStatus="renting" 
          requests={reservedRequests}
          setRequests={setReservedRequests}
          setNextRequest={setRentingRequests} 
        />
        <RentingList 
          title="To be returned" 
          icon={<AiOutlineHome strokeWidth={8} />} 
          status="renting" 
          nextStatus="available" 
          requests={rentingRequests}
          setRequests={setRentingRequests}
          setNextRequest={null} 
        />
      </div>

      {/* Phone Layout */}
      <div className="p-2 bg-white/10 rounded-lg md:hidden">
        <div className="flex w-full gap-2 rounded-lg bg-white/10 p-2 mb-2 font-bold">
          <button className={`w-1/2 py-2 rounded-lg ${showReserved ? 'bg-gs_purple_gradient' : 'bg-transparent'}`} onClick={() => setShowReserved(true)}>To be shipped</button>
          <button className={`w-1/2 py-2 rounded-lg ${!showReserved ? 'bg-gs_purple_gradient' : 'bg-transparent'}`} onClick={() => setShowReserved(false)}>To be returned</button>
        </div>

        <div className={`flex w-full justify-center h-[calc(100vh-240px)] md:h-[calc(100vh-180px)] ${showReserved ? "" : "hidden"}`}>
          <RentingList 
            title="To be shipped" 
            icon={<PiPackage strokeWidth={5} />} 
            status="reserved" 
            nextStatus="renting" 
            requests={reservedRequests}
            setRequests={setReservedRequests}
            setNextRequest={setRentingRequests} 
          />
        </div>

        <div className={`flex w-full justify-center h-[calc(100vh-240px)] md:h-[calc(100vh-180px)] ${!showReserved ? "" : "hidden"}`}>
        <RentingList 
          title="To be returned" 
          icon={<AiOutlineHome strokeWidth={8} />} 
          status="renting" 
          nextStatus="available" 
          requests={rentingRequests}
          setRequests={setRentingRequests}
          setNextRequest={null} 
        />
        </div>
      </div>
    </div>
  );
}
