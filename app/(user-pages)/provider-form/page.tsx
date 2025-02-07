"use client";

import { useState, useEffect } from "react";
// import Link from "next/link";
// import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { updateProviderAction } from "../actions";
import { addVerificationRequest } from "@/app/(admin-pages)/actions";

export default function Signup() {
  // const [isProvider, setIsProvider] = useState<boolean | null>(null);
  // const [error, setError] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [location, setLocation] = useState("");
  // const [paymentMethod, setPaymentMethod] = useState("");
  // const [credentials, setCredential] = useState("");

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [isEmailUnique, setIsEmailUnique] = useState<boolean | null>(null);
  // const [isUsernameUnique, setIsUsernameUnique] = useState<boolean | null>(
  //   null
  // );

  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState("");

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
                        name="phone_number" 
                        pattern="0\d-\d{3}-\d{4}|0\d{2}-\d{3}-\d{4}"
                        placeholder="0X-XXX-XXXX or 0XX-XXX-XXXX" 
                        required 
                    />

                    <Label htmlFor="location">Location *</Label>
                    <Input name="location" placeholder="Location" required />

                    <Label htmlFor="payment_method">Payment Method *</Label>
                    <Input name="payment_method" placeholder="Payment Method" required />

                    <Label htmlFor="credentials">Creadentials *</Label>
                    <input name="credentials" type="file" required />
                    
                    <button
                        type="submit"
                        className="btn bg-gs_black hover:bg-gs_black hover:bg-opacity-60 hover:border-none"
                    >
                        Submit
                    </button>
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
