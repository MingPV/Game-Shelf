"use client";
import ProviderForm from "./providerform";
import { UserData } from "@/app/types/user";
import { useState } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import GotoPage from "./goto-from-sidebar";
import { GrGamepad } from "react-icons/gr";
import { CiViewList } from "react-icons/ci";

export default function Provider({ user }: { user: UserData }) {
  const [window, setWindow] = useState("profile");

  const announeText = {
    inventory: "You can see your own boardgame in indevtory page",
    dashboard: "You can see your boardgame status in dashboard page",
    income: "You can see your income in income-history page",
  };

  return (
    <main className="flex-row p-4 flex md:grid md:grid-cols-4 w-full ">
      <ul className="hidden md:grid col-span-1 menu bg-white bg-opacity-10 rounded-xl ml-auto mb-auto w-full">
        <li className="menu-title text-xl">Account</li>
        <li>
          <a
            onClick={() => setWindow("profile")}
            className={`${window == "profile" ? "active" : ""}`}
          >
            My Profile
          </a>
        </li>

        <li>
          <a
            onClick={() => setWindow("inventory")}
            className={`${window == "inventory" ? "active" : ""}`}
          >
            My Inventory
          </a>
        </li>
        <li>
          <a
            onClick={() => setWindow("dashboard")}
            className={`${window == "dashboard" ? "active" : ""}`}
          >
            My Dashboard
          </a>
        </li>
        <li>
          <a
            onClick={() => setWindow("income")}
            className={`${window == "income" ? "active" : ""}`}
          >
            My income
          </a>
        </li>
      </ul>
      <div className="col-span-3">
        {window == "profile" ? (
          <ProviderForm user={user} setWindow={setWindow} />
        ) : null}
        {/* {window != "profile" ? (
          <Blankform type={"provider"} setWindow={setWindow} />
        ) : null} */}
        {window == "inventory" ? (
          <GotoPage
            type="inventory"
            icon={<GrGamepad />}
            announce={announeText.inventory}
            topage="/inventory"
            setWindow={setWindow}
          />
        ) : null}
        {window == "dashboard" ? (
          <GotoPage
            type="dashboard"
            icon={<CiViewList />}
            announce={announeText.dashboard}
            topage="/dashboard"
            setWindow={setWindow}
          />
        ) : null}
        {window == "income" ? (
          <GotoPage
            type="income"
            icon={<FaMoneyBillTrendUp />}
            announce={announeText.income}
            topage="/income-history"
            setWindow={setWindow}
          />
        ) : null}
      </div>
    </main>
  );
}
