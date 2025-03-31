"use client";
import ProfileHeader from "@/components/profile/profile-header";
import User from "@/components/profile/user";
import Provider from "@/components/profile/provider";
import { useEffect, useState } from "react";
import { UserData } from "@/app/types/user";
import ProviderStat from "./provider-stat";
import { useRouter } from "next/navigation";
export default function ProfileDetail() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserData>();
  const [profile_url, setProfileURL] = useState(
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );
  const router = useRouter();

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

    async function fetchRequest() {
      const { data: res } = await fetchMyData();
      setData(res);
      if (res?.profilePicture) {
        setProfileURL(res.profilePicture);
      }
      if (!res) {
        router.push("/sign-in");
      }
      setLoading(false);
    }

    fetchRequest();
  }, []);
  console.log(data);

  if (loading || !data) {
    return (
      <>
        <div>Loading . . .</div>
      </>
    );
  } else {
    return (
      <main className="flex-1 flex flex-col gap-6 px-4 w-2/3">
        <div className="flex flex-col items-center justify-center font-bold w-full">
          <ProfileHeader user={data} />
          {data ? <div className="text-2xl mt-2">{data.username}</div> : null}
          {data ? (
            <div className="text-sm opacity-50 mt-1">{data.email}</div>
          ) : null}
          {data.isProvider && <ProviderStat user={data} />}
          {!data.isProvider ? <User user={data} /> : <Provider user={data} />}
        </div>
      </main>
    );
  }
}
