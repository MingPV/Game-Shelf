"use client";
import { selectBannedUserByDateAndName, unbanUserAction, createNotificationByUserId } from "@/app/(user-pages)/actions";
import { countReportsByStatusAndDate } from "@/app/(admin-pages)/actions";
import { UserData } from "@/app/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import mockProvider from "@/public/mock_provider.jpeg";
import Image from "next/image";
import Swal from "sweetalert2";

export default function StatisticsOverview() {
  const [records, setRecords] = useState<UserData[]>([]);
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

  const [username, setUsername] = useState<string>("");
  const [countStatus, setCountStatus] = useState<{"completed": number, "considering": number, "waiting": number}>({"completed": 0, "considering": 0, "waiting": 0});

  useEffect(() => {
    const fetchRequests = async () => {
      const formData = new FormData();
      formData.append("month", month.toString().padStart(2, "0"));
      formData.append("year", year);
      formData.append("username", username)

      const data = await selectBannedUserByDateAndName(formData);
      if (data) setRecords(data);
    };

    const fetchCount = async (status: string) => {
      const formData = new FormData();
      formData.append("month", month.toString().padStart(2, "0"));
      formData.append("year", year);
      formData.append("status", status);

      const data = await countReportsByStatusAndDate(formData);
      if (data) setCountStatus((prev) => ({...prev, [status]: data}));
    };

    fetchRequests();
    fetchCount("completed");
    fetchCount("considering");
    fetchCount("waiting");
  }, [year, month, username]);

  function formatDateRange(dateStr: string): string {
    const endDate = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };

    const endStr = endDate.toLocaleDateString("en-GB", options);
    const year = endDate.getFullYear();

    return `${endStr} ${year}`;
  }

  const handleSubmit = async (uid: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#359368",
      cancelButtonColor: "#FF2525",
      confirmButtonText: "Accept",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        // setIsHidden(true);
        setRecords(records.filter((record) => record.uid !== uid));
        await unbanUserAction(uid);

        const message = `Your account has been unbanned by the admin.`;
        await createNotificationByUserId(uid, message);

        Swal.fire({
          title: "Judgment completed",
          text: "The decision has been made and a message has been sent to the unbanned user.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        }).then(() => {
          // Close the modal
        });
      }
    });
  };

  return (
    <div className="border rounded-md p-4">
      <div className="text-2xl font-bold pb-4">Overview</div>
      <div className="font-normal bg-gs_white bg-opacity-10 p-4 rounded-md">

        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full items-center justify-between ">
            {/* <p
              className={`text-white font-bold text-md px-4 py-2 rounded-md ${btnClass} `}
            >
              {status}
            </p> */}
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

          <div className="pl-4 py-3" >
            <li>{countStatus.completed} completed reports</li>
            <li>{countStatus.considering} considering reports</li>
            <li>{countStatus.waiting} waiting reports</li>
          </div>

          {/* Table */}
          <div className=" min-h-24 max-h-64">
            <div className="table">
              <div className="sticky top-0 z-[99] text-white  bg-transparent overflow-hidden pt-4">
                <div className="grid grid-cols-8 gap-4">
                  <div className="col-span-1 opacity-70"></div>
                  <div className="col-span-1 opacity-70"></div>
                  <div className="col-span-2 opacity-70">Username</div>
                  <div className="col-span-3 opacity-70">Banned Date</div>
                  <div className="col-span-1 opacity-70"></div>
                </div>
              </div>
              <div className="overflow-y-auto py-1 h-48">
                {records.length > 0 ? (
                  records.map((record, index) => (
                    <div
                      key={record.uid}
                      className="border border-gs_white border-opacity-50 rounded-lg grid grid-cols-8 items-center justify-center py-1 gap-4"
                    >
                      <div className="col-span-1 text-center">{index + 1}</div>
                      <div className="col-span-1 text-center">
                        <div className="flex items-center gap-3">
                          <div className="avatar mask mask-squircle h-12 w-12">
                            <Image
                              src={record.profilePicture || mockProvider}
                              alt={record.username || "Profile Picture"}
                              width={64}
                              height={64}
                            />
                          </div>
                        </div>
                      </div>
                      <Link
                        className="col-span-2 hover:underline"
                        href={`/profile/${record.username}`}
                      >
                        {record.username || "Unknown"}
                      </Link>
                      <div className="col-span-3">
                        <div className="text-xs">
                          {formatDateRange(record.ban_start)} -{" "}
                          {formatDateRange(record.ban_until)}
                        </div>
                      </div>
                      <div className="col-span-1 pr-4">
                        <button
                          className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-7 h-7 lg:min-h-7 lg:h-7 px-2"
                          onClick={() => {
                            // setSelectedId(record.uid);
                            handleSubmit(record.uid);
                          }}
                        >
                          Unban
                        </button>
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
    </div>
  );
}
