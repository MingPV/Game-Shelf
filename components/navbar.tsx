"use client";

import { useState } from "react";
import AuthButton from "./header-auth";
import NotificationInNavbar from "./notification/notification-in-navbar";
import Link from "next/link";

export const Navbar = () => {
  const [error, setError] = useState("");

  return (
    <>
      <div className="navbar bg-transparent z-[99]">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/home" prefetch={true}>
            GameShelf
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="flex flex-row  items-center justify-center">
            <div className="hidden flex-row  items-center justify-center lg:flex">
              <ul className="menu menu-horizontal md:px-1">
                <li className="">
                  <Link href="/home" prefetch={true}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/games" prefetch={true}>
                    Boardgame
                  </Link>
                </li>
                <li>
                  <Link href="/providers" prefetch={true}>
                    Provider
                  </Link>
                </li>
                <li>
                  <Link href="/report-form" prefetch={true}>
                    Report
                  </Link>
                </li>
                <li>
                  <Link href="/contact" prefetch={true}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-row  items-center justify-center  lg:mx-8 md:mx-4 mx-2">
              <div className="dropdown dropdown-hover lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                  Menu
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu gap-2 border border-neutral-500 bg-transparent  rounded-box z-[1] w-44 md:w-52 p-2 shadow pb-12 pt-4"
                >
                  <li className="border-b-[0.1px]">
                    <Link href="/home" prefetch={true}>
                      ➙ Home
                    </Link>
                  </li>
                  <li className="border-b-[0.1px]">
                    <Link href="/games" prefetch={true}>
                      ➙ Boardgame{" "}
                    </Link>
                  </li>
                  <li className="border-b-[0.1px]">
                    <Link href="/providers" prefetch={true}>
                      ➙ Provider{" "}
                    </Link>
                  </li>
                  <li className="border-b-[0.1px]">
                    <Link href="/report-form" prefetch={true}>
                      ➙ Report{" "}
                    </Link>
                  </li>
                  <li className="border-b-[0.1px]">
                    <Link href="/contact" prefetch={true}>
                      ➙ Contact{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-row gap-4 mt-2 hidden md:flex">
              <NotificationInNavbar />
              {/* <Link href="/to-pay" prefetch={true}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link> */}
            </div>
            <ul className="hidden sm:menu menu-horizontal px-1 mx-3 ">
              <li className="border rounded-xl">
                <details>
                  <summary className="px-6 rounded-xl">Wallet</summary>
                  <ul className="bg-base-100 rounded-t-none ">
                    <li className="px-8 py-4 ">0 Bath</li>
                    <li
                      className="px-8 btn"
                      onClick={() => setError("coming soon")}
                    >
                      Add money
                    </li>
                    <li
                      className={`px-8 text-red-500 text-xs text-start mt-2 ${error ? "" : "hidden"}`}
                    >
                      {error}
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <AuthButton />
        </div>
      </div>
    </>
  );
};
