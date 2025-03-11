"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UserData } from "@/app/types/user";
import { updateUserAction } from "@/app/(user-pages)/actions";
import { RiEdit2Line } from "react-icons/ri";

export default function ProfileUsernameForm({
  user,
  setWindow,
}: {
  user: UserData;
  setWindow: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <div className="bg-white bg-opacity-10 ml-4 rounded-xl p-4 flex-col flex justify-center items-center">
        <div className="flex justify-between items-center w-full ">
          <details className="dropdown md:hidden">
            <summary className="btn p-0 border-0 bg-white bg-opacity-0">
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
            </summary>
            <ul className="menu dropdown-content bg-base-100 isolation rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <button onClick={() => setWindow("profile")}>Profile</button>
              </li>

              <li>
                <button onClick={() => setWindow("rental")}>Boardgames</button>
              </li>
              <li>
                <button onClick={() => setWindow("to-pay")}>Review</button>
              </li>
            </ul>
          </details>
        </div>

        <div className="grid grid-cols-11 gap-5 w-full">
          <Label htmlFor="id" className="font-bold md:text-md col-span-3  py-3">
            ID :
          </Label>
          <p
            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent `}
          >
            {user.uid}
          </p>
          <Label
            htmlFor="username"
            className="font-bold md:text-md col-span-3  py-3 "
          >
            Username :
          </Label>
          <p
            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent `}
          >
            {user.username}
          </p>

          <Label
            htmlFor="email"
            className="font-bold md:text-md col-span-3  py-3"
          >
            E-mail :
          </Label>
          <p
            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent `}
          >
            {user.email}
          </p>
          <Label
            htmlFor="phoneNumber"
            className="font-bold md:text-md col-span-3  py-3"
          >
            Phone Number :
          </Label>
          <p
            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent `}
          >
            {user.phoneNumber}
          </p>
          <Label
            htmlFor="location"
            className="font-bold md:text-md col-span-3  py-3"
          >
            Location :
          </Label>
          <p
            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent `}
          >
            {user.location}
          </p>
        </div>
      </div>
    </>
  );
}
