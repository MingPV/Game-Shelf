"use client";

import { Suspense, useEffect, useState } from "react";
import { selectMyRentingRequest } from "@/app/(rental-pages)/actions";
import { Dispute } from "@/app/types/admin";
import { getAllReports } from "../actions";
import ReportCard from "@/components/admin-pages/report-card";

export default function ReportList() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [isLoadingReq, setIsLoadingReq] = useState(true);

  useEffect(() => {
    async function fetchRequest() {
      const res = await getAllReports();
      setDisputes(res || []);
      setIsLoadingReq(false);
    }

    fetchRequest();
  }, []);

  return (
    <>
      <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center w-10/12">
          <div className="text-2xl font-bold pb-2">Manage Rental Request</div>
          <div className="flex flex-col bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full mb-4">
            <div className="text-lg pb-4 font-bold">Board Game Requested</div>
            <div className="hidden sm:grid grid-flow-col grid-cols-12 mb-2">
              <div className="col-span-6 md:col-span-5 lg:col-span-3 text-xs opacity-60 text-center">
                Reporter
              </div>
              <div className="sm:col-span-5  md:col-span-3 lg:col-span-3 text-xs opacity-60 text-center">
                Topic
              </div>
              <div className="hidden md:block md:col-span-3 lg:col-span-2 text-xs opacity-60 text-center">
                Type
              </div>
              <div className="hidden lg:block col-span-3 text-xs opacity-60 text-center">
                Date
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
              {disputes.length > 0 ? (
                disputes.map((item) =>
                    <ReportCard dispute={item} key={item.id}/>
                )
              ) : isLoadingReq ? (
                <>
                  <div>Loading...</div>
                </>
              ) : (
                <p>No Waiting Reports</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
