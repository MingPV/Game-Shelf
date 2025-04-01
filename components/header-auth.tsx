"use client";

import { signOutAction } from "@/app/(auth-pages)/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { UserData } from "@/app/types/user";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const [myData, setMyData] = useState<UserData | null>(null);

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

    const fetchData = async () => {
      const { data: fetchData } = await fetchMyData();

      setMyData(fetchData);
    };
    fetchData();
  }, []);

  const handleSignOut = async () => {
    setMyData(null);
    router.push("/home");
    // signOutAction();
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.reload(); // บังคับโหลดใหม่เพื่อล้าง cache
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
              <Link href="/sign-in" prefetch={true}>
                Sign in
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up" prefetch={true}>
                Sign up
              </Link>
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
            <Link className="justify-between" href="/profile" prefetch={true}>
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link href="/account-settings" prefetch={true}>
              Settings
            </Link>
          </li>
          {myData.isProvider && !myData.is_admin ? (
            <li>
              <Link href="/income-history" prefetch={true}>
                Income History
              </Link>
            </li>
          ) : myData.is_admin ? null : (
            <>
              <li>
                <Link href="/my-rental" prefetch={true}>
                  My-Rental
                </Link>
              </li>
              <li>
                <Link href="/to-pay" prefetch={true}>
                  To-Pay
                </Link>
              </li>
            </>
          )}

          <li>
            <div
              className="hover:cursor-pointer bg-red-800 mt-4 flex flex-row justify-center"
              onClick={handleSignOut}
            >
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
          <Link href="/sign-in" prefetch={true}>
            Sign in
          </Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/sign-up" prefetch={true}>
            Sign up
          </Link>
        </Button>
      </div>
    </>
  );
}
