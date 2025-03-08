"use client"
import { Dispatch, SetStateAction } from "react"
export default function ProviderBlankform({setWindow}:{setWindow:Dispatch<SetStateAction<string>>}) {
    return (
        <>
            <div className="bg-white bg-opacity-10 ml-4 rounded-xl p-4 flex-col flex justify-center items-center">
                <div className="flex justify-between items-center w-full flex-col">
                    <details className="dropdown md:hidden self-start">
                        <summary className="btn p-0 border-0 bg-white bg-opacity-0"><svg
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
                                </svg></summary>
                        <ul className="menu dropdown-content bg-base-100 isolation rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><button onClick={()=>setWindow('profile')} >My Profile</button></li>
                            <li><button onClick={()=>setWindow('business')} >My Business</button></li>
                            <li><button onClick={()=>setWindow('inventory')} >My Inventory</button></li>
                            <li><button onClick={()=>setWindow('dashboard')} >My Dashboard</button></li>
                            <li><button onClick={()=>setWindow('payment')} >My payment</button></li>
                        </ul>
                    </details>
                </div>
                <div className="text-center">Only BlankForm Not Implemented Yet. </div>
            </div>
        </>
    )
}