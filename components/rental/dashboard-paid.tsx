"use client";
import {
  selectMyRentingRequestByStatus,
  selectRentalRequestUnpaid,
} from "@/app/(rental-pages)/actions";
import { Invoice } from "@/app/types/game";
import { useEffect, useState } from "react";

export function DashBoardPaid() {
  const [records, setRecords] = useState<Invoice[]>([]);
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
  const status = "waiting for payment";
  const convertDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const formData = new FormData();
      formData.append("status", status);
      const data = await selectRentalRequestUnpaid();
      setRecords(data);
      console.log(data);

      // Initialize countdown times
      const newCountdowns: { [key: string]: number } = {};
      data.forEach((record) => {
        const createdAt = new Date(record.rental_requests.created_at);
        const now = new Date();
        const diffInSeconds = Math.max(
          24 * 60 * 60 -
            Math.floor((now.getTime() - createdAt.getTime()) / 1000),
          0
        );
        newCountdowns[record.rental_requests.id] = diffInSeconds;
      });
      setCountdowns(newCountdowns);
    };

    fetchRequests();
  }, [status]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prevCountdowns) => {
        const newCountdowns: { [key: string]: number } = {};
        Object.keys(prevCountdowns).forEach((id) => {
          newCountdowns[id] = Math.max(prevCountdowns[id] - 1, 0);
        });
        return newCountdowns;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (!hours && !minutes && !secs) {
      return false;
    }
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="w-full overflow-y-auto">
      <div className="flex flex-col gap-2">
        {records.map((record, index) => (
          <div
            key={record.id}
            className="grid grid-cols-11 w-full border rounded-md place-items-center gap- py-2"
          >
            <p className="col-span-1  w-full text-center py-2 flex items-center justify-center">
              {index + 1}
            </p>
            <div className="avatar mask mask-squircle h-12 w-12 col-span-2  flex items-center justify-center">
              <img
                src={
                  record.rental_requests.boardgames?.bg_picture ||
                  "https://via.placeholder.com/48"
                }
                alt={record.rental_requests.boardgames?.bg_name || "Boardgames"}
              />
            </div>
            <div className="flex flex-col col-span-6 text-xs items-start justify-start w-full  text-center">
              <p className="font-bold text-sm">
                {record.rental_requests.boardgames?.bg_name}
              </p>
              <p className="font-extralight text-gs_gray">
                Customer name: {record.rental_requests.users?.username}
              </p>
              <p className="font-extralight text-gs_gray">
                duration: {convertDate(record.rental_requests.start_date)} -{" "}
                {convertDate(record.rental_requests.end_date)}
              </p>
              <p className="font-extralight text-gs_gray">
                Amount: {record.amount} baht
              </p>
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center w-full gap-2">
              {formatCountdown && (
                <span
                  className={`countdown font-mono text-xs ${
                    countdowns[record.rental_requests.id] <= 0
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {formatCountdown(countdowns[record.rental_requests.id]) ||
                    "overdue"}
                </span>
              )}

              <input type="checkbox" className="checkbox checkbox-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
