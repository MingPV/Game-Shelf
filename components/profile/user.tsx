import UserForm from "./userform";
import { UserData } from "@/app/types/user";

export default async function User({user}:{user:UserData}) {

    return (
        <main className="flex flex-row m-4">
            <ul className="menu w-56 bg-white bg-opacity-10 rounded-xl mb-auto">
                <li className="menu-title text-xl">Account</li>
                <li><a className="active">My Profile</a></li>
                <li><a className="">My Favourite</a></li>
                <li><a className="">My Rental</a></li>
                <li><a className="">My Wallet</a></li>
            </ul>
            <UserForm user={user}/>
        </main>
    );
}