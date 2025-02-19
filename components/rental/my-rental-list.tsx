"use client";

import MyRentalCard from "./my-rental-card";

export default function MyRentalList() {
  
  return (
    <div className="flex flex-col bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full mb-4">
    {/* <div className="text-lg pb-4 font-bold">Board Game Requested</div> */}
        <MyRentalCard />
    </div>

  );
}
