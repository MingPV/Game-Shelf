"use client";

import StatisticsOverview from "@/components/admin-pages/statistics-overview";
import StatisticsMostReported from "@/components/admin-pages/statistics-most-reported";

export default function Home() {

    return (
        <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
            <div className="flex flex-col items-center justify-center w-full">
            <div className="text-2xl font-bold pb-4">Report Statistics Page</div>
            <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-10/12 items-center">
                <StatisticsOverview />
                <StatisticsMostReported />
            </div>
            </div>
        </main>
    );
}