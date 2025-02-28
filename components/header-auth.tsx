"use client";

import { signOutAction } from "@/app/(auth-pages)/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { UserData } from "@/app/types/user";
import { getMyUserData } from "@/app/(user-pages)/actions";

export default function AuthButton() {
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // let profile_url =
  //   "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  // const { data: user_data, error } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("uid", user?.id);

  // let isProvider = false;

  // if (user_data) {
  //   if (user_data[0].profilePicture) {
  //     profile_url = user_data[0].profilePicture;
  //   }
  //   if (user_data[0].isProvider) {
  //     isProvider = true;
  //   }
  // }

  const [myData, setMyData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchData = await getMyUserData();

      setMyData(fetchData);
    };
    fetchData();
  }, []);

  const handleSignOut = async () => {
    setMyData(null);
    signOutAction();
  };

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return myData ? (
    <div className="flex items-center gap-4">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={myData.profilePicture || "mock_provider.jpeg"}
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link className="justify-between" href="/profile">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link href="/account-settings">Settings</Link>
          </li>
          {myData.isProvider ? (
            <li>
              <Link href="/boardgame-tracking">My boardgames</Link>
            </li>
          ) : null}

          <li>
            <div className="hover:cursor-pointer" onClick={handleSignOut}>
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <>
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
      <button onClick={() => console.log(myData)}>test{myData}</button>
    </>
  );
}
