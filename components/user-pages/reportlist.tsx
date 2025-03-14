"use client";

import { UserData } from "@/app/types/user";
import { useState, useEffect } from "react";
import { Dispute } from "@/app/types/dispute";
import { selectReports } from "@/app/(user-pages)/actions";
import ReportCard from "./report-card";
import LoadingReportCard from "./loading-report-card";
export default function ReportList() {
  const [reports, setReports] = useState<Dispute[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReport = async () => {
      const fetchData = await selectReports();
      console.log(fetchData);

      setIsLoading(false);
      setReports(fetchData);
    };

    fetchReport();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col p-4 gap-4 w-full bg-gs_white bg-opacity-10 rounded-xl">
          <LoadingReportCard />
          <LoadingReportCard />
          <LoadingReportCard />
          <LoadingReportCard />
          <LoadingReportCard />
        </div>
      ) : (
        <div className="bg-gs_white bg-opacity-10 rounded-xl w-full">
          <div className="flex flex-col p-4 gap-4">
            {reports.map((report, index) => (
              <ReportCard key={index} report={report} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
