"use client";

import { Suspense, useEffect, useState } from "react";
import VerificationCard from "@/components/admin-pages/verification-card";
import { verificationRequests } from "@/app/types/user";
import { selectAllUnverifiedVerificationRequest } from "@/app/(admin-pages)/actions";
import LoadingCard from "./loading-card";

export default function VerificationList({ adminId }: { adminId: number }) {
  const [requests, setRequests] = useState<verificationRequests[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await selectAllUnverifiedVerificationRequest();
      setRequests(res || []);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleRemove = async (provider_id: string) => {
    setRequests((prev) =>
      prev.filter((req) => req.provider_id !== provider_id)
    );
  };

  return (
    <>
      <main className="flex-1 flex flex-col items-center gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center w-10/12">
          <div className="text-2xl font-bold pb-2">Manage Provider Page</div>
          <div className="flex flex-col bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full mb-4">
            <div className="text-lg pb-4 font-bold">
              Provider Verification Requests
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
              {requests.length > 0 ? (
                requests?.map(
                  (item) =>
                    adminId && (
                      <VerificationCard
                        key={item.provider_id}
                        params={item}
                        admin_id={adminId}
                        onRemove={handleRemove}
                      />
                    )
                )
              ) : isLoading ? (
                <>
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                </>
              ) : (
                <p>No verification requests</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
