import { Dispatch, SetStateAction } from "react"

export default function IconMenu({type, setWindow}:{type:string, setWindow:Dispatch<SetStateAction<string>>}){
    return (
        <details className="dropdown md:hidden self-start">
            <summary className="btn p-0 bg-opacity-0 border-0"><svg
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
            {
                type === 'user' ? (<ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li className="bg-opacity-100"><button onClick={()=>setWindow('profile')} >My Profile</button></li>
                    <li><button onClick={()=>setWindow('fav')} >My Favourite</button></li>
                    <li><button onClick={()=>setWindow('rental')} >My Rental</button></li>
                    <li><button onClick={()=>setWindow('wallet')} >My Wallet</button></li>
                </ul>):
                (<ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-sm">
                    <li className="bg-opacity-100"><button onClick={()=>setWindow('profile')} >My Profile</button></li>
                    <li className="bg-opacity-100"><button onClick={()=>setWindow('business')} >My Business</button></li>
                    <li className="bg-opacity-100"><button onClick={()=>setWindow('inventory')} >My Inventory</button></li>
                    <li className="bg-opacity-100"><button onClick={()=>setWindow('dashboard')} >My Dashboard</button></li>
                    <li className="bg-opacity-100"><button onClick={()=>setWindow('payment')} >My payment</button></li>
                </ul>)
            }
        </details>
    )
}