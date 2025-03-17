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

  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const [isVerdictVisible, setIsVerdictVisible] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false); // State to toggle ReportTimeline visibility
  const [adminInfo, setAdminInfo] = useState<UserData>();
  const [reportToInfo, setReportToInfo] = useState<UserData>();

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
      if (report.status != "waiting") {
        const fetchData = await selectInfoById(report.admin_id);
        setAdminInfo(fetchData);
      }
      const fetchDataReportTo = await selectInfoById(report.report_to);
      setReportToInfo(fetchDataReportTo);
      console.log(fetchDataReportTo);
    };

    fetchAvatar();
  }, [report]);

  return (
    <div className="w-full grid grid-cols-12 text-sm border border-gs_white border-opacity-50 p-4 rounded-xl">
      <div className="flex flex-col gap-2 justify-between col-span-12  text-xs sm:text-sm">
        <div className="grid grid-cols-12 justify-between pt-2 w-full">
          <p className="col-span-10 font-bold text-md sm:text-xl">
            {report.title}
          </p>
          <div className="sm:flex items-start justify-end col-span-2 hidden ">
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
        <div className="grid grid-cols-6 pt-2">
          <p className="col-span-2  md:col-span-2 lg:col-span-1 font-bold">
            Report date:
          </p>
          <p className="col-span-4  md:col-span-4 lg:col-span-5 opacity-70">
            {convertTimestamp(report.created_at)}
          </p>
        </div>
        <div className="grid grid-cols-6 pt-2">
          <p className="col-span-2  md:col-span-2 lg:col-span-1 font-bold">
            Type :
          </p>
          <p className="col-span-4  md:col-span-4 lg:col-span-5 opacity-70">
            {report.type}
          </p>
        </div>

        <div className="grid grid-cols-6 pt-2 sm:hidden">
          <p className="col-span-2  md:col-span-2 lg:col-span-1 font-bold">
            Status :
          </p>
          <p className="col-span-4  md:col-span-4 lg:col-span-5 opacity-70">
            {report.status}
          </p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-6">
          <p className="col-span-2  md:col-span-2 lg:col-span-1 font-bold">
            Detail:
          </p>
          <div className="col-span-4  md:col-span-4 lg:col-span-5 opacity-70">
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
            <p className="col-span-2  md:col-span-2 lg:col-span-1 font-bold">
              Verdict:
            </p>
            <div className="col-span-4  md:col-span-4 lg:col-span-5 opacity-70">
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

        <div className="grid grid-cols-6">
          <p className="col-span-2  md:col-span-2 lg:col-span-1 font-bold">
            Report to:
          </p>
          <Link
            href={`/profile/${reportToInfo?.username}`}
            className="flex flex-row gap-3 hover:bg-white hover:bg-opacity-10 transition duration-300 p-1 rounded-md items-center"
          >
            <img
              src={reportToInfo?.profilePicture}
              alt={reportToInfo?.profilePicture}
              className="w-10 h-10 rounded-full"
            />
            <p className="text-sm font-bold text-white text-opacity-90">
              {reportToInfo?.username}
            </p>
          </Link>
        </div>

        {report.status !== "waiting" && (
          <div className="grid grid-cols-6">
            <p className="col-span-2  md:col-span-2 lg:col-span-1 font-bold">
              Considered By:
            </p>
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
                <p className="col-span-6  md:col-span-2 lg:col-span-1 font-bold"></p>
                <div className="col-span-6  md:col-span-4 lg:col-span-5 opacity-70 w-full py-2">
                  <ReportTimeline report={report} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Button */}
    </div>
  );
}
