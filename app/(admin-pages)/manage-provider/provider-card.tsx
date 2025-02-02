import Image from "next/image";
import mock_provider from "../../../public/mock_provider.jpeg";
import { FaCheck, FaXmark  } from "react-icons/fa6";

interface userData {
    uid: string;
    email: string;
    username: string;
    profilePicture: string;
    phoneNumber: string;
    paymentMethod: string;
    isProvider: boolean;
    is_verified: boolean;
    is_disabled: boolean;
    location: string;
    credentials: string;
    maxQuota: number;
    created_at: string;
    admin_id: Number;
    is_admin: boolean;
}

export default function ProviderCard({params} : {params: userData}) {

  return (
    <div className="flex flex-col justify-center rounded-sm border border-white border-opacity-60 p-4">
        <div className="flex justify-between items-center pb-2">
            <div className="flex gap-2 items-center font-bold">
                <div className="flex h-6 w-6 relative rounded-full">
                    <Image alt="provider profile" src={mock_provider} fill className="rounded-full" />
                </div>
                { params.username }
            </div>
            { params.created_at }
        </div>
        <div> <span className="font-bold pr-1">Email:</span> { params.email } </div>
        <div> <span className="font-bold pr-1">Phone:</span> { params.phoneNumber } </div>
        <div> <span className="font-bold pr-1">Location:</span> { params.location } </div>
        <div> <span className="font-bold pr-1">Payment Method:</span> { params.paymentMethod } </div>
        <div> <span className="font-bold pr-1">Credential:</span> { params.credentials } </div>
    
        <div className="flex gap-2 pt-4">
            <button className="btn btn-outline btn-sm">
                <FaXmark />
                Denied
            </button>
            <button className="btn btn-success btn-sm">
                <FaCheck />
                Accept
            </button>
        </div>
    
    </div>
  );
}
