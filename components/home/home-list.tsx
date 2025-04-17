"use client";

import React from "react";

import { useEffect, useState } from "react";
import { UserData, verificationRequests } from "@/app/types/user";
import Link from "next/link";

export default function HomeList() {
  const [topProviders, setTopProviders] = useState<UserData[]>();
  const [userData, setUserData] = useState<UserData>();
  const [isFetchingProvider, setIsFetchingProvider] = useState(true);
  const [myVerification, setMyVerification] = useState<verificationRequests>();

  //

  useEffect(() => {
    const fetchMyData = async (): Promise<{
      data: UserData;
      token: string;
    }> => {
      const res = await fetch("/api/users/me", {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchMyVerification = async (
      provider_id: string
    ): Promise<{
      data: verificationRequests;
      token: string;
    }> => {
      const res = await fetch(`/api/verifications/${provider_id}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchTopProviderData = async (): Promise<{
      data: UserData[];
      token: string;
    }> => {
      const res = await fetch("/api/users/topProviders", {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchTopProvider = async () => {
      const { data: fetchData } = await fetchTopProviderData();
      setTopProviders(fetchData);
      setIsFetchingProvider(false);
    };

    const fetchUserData = async () => {
      const { data: fetchedUserData } = await fetchMyData();

      if (fetchedUserData) {
        const { data: res } = await fetchMyVerification(fetchedUserData.uid);
        setMyVerification(res);

        console.log(res);
      }

      setUserData(fetchedUserData);
    };

    fetchUserData();
    fetchTopProvider();
  }, []);

  function formatDateRange(endDateStr: string): string {
    const endDate = new Date(endDateStr);

    return endDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="hidden md:flex flex-col gap-6 ml-12">
      {userData ? (
        <div className="card  bg-neutral-800 bg-opacity-40 w-full border border-white border-opacity-20">
          <div className="card-body">
            <div className="flex flex-row gap-4">
              <div className="w-10 rounded-full mb-2">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userData?.profilePicture || "/mock_provider.jpeg"}
                  className="rounded-full"
                />
              </div>
              <h2 className="card-title mb-2">
                {userData?.username || "Username"}
              </h2>
            </div>
            <div className="flex flex-row gap-2">
              <div>Email : </div>
              <div className="text-opacity-60 text-white">
                {userData?.email || "user@gmail.com"}
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div>Member since : </div>
              <div className="text-opacity-60 text-white">
                {userData?.created_at
                  ? formatDateRange(userData.created_at)
                  : "1 Jan 2025"}
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div>Role : </div>
              {userData?.is_banned ? (
                <div className="text-opacity-60 text-white">
                  {userData?.isProvider ? (
                    <>
                      <div className="flex flex-row gap-2">
                        <div>Provider</div>

                        <div className="bg-red-600 bg-opacity-70 p-1 rounded-lg text-white font-bold text-xs">
                          Account is banned until{" "}
                          {formatDateRange(userData.ban_until)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row gap-2">
                      <div>Player</div>
                      <div className="bg-red-600 bg-opacity-70 p-1 rounded-lg text-white font-bold text-xs">
                        Account is banned until{" "}
                        {formatDateRange(userData.ban_until)}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-opacity-60 text-white">
                  {userData?.isProvider ? (
                    <>
                      <div className="flex flex-row gap-2">
                        <div>Provider</div>
                        {userData.is_verified ? (
                          <div className="bg-lime-400 bg-opacity-70 p-1 rounded-lg text-white font-bold text-xs">
                            Account verified ✓
                          </div>
                        ) : myVerification ? (
                          <div className="bg-sky-400 bg-opacity-70 p-1 rounded-lg text-white font-bold text-xs">
                            Waiting for verification
                          </div>
                        ) : (
                          <Link
                            href="/provider-form"
                            prefetch={true}
                            className="bg-amber-400 bg-opacity-70 p-1 rounded-lg text-white font-bold text-xs"
                          >
                            Verify your account ✎
                          </Link>
                        )}
                      </div>
                    </>
                  ) : (
                    "Player"
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
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
      <div className=" bg-black bg-opacity-10 py-8 px-2 rounded-t-md border-t border-opacity-10 border-white">
        <div className="mb-6 w-full ml-6 font-extrabold">Top 10 Providers</div>
        <table className="table ">
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
            {isFetchingProvider ? (
              <>
                <tr>
                  <th>
                    <label>1. </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 skeleton bg-black opacity-20 text-opacity-0 text-white">
                          <img src={"/mock_provider.jpeg"} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold skeleton bg-slate-500 opacity-10 text-opacity-0 text-white">
                          -------------------
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center opacity-0">32</td>
                </tr>
                <tr>
                  <th>
                    <label>2. </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 skeleton bg-black opacity-20 text-opacity-0 text-white">
                          <img src={"/mock_provider.jpeg"} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold skeleton bg-slate-500 opacity-10 text-opacity-0 text-white">
                          ----------------
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center opacity-0">32</td>
                </tr>
                <tr>
                  <th>
                    <label>3. </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 skeleton bg-black opacity-20 text-opacity-0 text-white">
                          <img src={"/mock_provider.jpeg"} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold skeleton bg-slate-500 opacity-10 text-opacity-0 text-white">
                          -----------------
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center opacity-0">32</td>
                </tr>
                <tr>
                  <th>
                    <label>4. </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 skeleton bg-black opacity-20 text-opacity-0 text-white">
                          <img src={"/mock_provider.jpeg"} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold skeleton bg-slate-500 opacity-10 text-opacity-0 text-white">
                          --------------
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center opacity-0">32</td>
                </tr>
                <tr>
                  <th>
                    <label>5. </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 skeleton bg-black opacity-20 text-opacity-0 text-white">
                          <img src={"/mock_provider.jpeg"} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold skeleton bg-slate-500 opacity-10 text-opacity-0 text-white">
                          -----------------
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center opacity-0">32</td>
                </tr>
              </>
            ) : (
              topProviders?.map((provider, index) => (
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
                  <td className="text-center">
                    {provider.rental_success.toString()}
                  </td>
                </tr>
              ))
            )}

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
