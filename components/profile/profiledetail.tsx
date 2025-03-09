"use client"
import Profile from "@/components/profile/profile";
import { getMyUserData } from "@/app/(user-pages)/actions";
import User from "@/components/profile/user";
import Provider from "@/components/profile/provider";
import { useEffect, useState } from "react";
import { UserData } from "@/app/types/user";

export default function ProfileDetail() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<UserData>();
    const [profile_url, setProfileURL] = useState("https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp")

    useEffect(() => {
    async function fetchRequest() {
        const res = await getMyUserData();
        setData(res);
        if (res?.profilePicture) {
            setProfileURL(res.profilePicture)
        }
        setLoading(false);
    }

    fetchRequest();
    }, []);

    return (
        <main className="flex-1 flex flex-col gap-6 px-4">
            {data ? (
                <div className="flex flex-col items-center justify-center font-bold">
                <Profile user={data}/>
                {
                    data ? (<div className="text-2xl mt-2">{data.username}</div>) : null
                }
                {
                    data ? <div className="text-sm opacity-50 mt-1">{data.email}</div> : null
                }
                {
                    !data.isProvider ? <User user={data}/> : <Provider user={data}/>
                }
                </div>
            ):null}
        </main>
    );
}
