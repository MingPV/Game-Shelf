"use client";

import { selectVerificationRequest } from "@/app/(admin-pages)/actions";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function VerificationButton({
  provider_id,
}: {
  provider_id: string;
}) {
  const [sentVerifyReq, setSentVerifyReq] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await selectVerificationRequest(provider_id);
        if (req) setSentVerifyReq(req.status);
      } catch (error) {
        console.error("Error fetching verification request:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {sentVerifyReq === "pending" && (
        <div className="border rounded-md p-2 text-info border-info">
          Waiting For Verification
        </div>
      )}
      {sentVerifyReq === "verified" && (
        <div className="border rounded-md p-2 text-green-400 border-green-400">
          Verification Completed!
        </div>
      )}
      {sentVerifyReq === "" && (
        <div className="flex flex-col items-center">
          <Link className="btn btn-outline btn-primary" href="/provider-form">
            Request For Verification
          </Link>
          <div className="font-normal text-gray-400 pt-2">
            If you have already submitted the form.
          </div>
          <div className="font-normal text-gray-400">
            Try refreshing the page.
          </div>
        </div>
      )}
    </div>
  );
}
