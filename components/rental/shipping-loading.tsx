"use client";

function LoadingCard() {
    return (
        <tr className="border-white border-opacity-20">
            <td className="hidden sm:table-cell">
                <div className="bg-white opacity-20 h-5 w-4 rounded-lg"></div>
            </td>
            <td className="hidden sm:table-cell">
                <div className="bg-white opacity-20 h-12 w-12 rounded-lg"></div>
            </td>
            <td className="">
                <div className="bg-white opacity-20 my-1 sm:my-0 h-5 w-20 rounded-lg"></div>
            </td>
            <td className="hidden sm:table-cell">
                <div className="bg-white opacity-20 h-5 w-20 rounded-lg"></div>
            </td>
            <td className="">
                <div className="bg-white opacity-20 h-5 w-20 rounded-lg"></div>
            </td><td className="">
                <div className="bg-white opacity-20 h-5 w-5 rounded-lg"></div>
            </td>
        </tr>
    );
}

export default function RentingShippingLoading() {
  return (
    <div>
        <div className="flex-grow mt-4 h-[calc(100vh-275px)] lg:h-[calc(100vh-255px)]">
        <table className="table rounded-lg bg-black bg-opacity-10 skeleton">
            <thead>
            <tr className="border-white border-opacity-20">
                <th className="hidden sm:table-cell"></th>
                <th className="hidden sm:table-cell"></th>
                <th><div className="bg-white opacity-20 h-5 w-20 rounded-lg"></div></th>
                <th className="hidden sm:table-cell"><div className="bg-white opacity-20 h-5 w-20 rounded-lg"></div></th>
                <th><div className="bg-white opacity-20 h-5 w-20 rounded-lg"></div></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </tbody>
        </table>                
        </div>
    </div>
  );
}
