"use client";

import { Dispute } from "@/app/types/admin";
import { Boardgame } from "@/app/types/game";
import { UserData } from "@/app/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DisputeCardProps {
  dispute: Dispute;
}

export default function SuccessfulCard({ dispute }: DisputeCardProps) {
  //   const [profileURL, setProfileURL] = useState("/mock_provider.jpeg");
  const [reporter_profileURL, setReporterProfileURL] = useState(
    "/mock_provider.jpeg"
  );
  const [reported_profileURL, setReportedProfileURL] = useState(
    "/mock_provider.jpeg"
  );
  const [admin, setAdmin] = useState<UserData>();
  const [reporter, setReporter] = useState<UserData>();
  const [reported, setReported] = useState<UserData>();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const fetchUserByID = async (
      userID: string
    ): Promise<{
      data: UserData[];
      token: string;
    }> => {
      const res = await fetch(`/api/users/${userID}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    async function fetchUserData() {
      const { data: res } = await fetchUserByID(dispute.admin_id);
      const { data: res2 } = await fetchUserByID(dispute.reporter);
      const { data: res3 } = await fetchUserByID(dispute.report_to);
      if (res.length > 0) {
        setAdmin(res[0]);
      }
      if (res2.length > 0) {
        setReporter(res2[0]);
        setReporterProfileURL(res2[0]?.profilePicture || "/mock_provider.jpeg");
      }
      if (res3.length > 0) {
        setReported(res3[0]);
        setReportedProfileURL(res3[0]?.profilePicture || "/mock_provider.jpeg");
      }
    }

    fetchUserData();
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

  return !isHidden ? (
    <>
      <div className="flex flex-col justify-center rounded-sm border border-white border-opacity-30 p-4 w-full  ">
        <div className="flex flex-col gap-4 lg:gap-0 lg:grid lg:grid-flow-col lg:grid-cols-12 ">
          <Link
            className="col-span-2 lg:col-span-2 flex gap-2 items-center hover:bg-white/10 p-2 rounded-md w-fit"
            href={`/profile/${reporter?.username}`}
          >
            <div className="flex relative h-7 w-7 rounded-full">
              <img
                alt="provider profile"
                src={reporter_profileURL}
                sizes="28px"
                className="rounded-full"
              />
            </div>
            {reporter?.username}
            <span className="text-white/50 lg:hidden">(Reporter)</span>
          </Link>
          <Link
            className="col-span-2  lg:col-span-2 flex gap-2 items-center hover:bg-white/10 p-2 rounded-md w-fit"
            href={`/profile/${reported?.username}`}
          >
            <div className="flex relative h-7 w-7 rounded-full">
              <img
                alt="provider profile"
                src={reported_profileURL}
                sizes="28px"
                className="rounded-full"
              />
            </div>
            <div>{reported?.username}</div>
            <span className="text-white/50 lg:hidden">(Reported)</span>
          </Link>
          <div className="col-span-5 text-sm text-white/50 bg-black/20 p-3 rounded-sm">
            <div>{dispute.verdict}</div>
          </div>
          <div className="lg:flex col-span-1 text-sm  items-center justify-start lg:justify-end text-red-600 hover:underline flex flex-row gap-2">
            <Link href={`/profile/${admin?.username}`}>{admin?.username}</Link>
            <span className="text-white/50 lg:hidden">(Admin)</span>
          </div>
          <div className="flex lg:flex col-span-2 text-sm  items-center lg:justify-end mr-2 gap-2">
            {formatDateRange(dispute.verdict_timestamp?.toString())}
            <span className="text-white/50 lg:hidden">(Completed)</span>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
