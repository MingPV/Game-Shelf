"use client";

import { NavbarGetStarted } from "@/components/navbar-getstart";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="z-20 fixed top-0 w-full">
        <NavbarGetStarted />
      </div>

      <div
        className="hero min-h-screen fixed left-0 top-0 z-10 "
        style={{
          backgroundImage: "url(/bg-1.jpg)",
        }}
      >
        <div className="hero-overlay bg-violet-950 bg-opacity-30"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-2xl">
            <h1 className="mb-2 text-5xl font-bold">Start exploring today</h1>
            <h1 className="mb-5 text-4xl font-bold">
              and bring the fun to your game nights!
            </h1>

            <p className="mb-5 text-neutral-200 opacity-40">
              Our platform connects board game enthusiasts, allowing customers
              to rent games, providers to share their collections, and admins to
              ensure a smooth experience.
            </p>
            {/* <button className="btn bg-rose-500 hover:bg-rose-900 hover:shadow-xl hover:shadow-stone-100">
              Get Started
            </button> */}
            <Link
              className="btn bg-rose-500 hover:bg-rose-900"
              href="/home"
              prefetch={true}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
