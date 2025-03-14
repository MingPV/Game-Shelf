import { Dispute } from "@/app/types/dispute";
import { useState } from "react";
import ReportTimeline from "./report-timeline";
import { useEffect } from "react";
import { selectInfoById } from "@/app/(user-pages)/actions";
import { UserData } from "@/app/types/user";
import Link from "next/link";
export default function ReportCard({ report }: { report: Dispute }) {
  function convertTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  const bgcolor =
    report.status === "waiting"
      ? "bg-gs_gray"
      : report.status === "considering"
        ? "bg-gs_yellow"
        : "bg-gs_green";

  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const [isVerdictVisible, setIsVerdictVisible] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false); // State to toggle ReportTimeline visibility
  const [adminInfo, setAdminInfo] = useState<UserData>();

  // Function to truncate text to the first n characters or words
  const truncateText = (
    text: string,
    maxLength: number = 100,
    byWords: boolean = false
  ) => {
    if (byWords) {
      const words = text.split(" ");
      if (words.length <= maxLength) return text;
      return words.slice(0, maxLength).join(" ") + "...";
    } else {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + "...";
    }
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      console.log(report.admin_id);
      const fetchData = await selectInfoById(report.admin_id);
      setAdminInfo(fetchData);
    };

    if (report.status != "waiting") {
      fetchAvatar();
    }
  }, [report]);

  return (
    <div className="w-full grid grid-cols-12 text-sm border border-gs_white border-opacity-50 p-4 rounded-xl">
      <div className="flex flex-col gap-2 justify-between col-span-10 ">
        <div className="grid grid-cols-6 pt-2">
          <p className="col-span-1 font-bold">Created At:</p>
          <p className="col-span-5 opacity-70">
            {convertTimestamp(report.created_at)}
          </p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-6">
          <p className="col-span-1 font-bold">Detail:</p>
          <div className="col-span-5 opacity-70">
            {isDetailsVisible
              ? report.details
              : truncateText(report.details, 160, false)}

            {report.details.length > 200 && (
              <button
                className="text-blue-500 mx-2 btn btn-xs btn-ghost"
                onClick={() => setIsDetailsVisible(!isDetailsVisible)}
              >
                {isDetailsVisible ? "Show Less" : "See More"}
              </button>
            )}
          </div>
        </div>

        {/* Verdict Section */}
        {report.status === "complete" && (
          <div className="grid grid-cols-6">
            <p className="col-span-1 font-bold">Verdict:</p>
            <div className="col-span-5 opacity-70">
              {isVerdictVisible
                ? report.verdict
                : truncateText(report.verdict, 160, false)}

              {report.verdict.length > 200 && (
                <button
                  className="text-blue-500 mx-2 btn btn-xs btn-ghost"
                  onClick={() => setIsVerdictVisible(!isVerdictVisible)}
                >
                  {isVerdictVisible ? "Show Less" : "See More"}
                </button>
              )}
            </div>
          </div>
        )}

        {report.status !== "waiting" && (
          <div className="grid grid-cols-6">
            <p className="col-span-1 font-bold">Considered By:</p>
            <Link
              href={`/profile/${adminInfo?.username}`}
              className="flex flex-row gap-3 hover:bg-white hover:bg-opacity-10 transition duration-300 p-1 rounded-md items-center"
            >
              <img
                src={adminInfo?.profilePicture}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-sm font-bold text-white text-opacity-90">
                {adminInfo?.username}
              </p>
            </Link>
          </div>
        )}

        {/* Conditionally render ReportTimeline */}

        <div
          className={`transition-all duration-500 ease-in-out transform ${
            isClick
              ? "max-h-screen opacity-100 scale-100 translate-y-0"
              : "max-h-0 opacity-0 translate-y-4"
          } overflow-hidden`}
        >
          {isClick && (
            <div className="w-full">
              <div className="grid grid-cols-6">
                <p className="col-span-1 font-bold"></p>
                <div className="col-span-5 opacity-70 w-full py-2">
                  <ReportTimeline report={report} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Button */}
      <div className="flex items-start justify-end col-span-2 ">
        <button
          onClick={() => setIsClick(!isClick)} // Toggle ReportTimeline visibility
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            report.status === "waiting"
              ? "bg-gray-300 text-gray-700"
              : report.status === "considering"
                ? "bg-yellow-400 text-white"
                : "bg-green-500 text-white"
          } `}
        >
          {report.status}
        </button>
      </div>
    </div>
  );
}
