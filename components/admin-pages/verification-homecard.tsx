import { selectUserById } from "@/app/(user-pages)/actions";
import { UserData, verificationRequests } from "@/app/types/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerificationHomeCard({
  verification,
}: {
  verification: verificationRequests;
}) {
  const [provider, setProvider] = useState<UserData>();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await selectUserById(verification.provider_id);
      setProvider(res[0] || null);
    };

    fetchUser();
  }, []);

  if (provider) {
    return (
      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
        <div className="text-sm text-white/50">
          Request from {provider?.username}
        </div>
        <Link
          className="bg-white/10 p-2 rounded-md text-sm w-20 flex justify-center hover:bg-white/20 transition-all duration-300"
          href={"/manage-provider"}
        >
          Manage
        </Link>
      </div>
    );
  } else {
    return (
      <div className="p-4 border border-white/10 bg-black/10 flex flex-row justify-between items-center">
        <div className="text-sm text-white/10">Loading</div>
      </div>
    );
  }
}
