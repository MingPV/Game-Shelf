"use client";

import { useEffect, useState } from "react";
import VerificationCard from "@/components/admin-pages/verification-card";
import { createClient } from "@/utils/supabase/client";
import { verificationRequests } from "@/app/types/user";
import { selectAllVerificationRequest } from "@/app/(admin-pages)/actions";

export default function VerificationList() {
    const [adminId, setAdminId] = useState<number | null>(null);
    const [requests, setRequests] = useState<verificationRequests[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: userData, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("uid", user.id)
                    .single();

                if (userData && userData.is_admin) {
                    setAdminId(userData.admin_id);

                    const res = await selectAllVerificationRequest();

                    setRequests(res || []);
                    setIsLoading(false);
                }
            }
        }
        fetchData();
    }, []);

    const handleRemove = async (provider_id: string) => {
        setRequests((prev) => prev.filter((req) => req.provider_id !== provider_id));
    };

    return (
        <div className="flex flex-col bg-white bg-opacity-10 mt-4 p-4 rounded-md w-full">
            <div className="text-lg pb-4 font-bold">Provider Verification Requests</div>
            <div className="flex flex-col gap-4 w-full items-center">
                {requests.length > 0 ? (
                    requests.map((item) => (
                        adminId && <VerificationCard key={item.provider_id} params={item} admin_id={adminId} onRemove={handleRemove} />
                    ))
                ) : (
                    (isLoading ? <p>Loading ...</p> : <p>No verification requests</p>)
                )}
            </div>
        </div>
    );
}
