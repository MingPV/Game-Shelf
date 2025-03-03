"use client";
import { selectMyRentingRequestByStatus } from "@/app/(rental-pages)/actions";
import { RentingRequest } from "@/app/types/game";
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
    requested: "bg-gs_gray",
  } as const; // Use `as const` to make the object keys readonly and literal types

  type Status = keyof typeof classBtn; // 'renting' | 'reserved' | 'request'

  const [btnClass, setBtnClass] = useState<string>(
    classBtn[status as Status] || ""
  );

  useEffect(() => {
    const fetchRequests = async () => {
      const formData = new FormData();
      formData.append("status", status);
      formData.append("month", month.toString().padStart(2, "0"));
      formData.append("year", year);

      const data = await selectMyRentingRequestByStatus(formData);
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
    <div className="font-normal">
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full items-center justify-between">
          <p
            className={`text-white font-bold text-md px-4 py-2 rounded-md ${btnClass} `}
          >
            {status}
          </p>
          <div className="flex flex-row join">
            {/* Month Dropdown */}
            <div className="dropdown dropdown-end join-item">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm m-1 btn-outline"
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
                      className="btn btn-sm text-left w-full text-accent hover:text-neutral btn-outline"
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
                className="btn btn-sm m-1 btn-outline"
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
                      className="btn btn-sm text-left w-full text-accent hover:text-neutral btn-outline"
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
        <div className="overflow-x-auto min-h-24 max-h-64">
          <table className="table">
            <thead className="backdrop-blur-xl sticky top-0 z-[99] text-white shadow-md  bg-transparent overflow-hidden">
              <tr>
                <th>{""}</th>
                <th>Boardgame Name</th>
                <th>Customer Name</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {records.map((record, index) => (
                <tr key={record.id}>
                  <th>{index + 1}</th>
                  <td>
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
                  </td>
                  <td>{record.users?.username || "Unknown"}</td>
                  <td>
                    <button className="text-xs">
                      {convertDate(record.start_date)} -{" "}
                      {convertDate(record.end_date)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
