"use client";

import Link from "next/link";

export const NavbarGetStarted = () => {
  return (
    <>
      <div className="navbar bg-transparent">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/home">
            GameShelf
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="flex flex-row  items-center justify-center">
            <div className="hidden flex-row  items-center justify-center lg:flex mr-16">
              <ul className="menu menu-horizontal md:px-1 gap-8">
                <li className="">
                  <Link href="/home">Home</Link>
                </li>
                <li>
                  <Link href="/games">Boardgame</Link>
                </li>
                <li>
                  <Link href="/providers">Provider</Link>
                </li>
                <li>
                  <Link href="/support">Support</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
