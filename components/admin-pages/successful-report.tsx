"use client";

import { useEffect, useState } from "react";
import SuccessfulCard from "./successful-card";
import LoadingCard from "../payment/income-history-loading";
import { Dispute } from "@/app/types/admin";

export default function SuccessfulReportList() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [isLoadingReq, setIsLoadingReq] = useState(true);

  useEffect(() => {
    const fetchAllReports = async (): Promise<{
      data: Dispute[];
      token: string;
    }> => {
      const res = await fetch("/api/reports", {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    async function fetchReports() {
      const { data: res } = await fetchAllReports();
      setDisputes(res || []);
      setIsLoadingReq(false);
      let sum = 0;
    }

    fetchReports();
  }, []);

  return (
    <>
      <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center w-10/12">
          <div className="text-2xl font-bold pb-2">
            Successful Report History
          </div>
          <div className="flex flex-col bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full mb-4">
            <div className="text-lg pb-4 font-bold">
              Reports List{" "}
              {/* <span className="font-light">{`(${sumReceive} Baht)`}</span> */}
            </div>
            <div className="hidden lg:grid grid-flow-col grid-cols-12 mb-2">
              <div className="hidden lg:flex lg:col-span-2 ml-8 text-xs opacity-60">
                Reporter
              </div>
              <div className="hidden lg:flex lg:col-span-2 ml-8 text-xs opacity-60">
                Reported
              </div>
              <div className="hidden lg:flex lg:col-span-5 text-xs opacity-60">
                Verdict
              </div>
              <div className="hidden lg:flex justify-center ml-2 col-span-1 text-xs opacity-60">
                Admin
              </div>
              <div className="hidden lg:flex justify-end mr-10 col-span-2 text-xs opacity-60">
                Completed
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
              {disputes.length > 0 ? (
                disputes?.map((item) =>
                  item.status == "complete" ? (
                    <SuccessfulCard dispute={item} key={item.id} />
                  ) : null
                )
              ) : isLoadingReq ? (
                <>
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                </>
              ) : (
                <p>{"No payment history :)"}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
