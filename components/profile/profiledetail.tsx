"use client";
import Profile from "@/components/profile/profile";
import { getMyUserData } from "@/app/(user-pages)/actions";
import User from "@/components/profile/user";
import Provider from "@/components/profile/provider";
import { useEffect, useState } from "react";
import { UserData } from "@/app/types/user";
import ProviderStat from "./provider-stat";
export default function ProfileDetail() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserData>();
  const [profile_url, setProfileURL] = useState(
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );

  useEffect(() => {
    async function fetchRequest() {
      const res = await getMyUserData();
      setData(res);
      if (res?.profilePicture) {
        setProfileURL(res.profilePicture);
      }
      setLoading(false);
    }

    fetchRequest();
  }, []);
  console.log(data);

  return (
    <main className="flex-1 flex flex-col gap-6 px-4 w-2/3">
      {data ? (
        <div className="flex flex-col items-center justify-center font-bold w-full">
          <Profile user={data} />
          {data ? <div className="text-2xl mt-2">{data.username}</div> : null}
          {data ? (
            <div className="text-sm opacity-50 mt-1">{data.email}</div>
          ) : null}
          {data.isProvider && <ProviderStat user={data} />}
          {!data.isProvider ? <User user={data} /> : <Provider user={data} />}
        </div>
      ) : null}
    </main>
  );
}
