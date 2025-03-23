"use client";
import { getTopReportedUsers } from "@/app/(admin-pages)/actions";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await getTopReportedUsers();
      setRecords(res);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="border rounded-md p-4 w-full lg:w-5/12">
      <div className="text-2xl font-bold pb-4">Most Reported Users</div>
      <div className="font-normal bg-gs_white bg-opacity-10 p-4 rounded-md">
        <div className="flex flex-col w-full">
          {/* Table */}
          <div className="">
            <div className="table">
              <div className="sticky top-0 z-[99] text-white bg-transparent overflow-hidden pb-2">
                <div className="grid grid-cols-10 gap-4">
                  <div className="col-span-5 opacity-70 pl-4">
                    Player / Provider
                  </div>
                  <div className="col-span-1 opacity-70"></div>
                  <div className="col-span-1 opacity-70"></div>
                  <div className="col-span-3 opacity-70"></div>
                </div>
              </div>

              <div className="overflow-y-auto py-1 h-[calc(100vh-320px)]">
                {!isLoading ? (
                  records.length > 0 ? (
                    records.map((record, index) => (
                      <div
                        key={record.uid}
                        className="border border-gs_white border-opacity-50 rounded-lg grid grid-cols-10 items-center justify-center py-1 gap-4 px-4"
                      >
                        <div className="col-span-1 text-center">
                          {index + 1}
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="avatar mask mask-squircle h-12 w-12">
                            <Image
                              src={record.profilePicture || mockProvider}
                              alt={record.username || "Profile Picture"}
                              width={64}
                              height={64}
                            />
                          </div>
                        </div>
                        <div className="col-span-4 py-2">
                          <Link
                            className="font-bold hover:underline"
                            href={`/profile/${record.username}`}
                          >
                            {record.username || "Unknown"}
                          </Link>
                          <div className="text-white text-opacity-60">
                            <div>
                              total{" "}
                              <span className="hidden lg:inline-block">
                                reported
                              </span>
                              : {record.report_count}
                            </div>
                            <div>rental: {record.rental_report_count}</div>
                            <div>general: {record.general_report_count}</div>
                            <div className="text-orange-400">
                              pending{" "}
                              <span className="hidden lg:inline-block">
                                verdict
                              </span>
                              : {record.waiting_report_count}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center col-span-3">
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
                  )
                ) : (
                  <div>
                    <div className="bg-black bg-opacity-10 skeleton h-32 w-full rounded-lg"></div>
                    <div className="bg-black bg-opacity-10 skeleton h-32 w-full rounded-lg"></div>
                    <div className="bg-black bg-opacity-10 skeleton h-32 w-full rounded-lg"></div>
                    <div className="bg-black bg-opacity-10 skeleton h-32 w-full rounded-lg"></div>
                    <div className="bg-black bg-opacity-10 skeleton h-32 w-full rounded-lg"></div>
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
