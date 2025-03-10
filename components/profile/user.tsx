"use client"
import UserForm from "./userform";
import { UserData } from "@/app/types/user";
import { useState } from "react";
import UserBlankform from "./blankform";
import Blankform from "./blankform";

export default function User({user}:{user:UserData}) {
    const [window, setWindow] = useState("profile");
    return (
        <main className="flex flex-row m-4">
            <ul className="menu hidden md:block w-[180px] bg-white bg-opacity-10 rounded-xl ml-auto mb-auto">
                <li className="menu-title text-xl">Account</li>
                <li><a onClick={()=>setWindow('profile')} className={`${window == "profile" ? "active" : ""}`}>My Profile</a></li>
                <li><a onClick={()=>setWindow('fav')} className={`${window == "fav" ? "active" : ""}`}>My favourite</a></li>
                <li><a onClick={()=>setWindow('rental')} className={`${window == "rental" ? "active" : ""}`}>My Rental</a></li>
                <li><a onClick={()=>setWindow('wallet')} className={`${window == "wallet" ? "active" : ""}`}>My Wallet</a></li>
            </ul>
            {
                window == "profile" ? (<UserForm user={user} setWindow={setWindow}/>):null
            }
            {
                window != "profile" ? (<Blankform type={'user'} setWindow={setWindow}/>):null
            }
        </main>
    );
}