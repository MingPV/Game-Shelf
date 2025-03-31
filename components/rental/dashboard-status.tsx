"use client";
import { selectMyRentingRequestByStatus } from "@/app/(rental-pages)/actions";
import { RentingRequest } from "@/app/types/game";
import Link from "next/link";
import { useEffect, useState } from "react";

export function DashBoardStatus({ status }: { status: string }) {
  const [records, setRecords] = useState<RentingRequest[]>([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const this_year = new Date().getFullYear();
  const num_year_forward = 4;
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const years = Array.from(
    { length: num_year_forward + 1 },
    (_, index) => this_year + index
  );

  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const classBtn = {
    renting: "bg-gs_green",
    reserved: "bg-gs_yellow",
    canceled: "bg-gs_red bg-opacity-60",
  } as const; // Use `as const` to make the object keys readonly and literal types

  type Status = keyof typeof classBtn; // 'renting' | 'reserved' | 'request'

  const [btnClass, setBtnClass] = useState<string>(
    classBtn[status as Status] || ""
  );

  useEffect(() => {
    const fetchRental = async (
      status: string,
      month: string,
      year: string
    ): Promise<any> => {
      // Build the query string
      const queryString = new URLSearchParams({
        status: status,
        month: month,
        year: year,
      }).toString();

      // Make the GET request
      const res = await fetch(`/api/rental/filter?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Parse the JSON response
      return res.json();
    };

    const fetchRequests = async () => {
      const { data } = await fetchRental(
        status,
        month.toString().padStart(2, "0"),
        year
      );
      //
      setRecords(data);
      console.log("data record status: ", status, data);
    };

    fetchRequests();
  }, [status, year, month]);

  const convertDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="font-normal bg-gs_white bg-opacity-10 p-4 rounded-md">
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full items-center justify-between ">
          <p
            className={`text-white font-bold text-md px-4 py-2 rounded-md ${btnClass} `}
          >
            {status}
          </p>
          <div className="flex flex-row join border border-white border-opacity-50 ">
            {/* Month Dropdown */}
            <div className="dropdown dropdown-end join-item">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm m-1 btn-ghost text-xl"
                onClick={() => {
                  setIsMonthOpen(!isMonthOpen);
                  setIsYearOpen(false);
                }} // Toggle month dropdown
              >
                {months[month]}
              </div>
              <ul
                tabIndex={0}
                className={`dropdown-content btn-outline grid grid-cols-2 rounded-box z-[99999] w-52 p-2 shadow max-h-54 overflow-y-auto bg-neutral hover:bg-neutral ${isMonthOpen ? "block" : "hidden"}`}
              >
                {months.map((month, index) => (
                  <li key={index} className="w-full bg-neutral col-span-1">
                    <button
                      className="btn btn-sm btn-ghost  text-left w-full text-accent hover:text-gs_white"
                      onClick={() => {
                        setMonth(index);
                        setIsMonthOpen(false); // Close dropdown after selection
                      }}
                    >
                      {month}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Year Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm m-1 btn-ghost text-xl"
                onClick={() => {
                  setIsYearOpen(!isYearOpen);
                  setIsMonthOpen(false);
                }} // Toggle year dropdown
              >
                {year}
              </div>
              <ul
                tabIndex={0}
                className={`dropdown-content btn-outline rounded-box z-[99999] w-24 p-2 shadow max-h-96 overflow-y-auto bg-neutral hover:bg-neutral ${isYearOpen ? "block" : "hidden"}`}
              >
                {years.map((year, index) => (
                  <li key={index} className="w-full bg-neutral col-span-1">
                    <button
                      className="btn btn-sm text-left w-full text-accent  btn-ghost hover:text-gs_white"
                      onClick={() => {
                        setYear(year.toString());
                        setIsYearOpen(false); // Close dropdown after selection
                      }}
                    >
                      {year}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className=" min-h-24 max-h-64">
          <div className="table">
            <div className="sticky top-0 z-[99] text-white  bg-transparent overflow-hidden pt-4">
              <div className="grid grid-cols-11 ">
                <div className="col-span-1 opacity-70">{""}</div>
                <div className="col-span-3 opacity-70">Boardgame Name</div>
                <div className="col-span-4 opacity-70">Customer Name</div>
                <div className="col-span-3 opacity-70">Duration</div>
              </div>
            </div>
            <div className="overflow-y-auto py-1 h-48">
              {records.length > 0 ? (
                records.map((record, index) => (
                  <div
                    key={record.id}
                    className="border border-gs_white border-opacity-50 rounded-lg grid grid-cols-11 items-center justify-center py-1"
                  >
                    <div className="col-span-1 text-center">{index + 1}</div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="avatar mask mask-squircle h-12 w-12">
                          <img
                            src={
                              record.boardgames?.bg_picture ||
                              "https://via.placeholder.com/48"
                            }
                            alt={record.boardgames?.bg_name || "Boardgames"}
                          />
                        </div>
                        <div>
                          <div className="text-sm max-w-56 break-words">
                            {record.boardgames?.bg_name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="col-span-4 hover:underline"
                      href={`/profile/${record.users?.username}`}
                    >
                      {record.users?.username || "Unknown"}
                    </Link>
                    <div className="col-span-3">
                      <div className="text-xs">
                        {convertDate(record.start_date)} -{" "}
                        {convertDate(record.end_date)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center flex py-4 h-full items-center justify-center">
                  <p className="font-bold">No records found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
