"use client"
import ProviderForm from "./providerform";
import { UserData } from "@/app/types/user";
import { useState } from "react";
import Blankform from "./blankform";

export default function Provider({user}:{user:UserData}) {
    const [window, setWindow] = useState("profile");
    return (
        <main className="flex-row m-4 flex md:grid md:grid-cols-3">
            <ul className="hidden md:block menu w-[180px] bg-white bg-opacity-10 rounded-xl ml-auto mb-auto">
                <li className="menu-title text-xl">Account</li>
                <li><a onClick={()=>setWindow('profile')} className={`${window == "profile" ? "active" : ""}`}>My Profile</a></li>
                <li><a onClick={()=>setWindow('business')} className={`${window == "business" ? "active" : ""}`}>My Business</a></li>
                <li><a onClick={()=>setWindow('inventory')} className={`${window == "inventory" ? "active" : ""}`}>My Inventory</a></li>
                <li><a onClick={()=>setWindow('dashboard')} className={`${window == "dashboard" ? "active" : ""}`}>My Dashboard</a></li>
                <li><a onClick={()=>setWindow('payment')} className={`${window == "payment" ? "active" : ""}`}>My payment</a></li>
            </ul>
            {
                window == "profile" ? (<ProviderForm user={user} setWindow={setWindow}/>):null
            }
            {
                window != "profile" ? (<Blankform type={'provider'} setWindow={setWindow}/>):null
            }
        </main>
    );
}