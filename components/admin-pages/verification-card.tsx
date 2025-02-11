"use client";

import Image from "next/image";
import mock_provider from "../../public/mock_provider.jpeg";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { verificationRequests } from "@/app/types/user";
import {
  updateVerificationRequest,
  deleteVerificationRequest,
} from "../../app/(admin-pages)/actions";
import { Suspense, useEffect, useState } from "react";

export default function VerificationCard({
  params,
  admin_id,
  onRemove,
}: {
  params: verificationRequests;
  admin_id: number;
  onRemove: (provider_id: string) => void;
}) {
  const [profileURL, setProfileURL] = useState("/mock_provider.jpeg");

  const handleDeny = () => {
    onRemove(params.provider_id);
    const formData = new FormData();
    formData.append("provider_id", params.provider_id);
    deleteVerificationRequest(formData);
  };

  const handleAccept = () => {
    onRemove(params.provider_id);
    const formData = new FormData();
    formData.append("provider_id", params.provider_id);
    formData.append("status", "verified");
    formData.append("admin_id", admin_id.toString());
    updateVerificationRequest(formData);
  };

  useEffect(() => {
    if (params.users.profilePicture) {
      setProfileURL(params.users.profilePicture);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center rounded-sm border border-white border-opacity-60 p-4 w-full">
      <div className="flex justify-between items-center pb-2">
        <div className="flex gap-2 items-center font-bold">
          <div className="flex relative h-7 w-7 rounded-full">
            <img
              alt="provider profile"
              src={profileURL}
              sizes="28px"
              className="rounded-full"
            />
          </div>
          {params.users.username}
        </div>
        {new Date(params.created_at).toLocaleString()}
      </div>
      <div>
        {" "}
        <span className="font-bold pr-1">Email:</span> {params.users.email}{" "}
      </div>
      <div>
        {" "}
        <span className="font-bold pr-1">Phone:</span>{" "}
        {params.users.phoneNumber}{" "}
      </div>
      <div>
        {" "}
        <span className="font-bold pr-1">Location:</span>{" "}
        {params.users.location}{" "}
      </div>
      <div>
        {" "}
        <span className="font-bold pr-1">Payment Method:</span>{" "}
        {params.users.paymentMethod}{" "}
      </div>
      <div>
        {" "}
        <span className="font-bold pr-1">Credential:</span>{" "}
        <a
          className="btn btn-xs text-slate-900 btn-info text-sm opacity-90"
          href={params.users.credentials}
        >
          {" "}
          {/* {params.users.credentials}{" "} */}
          download {"⤓"}
        </a>
      </div>

      <div className="flex gap-2 pt-4">
        <button className="btn btn-outline btn-sm" onClick={handleDeny}>
          <FaXmark />
          Denied
        </button>
        <button className="btn btn-success btn-sm" onClick={handleAccept}>
          <FaCheck />
          Accept
        </button>
      </div>
    </div>
  );
}
