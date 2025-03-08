"use client"
import ProviderForm from "./providerform";
import { UserData } from "@/app/types/user";
import { useState } from "react";
import ProviderBlankform from "./providerblankform";

export default function Provider({user}:{user:UserData}) {
    const [window, setWindow] = useState("profile");
    return (
        <main className="flex flex-row m-4">
            <ul className="hidden md:block menu w-56 bg-white bg-opacity-10 rounded-xl mb-auto">
                <li className="menu-title text-xl">Account</li>
                <li><button onClick={()=>setWindow('profile')} className={`${window == "profile" ? "active" : ""}`}>My Profile</button></li>
                <li><button onClick={()=>setWindow('business')} className={`${window == "business" ? "active" : ""}`}>My Business</button></li>
                <li><button onClick={()=>setWindow('inventory')} className={`${window == "inventory" ? "active" : ""}`}>My Inventory</button></li>
                <li><button onClick={()=>setWindow('dashboard')} className={`${window == "dashboard" ? "active" : ""}`}>My Dashboard</button></li>
                <li><button onClick={()=>setWindow('payment')} className={`${window == "payment" ? "active" : ""}`}>My payment</button></li>
            </ul>
            {
                window == "profile" ? (<ProviderForm user={user} setWindow={setWindow}/>):null
            }
            {
                window != "profile" ? (<ProviderBlankform setWindow={setWindow}/>):null
            }
        </main>
    );
}