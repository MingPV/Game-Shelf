"use client";

import { Suspense, useEffect, useState } from "react";
import ReceiptCard from "./income-history-card";
import { Receipt } from "@/app/types/receipt";
import LoadingCard from "./income-history-loading";
import { selectMyReceipts } from "@/app/(payment-pages)/actions";

export default function IncomeHistoryList() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoadingReq, setIsLoadingReq] = useState(true);
  const [sumReceive, setSumReceive] = useState(0);

  useEffect(() => {
    async function fetchReceipt() {
      const res = await selectMyReceipts();
      setReceipts(res || []);
      setIsLoadingReq(false);
      let sum = 0;

      res.forEach((element: Receipt) => {
        sum += element.amount;
      });

      setSumReceive(sum);
    }

    fetchReceipt();
  }, []);

  return (
    <>
      <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center w-10/12">
          <div className="text-2xl font-bold pb-2">Rental Income History</div>
          <div className="flex flex-col bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full mb-4">
            <div className="text-lg pb-4 font-bold">
              Total Amount Received{" "}
              <span className="font-light">{`(${sumReceive} Baht)`}</span>
            </div>
            <div className="hidden sm:grid grid-flow-col grid-cols-12 mb-2">
              <div className="col-span-6 md:col-span-5 lg:col-span-4 text-xs opacity-60">
                Player name
              </div>
              <div className="sm:col-span-6  md:col-span-4 lg:col-span-3 text-xs opacity-60">
                Boardgame Name
              </div>
              <div className="hidden md:block md:col-span-3 lg:col-span-2 text-xs opacity-60">
                Amount
              </div>
              <div className="hidden lg:flex col-span-3 text-xs opacity-60">
                End date
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
              {receipts.length > 0 ? (
                receipts?.map((item) => (
                  <ReceiptCard receipt={item} key={item.id} />
                ))
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
