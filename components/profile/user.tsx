"use client"
import UserForm from "./userform";
import { UserData } from "@/app/types/user";
import { useState } from "react";
import UserBlankform from "./userblankform";

export default function User({user}:{user:UserData}) {
    const [window, setWindow] = useState("profile");
    return (
        <main className="flex flex-row m-4">
            <ul className="menu hidden md:block w-56 bg-white bg-opacity-10 rounded-xl mb-auto">
                <li className="menu-title text-xl">Account</li>
                <li><button onClick={()=>setWindow('profile')} className={`${window == "profile" ? "active" : ""}`}>My Profile</button></li>
                <li><button onClick={()=>setWindow('fav')} className={`${window == "fav" ? "active" : ""}`}>My favourite</button></li>
                <li><button onClick={()=>setWindow('rental')} className={`${window == "rental" ? "active" : ""}`}>My Rental</button></li>
                <li><button onClick={()=>setWindow('wallet')} className={`${window == "wallet" ? "active" : ""}`}>My Wallet</button></li>
            </ul>
            {
                window == "profile" ? (<UserForm user={user} setWindow={setWindow}/>):null
            }
            {
                window != "profile" ? (<UserBlankform setWindow={setWindow}/>):null
            }
        </main>
    );
}