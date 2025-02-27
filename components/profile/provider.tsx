import ProviderForm from "./providerform";
import { UserData } from "@/app/types/user";

export default async function User({user}:{user:UserData}) {

    return (
        <main className="flex flex-row m-4">
            <ul className="menu w-56 bg-white bg-opacity-10 rounded-xl mb-auto">
                <li className="menu-title text-xl">Account</li>
                <li><a className="active">My Profile</a></li>
                <li><a className="">My Business</a></li>
                <li><a className="">My Inventory</a></li>
                <li><a className="">My Dashboard</a></li>
                <li><a className="">My Payment</a></li>
            </ul>
            <ProviderForm user={user}/>
        </main>
    );
}