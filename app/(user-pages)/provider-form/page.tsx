"use client";

import { useState, useEffect } from "react";
// import Link from "next/link";
// import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { updateProviderAction } from "../actions";
import { addVerificationRequest, selectVerificationRequest } from "@/app/(admin-pages)/actions";
import { useRouter } from "next/navigation";

export default function ProviderForm() {

  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchUserId() {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        setError("Failed to fetch user data.");
        return;
      }

      setUserId(user.id);
    }

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId === "") return; 

    async function fetchReqData() {
      try {
        const req = await selectVerificationRequest(userId);
        if (req) {
          console.log("uid:", userId)
          console.log("req:", req);
          router.push("/")
        }
      } catch (error) {
        console.error("Error fetching verification request:", error);
      }
    }

    fetchReqData();
  }, [userId]); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setError("");
    const formDataUser = new FormData(event.currentTarget);
    if (userId) {
      formDataUser.append("userId", userId);
      updateProviderAction(formDataUser);

      const formDataVerifyReq = new FormData();
      formDataVerifyReq.append("provider_id", userId);
      addVerificationRequest(formDataVerifyReq);
    }
  };

  return (
    <div className="flex justify-center items-center w-full pt-4">
        <div className="card bg-gray-400 bg-opacity-30 w-11/12 md:w-3/5 shadow-2xl">
            <div className="card-body gap-7">
                <h1 className="flex justify-center text-2xl font-medium">Request For Provider Verification Form</h1>

                <form
                    className="flex flex-col min-w-64 gap-5 placeholder:text-gs_white"
                    onSubmit={handleSubmit}
                >
                    <Label htmlFor="profile_image">Profile Image</Label>
                    <input name="profile_image" type="file" accept="image/*" />

                    <Label htmlFor="phone_number">Phone Number *</Label>
                    <Input 
                        className="placeholder:text-gray-300"
                        name="phone_number" 
                        pattern="0\d-\d{3}-\d{4}|0\d{2}-\d{3}-\d{4}"
                        placeholder="0X-XXX-XXXX or 0XX-XXX-XXXX" 
                        required 
                    />

                    <Label htmlFor="location">Location *</Label>
                    <Input className="placeholder:text-gray-300" name="location" placeholder="Location" required />

                    <Label htmlFor="payment_method">Payment Method *</Label>
                    <Input className="placeholder:text-gray-300" name="payment_method" placeholder="Payment Method" required />

                    <Label htmlFor="credentials">Creadentials *</Label>
                    <input name="credentials" type="file" required />
                    
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="btn rounded-full bg-gs_purple_gradient hover:bg-opacity-60 border-none w-min px-16"
                        >
                            Submit
                        </button>
                    </div>

                    {error.length > 0 && (
                    <div className="text-red-500">
                        <p>{error}</p>
                    </div>
                    )}
                </form>
            </div>
        </div>
    </div>
  );
}
