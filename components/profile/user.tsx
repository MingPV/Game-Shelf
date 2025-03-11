"use client";
import UserForm from "./userform";
import { UserData } from "@/app/types/user";
import { useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import GotoPage from "./goto-from-sidebar";
import { MdPayment } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

export default function User({ user }: { user: UserData }) {
  const [window, setWindow] = useState("profile");
  return (
    <main className="flex-row p-4 flex md:grid md:grid-cols-4 w-full">
      <ul className="hidden md:grid col-span-1 menu bg-white bg-opacity-10 rounded-xl ml-auto mb-auto w-full">
        <li className="menu-title text-xl">Account</li>
        <li>
          <a
            onClick={() => setWindow("profile")}
            className={`${window == "profile" ? "active" : ""} block `}
          >
            <div className="flex flex-row justify-between items-center w-full">
              <p>My Profile</p>
              <span className={`${window == "profile" ? "block" : "hidden"}`}>
                <IoIosArrowForward className="text-white" />
              </span>
            </div>
          </a>
        </li>
        {/* <li><a onClick={()=>setWindow('fav')} className={`${window == "fav" ? "active" : ""}`}>My favourite</a></li> */}
        <li>
          <a
            onClick={() => setWindow("rental")}
            className={`${window == "rental" ? "active" : ""} block`}
          >
            <div className="flex flex-row justify-between items-center w-full">
              <p>My Rental</p>
              <span className={`${window == "rental" ? "block" : "hidden"}`}>
                <IoIosArrowForward className="text-white" />
              </span>
            </div>
          </a>
        </li>
        <li>
          <a
            onClick={() => setWindow("to-pay")}
            className={`${window == "to-pay" ? "active" : ""}  block`}
          >
            <div className="flex flex-row justify-between items-center w-full">
              <p>To Pay</p>
              <span className={`${window == "to-pay" ? "block" : "hidden"}`}>
                <IoIosArrowForward className="text-white" />
              </span>
            </div>
          </a>
        </li>
      </ul>
      <div className="col-span-3">
        {window == "profile" ? (
          <UserForm user={user} setWindow={setWindow} />
        ) : null}
        {window == "rental" ? (
          <GotoPage
            icon={<FaRegListAlt />}
            type="rental"
            announce="you can see your rental history in my-rental page"
            topage="/my-rental"
            setWindow={setWindow}
          />
        ) : null}
        {window == "to-pay" ? (
          <GotoPage
            icon={<MdPayment />}
            type="to-pay"
            announce="you can pay for your rental boardgame at To-Pay page"
            topage="/to-pay"
            setWindow={setWindow}
          />
        ) : null}
      </div>
    </main>
  );
}
