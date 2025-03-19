"use client";

import { getMyUserData } from "@/app/(user-pages)/actions";
import { Dispute } from "@/app/types/admin";
import { UserData, verificationRequests } from "@/app/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPendingReports, getAllPendingVerifications } from "../actions";
import VerificationHomeCard from "@/components/admin-pages/verification-homecard";

export default function Home() {
  const [userData, setUserData] = useState<UserData>();
  const [incomingReports, setIncomingReports] = useState<Dispute[]>();
  const [incomingVerfications, setIncomingVerifications] =
    useState<verificationRequests[]>();

  useEffect(() => {
    const fetchMyData = async () => {
      const res = await getMyUserData();
      setUserData(res);
    };
    const fetchIncomingData = async () => {
      const res1 = await getAllPendingReports();
      const res2 = await getAllPendingVerifications();

      setIncomingReports(res1);
      setIncomingVerifications(res2);
    };

    fetchMyData();
    fetchIncomingData();
  }, []);

  function formatDateRange(endDateStr: string): string {
    const endDate = new Date(endDateStr);

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };

    const endStr = endDate.toLocaleDateString("en-GB", options);
    const year = endDate.getFullYear();

    return `${endStr} ${year}`;
  }

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 w-full">
        <div className="flex flex-row font-bold h-[86vh] w-full bg-black/10">
          <div className="flex flex-col m-4 w-full md:w-auto items-center">
            <div className="card  bg-neutral-800 bg-opacity-40 w-64 xs1:w-80 sm:w-96 border border-white border-opacity-20">
              <div className="card-body">
                <div className="flex flex-row gap-4">
                  <div className="w-10 rounded-full mb-2">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={userData?.profilePicture || "/mock_provider.jpeg"}
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="card-title mb-2">
                    {userData?.username || "Username"}
                  </h2>
                </div>
                <div className="flex flex-row gap-2">
                  <div>Email : </div>
                  <div className="text-opacity-60 text-white">
                    {userData?.email || "user@gmail.com"}
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div>Member since : </div>
                  <div className="text-opacity-60 text-white">
                    {userData?.created_at
                      ? formatDateRange(userData.created_at)
                      : "1 Jan 2025"}
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div>Role : </div>
                  <div className=" text-red-600">Admin</div>
                </div>
              </div>
            </div>
            <div className="text-xs font-light text-red-500 w-64 sm:w-96 pl-4 mt-2">
              Warning: You are logged in as an admin. Please use this account
              carefully and log out when you are not at your computer to ensure
              security.
            </div>
            <div className="flex flex-col w-96 items-center mt-10 gap-2">
              <Link
                className="mt-2 btn btn-outline btn-primary w-64 sm:w-80"
                href="/manage-provider"
              >
                Manage Provider
              </Link>
              <Link
                className="mt-2 btn btn-outline btn-primary w-64 sm:w-80"
                href="/admin-homepage"
              >
                Manage Report
              </Link>
              <Link
                className="mt-2 btn btn-outline btn-primary w-64 sm:w-80"
                href="/admin-homepage"
              >
                Report Statistic
              </Link>
              <Link
                className="mt-2 btn btn-outline btn-primary w-64 sm:w-80"
                href="/successful-report"
              >
                Successful Reports
              </Link>
            </div>
          </div>
          <div className="flex-1 flex-row m-4 hidden md:flex">
            <div className=" flex-col w-full lg:w-1/2 mx-4 p-4 border border-white/10 rounded-md overflow-hidden hidden md:flex">
              <div className="text-white/90 font-bold text-xl font-serif">
                Incoming Reports
              </div>
              <div className="flex flex-col gap-2 mt-6 overflow-hidden">
                <div className="overflow-scroll flex flex-col gap-2">
                  {!incomingReports ? (
                    <>
                      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
                        <div className="text-sm text-white/10">Loading</div>
                      </div>
                      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
                        <div className="text-sm text-white/10">Loading</div>
                      </div>
                      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
                        <div className="text-sm text-white/10">Loading</div>
                      </div>
                      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
                        <div className="text-sm text-white/10">Loading</div>
                      </div>
                    </>
                  ) : (
                    incomingReports.map((item, index) => (
                      <div
                        className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center"
                        key={index}
                      >
                        <div className="text-sm text-white/50">
                          {item.title}
                        </div>
                        <div className="bg-white/10 p-2 rounded-md text-sm w-20 flex justify-center">
                          {item.type}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <Link
                  className="flex justify-center items-center w-full my-2 bg-white/10 p-4 border border-white/20 font-serif text-sm hover:bg-white/20 transition-all duration-300 "
                  href={"/admin-homepage"}
                >
                  Manage all reports
                </Link>
              </div>
            </div>
            <div className="flex-col  mx-4 p-4 border border-white/10 rounded-md overflow-hidden hidden lg:flex w-1/2">
              <div className="text-white/90 font-bold text-xl font-serif">
                Incoming Provider Verifications
              </div>
              <div className="flex flex-col gap-2 mt-6 overflow-hidden">
                <div className="overflow-scroll flex flex-col gap-2">
                  {!incomingVerfications ? (
                    <>
                      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
                        <div className="text-sm text-white/10">Loading</div>
                      </div>
                      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
                        <div className="text-sm text-white/10">Loading</div>
                      </div>
                      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
                        <div className="text-sm text-white/10">Loading</div>
                      </div>
                      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
                        <div className="text-sm text-white/10">Loading</div>
                      </div>
                      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
                        <div className="text-sm text-white/10">Loading</div>
                      </div>
                    </>
                  ) : (
                    incomingVerfications.map((item, index) => (
                      <VerificationHomeCard verification={item} key={index} />
                    ))
                  )}
                </div>
                <Link
                  className="flex justify-center items-center w-full my-2 bg-white/10 p-4 border border-white/20 font-serif text-sm hover:bg-white/20 transition-all duration-300 "
                  href={"/admin-homepage"}
                >
                  Manage all requests
                </Link>
              </div>
            </div>
          </div>
          {/* <div>Welcome back admin</div>

          <Link
            className="mt-2 btn btn-outline btn-primary"
            href="/manage-provider"
          >
            Manage Provider
          </Link>
          <Link
            className="mt-2 btn btn-outline btn-primary"
            href="/admin-homepage"
          >
            Manage Report
          </Link>
          <Link
            className="mt-2 btn btn-outline btn-primary"
            href="/admin-homepage"
          >
            Report Statistic
          </Link> */}
        </div>
      </main>
    </>
  );
}
