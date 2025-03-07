"use client";
import {
  selectMyRentingRequestByStatus,
  selectRentalRequestUnpaid,
  cancelMultipleInvoices,
} from "@/app/(rental-pages)/actions";
import { Invoice } from "@/app/types/game";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PaidSVG from "./paid-svg";
export function DashBoardPaid() {
  const [records, setRecords] = useState<Invoice[]>([]);
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
  const [isCanceled, setIsCanceled] = useState<boolean>(false);
  const [invoiceToCancel, setInvoiceToCancel] = useState<string[]>([]);
  const status = "unpaid";
  const convertDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const toggleInvoiceSelection = (id: string) => {
    setInvoiceToCancel((prev) => {
      if (prev.includes(id)) {
        // Remove the ID from the list if already selected
        return prev.filter((invoiceId) => invoiceId !== id);
      } else {
        // Add the ID to the list if not selected
        return [...prev, id];
      }
    });
  };

  const toggleSelectAll = () => {
    setInvoiceToCancel((prev) => {
      if (prev.length === records.length) {
        // If all are selected, deselect all
        return [];
      } else {
        // Otherwise, select all
        return records.map((record) => record.id.toString());
      }
    });
    console.log(invoiceToCancel);
  };

  const handleCancelInvoices = () => {
    console.log("invoice to cancel", invoiceToCancel);

    const formData = new FormData();

    // Append all selected invoice IDs to the FormData object
    invoiceToCancel.forEach((id) => {
      formData.append("invoice_ids[]", id); // appending each invoice ID
    });

    if (invoiceToCancel.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#359368",
        cancelButtonColor: "#FF2525",
        confirmButtonText: "Yes, Canceled it!",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
          cancelButton: "custom-swal-cancel-button",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsCanceled(true);
          await cancelMultipleInvoices(formData);
          Swal.fire({
            title: "Canceled!",
            text: "Your file has been canceled.",
            icon: "success",
            customClass: {
              popup: "custom-swal-popup",
              title: "custom-swal-title",
              confirmButton: "custom-swal-confirm-button",
            },
          }).then(() => {
            // Close the modal
            setIsCanceled(false);
            setInvoiceToCancel([]);
          });
        }
      });
    } else {
      Swal.fire({
        title: "You haven't selected any request",
        text: "please select any request!",
        icon: "warning",
      });
    }
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
  }, [status, isCanceled]);

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
    <div className="w-full overflow-y-auto flex flex-col">
      <div className="flex w-full flex-col justify-between items-end">
        <p className="text-xl w-full text-start px-4 pt-2">To be paid</p>
        {records.length > 0 && (
          <button
            onClick={toggleSelectAll}
            className="btn btn-ghost btn-sm font-normal p-1 my-1"
          >
            select all
          </button>
        )}
      </div>

      {records.length > 0 ? (
        <div className="flex flex-col gap-2">
          {records.map((record, index) => (
            <div
              key={record.id}
              className="grid grid-cols-11 w-full border border-gs_white border-opacity-50 rounded-md place-items-center gap- py-2"
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
                  alt={
                    record.rental_requests.boardgames?.bg_name || "Boardgames"
                  }
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
                    className={`countdown font-mono text-xs opacity-50 ${
                      countdowns[record.rental_requests.id] <= 0
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {formatCountdown(countdowns[record.rental_requests.id]) ||
                      "overdue"}
                  </span>
                )}

                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={invoiceToCancel.includes(record.id.toString())}
                  onChange={() => toggleInvoiceSelection(record.id.toString())}
                />
              </div>
            </div>
          ))}
          <button
            onClick={handleCancelInvoices}
            className="flex w-full items-center justify-center btn bg-error hover:bg-gs_red"
          >
            cancel
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <PaidSVG />
          <p>there is no request waiting to be paid.</p>
        </div>
      )}
    </div>
  );
}
