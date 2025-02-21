"use client";

import RentingShippingList from "@/components/rental/renting-shipping-list";

export default function Home() {

    return (
        <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
            <div className="flex flex-col items-center justify-center w-full">
            <div className="text-2xl font-bold pb-4">Shipping Page</div>
                <RentingShippingList />
            </div>
        </main>
    );
}