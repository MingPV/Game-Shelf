"use client";

import StatisticsOverview from "@/components/admin-pages/statistics-overview";
import StatisticsMostReported from "@/components/admin-pages/statistics-most-reported";

export default function Home() {

    return (
        <main className="flex flex-col items-center gap-6 w-full h-full">
            <div className="text-2xl font-bold pb-1">Report Statistics Page</div>
            <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-10/12 h-full">
                <StatisticsOverview />
                <StatisticsMostReported />
            </div>
        </main>
    );
}