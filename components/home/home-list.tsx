import React from "react";

import { useEffect, useState } from "react";
import { UserData } from "@/app/types/user";
import { getMyUserData, selectTopProvider } from "@/app/(user-pages)/actions";

export default function HomeList() {
  const [topProviders, setTopProviders] = useState<UserData[]>();
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const fetchTopProvider = async () => {
      const fetchData = await selectTopProvider();
      setTopProviders(fetchData);
    };

    const fetchUserData = async () => {
      const fetchedUserData = await getMyUserData();
      setUserData(fetchedUserData);
    };

    fetchUserData();
    fetchTopProvider();
  }, []);
  return (
    <div className="hidden md:flex flex-col gap-6 ml-12">
      <div className="card  bg-neutral-800 bg-opacity-40 w-full border border-white border-opacity-20">
        <div className="card-body">
          <div className="flex flex-row gap-4">
            <div className="w-10 rounded-full mb-2">
              <img
                alt="Tailwind CSS Navbar component"
                src={"/mock_provider.jpeg"}
                className="rounded-full"
              />
            </div>
            <h2 className="card-title">{userData?.username}</h2>
          </div>
          <div className="flex flex-row gap-2">
            <div>Email : </div>
            <div className="text-opacity-60 text-white">{userData?.email}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Member since : </div>
            <div className="text-opacity-60 text-white">
              {userData?.created_at
                ? new Date(userData.created_at).toLocaleDateString()
                : ""}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Role : </div>
            <div className="text-opacity-60 text-white">
              {userData?.isProvider ? "Provider" : "Customer"}
            </div>
          </div>
        </div>
      </div>
      <div className="card glass w-full">
        <div className="card-body w-full">
          <h2 className="card-title font-black">Updated</h2>
          <div className="font-extralight">
            <span className="font-black m-2">·</span> homepage{" "}
            <span className="badge">New</span>
          </div>
          <div className="font-extralight">
            <span className="font-black m-2">·</span> profile management{" "}
            <span className="badge">New</span>
          </div>
          <div className="font-extralight">
            <span className="font-black m-2">·</span> schedule management{" "}
            <span className="badge">New</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto ">
        <div className="mb-6 w-full ml-6 font-extrabold">Top 10 Providers</div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>Rank</label>
              </th>
              <th>Name</th>
              <th>Successful rental</th>
            </tr>
          </thead>
          <tbody>
            {topProviders?.map((provider, index) => (
              <tr key={provider.username}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={provider.profilePicture} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{provider.username}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center">32</td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Successful rental</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
