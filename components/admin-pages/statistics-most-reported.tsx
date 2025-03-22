"use client";
import { getTopReportedUsers } from "@/app/(admin-pages)/actions";
import { UserData } from "@/app/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import mockProvider from "@/public/mock_provider.jpeg";
import Image from "next/image";

interface MostReportedUsers {
  uid: string;
  report_count: number;
  rental_report_count: number; 
  general_report_count: number;
  waiting_report_count: number;
  username: string;
  profilePicture: string;
}

export default function StatisticsMostReported() {
  const [records, setRecords] = useState<MostReportedUsers[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getTopReportedUsers();
      setRecords(res);
    }

    fetchData();
  }, []);

  return (
    <div className="border rounded-md p-4 h-full w-full lg:w-5/12">
      <div className="text-2xl font-bold pb-4">Most Reported Users</div>
      <div className="font-normal bg-gs_white bg-opacity-10 p-4 rounded-md h-full">

        <div className="flex flex-col w-full">
          {/* <div className="flex flex-row w-full items-center justify-between ">
            <div className="flex flex-row join border border-white border-opacity-50 "> */}
              

          {/* Table */}
          <div className="h-full">
            <div className="table">
              <div className="sticky top-0 z-[99] text-white  bg-transparent overflow-hidden pt-4">
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-1 opacity-70"></div>
                  <div className="col-span-1 opacity-70"></div>
                  <div className="col-span-2 opacity-70">Username</div>
                  <div className="col-span-1 opacity-70"></div>
                </div>
              </div>
              <div className="overflow-y-auto py-1 h-48">
                {records.length > 0 ? (
                  records.map((record, index) => (
                    <div
                      key={record.uid}
                      className="border border-gs_white border-opacity-50 rounded-lg grid grid-cols-5 items-center justify-center py-1 gap-4"
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
                      <div className="col-span-1 pr-4">
                        <Link
                          className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-7 h-7 lg:min-h-7 lg:h-7 px-2"
                          href={`/report-list`}
                        >
                          Manage
                        </Link>
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
