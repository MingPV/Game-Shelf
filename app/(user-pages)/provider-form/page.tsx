"use client";

import { useState, useEffect } from "react";
// import Link from "next/link";
// import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { updateProviderAction } from "../actions";

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
    const formData = new FormData(event.currentTarget);
    if (userId) {
      formData.append("userId", userId);
      updateProviderAction(formData);
    }

    // if (!email || !/\S+@\S+\.\S+/.test(email)) {
    //   setError("Valid email is required");
    //   return;
    // }

    // if (!username) {
    //   setError("Username is required");
    //   return;
    // }

    // if (!password || password.length < 6) {
    //   setError("Password must be at least 6 characters long");
    //   return;
    // }

    // if (isProvider === null) {
    //   setError("Please select a role");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("email", email);
    // formData.append("password", password);
    // formData.append("isProvider", isProvider.toString());
    // signUpAction(formData);
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
                    <input name="profile_image" type="file" />

                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input name="phone_number" placeholder="Phone Number" required />

                    <Label htmlFor="location">Location</Label>
                    <Input name="location" placeholder="Location" required />

                    <Label htmlFor="payment_method">Payment Method</Label>
                    <Input name="payment_method" placeholder="Payment Method" required />

                    <Label htmlFor="credentials">Creadentials</Label>
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
