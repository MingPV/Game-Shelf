"use client";
import {
  unbanUserAction,
  createNotificationByUserId,
} from "@/app/(user-pages)/actions";
import { UserData } from "@/app/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import mockProvider from "@/public/mock_provider.jpeg";
import Image from "next/image";
import Swal from "sweetalert2";
import { useDebouncedCallback } from "use-debounce";
import { FiSearch } from "react-icons/fi";

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
  const [countStatus, setCountStatus] = useState<{
    complete: number;
    considering: number;
    waiting: number;
  }>({ complete: 0, considering: 0, waiting: 0 });

  const [isLoading, setIsLoading] = useState(true);

  //

  const fetchBannedUsers = async (
    queryString: string
  ): Promise<{
    data: UserData[];
  }> => {
    const res = await fetch(`/api/users/banned?${queryString}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    return res.json();
  };

  const fetchRequests = async () => {
    setIsLoading(true);

    // Build the query string
    const queryString = new URLSearchParams({
      month: month.toString().padStart(2, "0"),
      year: year,
      username: username,
    }).toString();

    const { data: data } = await fetchBannedUsers(queryString);
    if (data) setRecords(data);
    setIsLoading(false);
  };

  const fetchCountStat = async (
    queryString: string
  ): Promise<{
    data: UserData[];
  }> => {
    const res = await fetch(`/api/reports/countReports?${queryString}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    return res.json();
  };

  const fetchCount = async (status: string) => {
    const queryString = new URLSearchParams({
      month: month.toString().padStart(2, "0"),
      year: year,
      status: status,
    }).toString();

    const { data: data } = await fetchCountStat(queryString);
    setCountStatus((prev) => ({ ...prev, [status]: data }));
  };

  const debouncedFetchRequests = useDebouncedCallback(() => {
    fetchRequests();
  }, 500);

  useEffect(() => {
    // fetchRequests();
    debouncedFetchRequests();
    fetchCount("complete");
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
        setRecords(records.filter((record) => record.uid !== uid));
        await unbanUserAction(uid);

        const message = `Your account has been unbanned by the admin.`;
        await createNotificationByUserId(uid, message);

        Swal.fire({
          title: "Unban Successful",
          text: "The user has been successfully unbanned.",
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
    <div className="border rounded-md p-4 w-full lg:w-7/12 h-full">
      <div className="text-2xl font-bold pb-4">Overview</div>
      <div className="font-normal bg-gs_white bg-opacity-10 p-4 rounded-md h-full">
        <div className="flex flex-row join border border-white border-opacity-50 h-full w-fit">
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

        <div className="pl-4 py-3">
          <li>{countStatus.complete} completed reports</li>
          <li>{countStatus.considering} considering reports</li>
          <li>{countStatus.waiting} waiting reports</li>
        </div>

        <div className="relative w-full">
          <FiSearch className="absolute top-2 left-6 text-white text-opacity-80" />
          <input
            type="text"
            placeholder="Search by username"
            className="w-full py-1 pl-12 bg-transparent rounded-full border border-opacity-80 border-gs_white hover:border-opacity-100 text-white placeholder-white placeholder-opacity-80"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="h-full">
          {/* " min-h-24 max-h-64"> */}
          <div className="table">
            <div className="sticky top-0 z-[99] text-white  bg-transparent overflow-hidden pt-3 pb-2">
              <div className="grid grid-cols-7 lg:grid-cols-11 gap-4">
                <div className="col-span-1 opacity-70"></div>
                <div className="col-span-1 opacity-70"></div>
                <div className="col-span-3 opacity-70">Username</div>
                <div className="col-span-4 opacity-70 hidden lg:block">
                  Banned Date
                </div>
                <div className="col-span-2 opacity-70"></div>
              </div>
            </div>

            <div className="overflow-y-auto py-1 h-[calc(100vh-500px)]">
              {!isLoading ? (
                records.length > 0 ? (
                  records.map((record, index) => (
                    <div
                      key={record.uid}
                      className="border border-gs_white border-opacity-50 rounded-lg grid grid-cols-7 lg:grid-cols-11 items-center justify-center py-1 gap-4"
                    >
                      <div className="col-span-1 text-center">{index + 1}</div>
                      <div className="col-span-1 text-center">
                        <div className="flex items-center">
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
                        className="col-span-3 hover:underline font-bold"
                        href={`/profile/${record.username}`}
                      >
                        {record.username || "Unknown"}
                      </Link>
                      <div className="hidden lg:block col-span-4">
                        <div className="text-xs">
                          {formatDateRange(record.ban_start)} -{" "}
                          {formatDateRange(record.ban_until)}
                        </div>
                      </div>
                      <div className="col-span-2">
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
                )
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="bg-black bg-opacity-10 skeleton h-14 w-full rounded-lg"></div>
                  {/* <div className="bg-black bg-opacity-10 skeleton h-14 w-full rounded-lg"></div>
                  <div className="bg-black bg-opacity-10 skeleton h-14 w-full rounded-lg"></div>
                  <div className="bg-black bg-opacity-10 skeleton h-14 w-full rounded-lg"></div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
