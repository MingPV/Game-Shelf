"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateProviderAction } from "@/app/(user-pages)/actions";
import { addVerificationRequest } from "@/app/(admin-pages)/actions";
import { UserData } from "@/app/types/user";

export default function ProviderFormCard() {
  const [myData, setMyData] = useState<UserData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const formDataUser = new FormData(event.currentTarget);

    if (myData) {
      formDataUser.append("userId", myData.uid);
      formDataUser.append("payment_method", paymentMethod);
      updateProviderAction(formDataUser);

      const formDataVerifyReq = new FormData();
      formDataVerifyReq.append("provider_id", myData.uid);

      addVerificationRequest(formDataVerifyReq);
      setError("");
    } else {
      setError("Please try again later.");
    }
  };
  const handleSelect = (option: string) => {
    setPaymentMethod(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  useEffect(() => {
    const fetchMyData = async (): Promise<{
      data: UserData;
      token: string;
    }> => {
      const res = await fetch("/api/users/me", {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const getMyData = async () => {
      const { data } = await fetchMyData();
      setMyData(data);
    };
    getMyData();
  }, []);

  return (
    <div className="flex justify-center items-center w-full pt-4">
      <div className="card bg-gray-400 bg-opacity-30 w-11/12 md:w-3/5 shadow-2xl">
        <div className="card-body gap-7">
          <h1 className="flex justify-center text-2xl font-medium">
            Request For Provider Verification Form
          </h1>

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
            <Input
              className="placeholder:text-gray-300"
              name="location"
              placeholder="Location"
              required
            />

            <Label htmlFor="payment_method">Payment Method *</Label>

            <div className="dropdown w-full text-left">
              <div
                tabIndex={0}
                role="button"
                className="btn no-animation m-1 w-full bg-transparent hover:bg-transparent border-gs_white text-left"
                onClick={() => setIsOpen(!isOpen)}
              >
                <p className="w-full text-left">
                  {paymentMethod || "Select Payment Method"}
                </p>
              </div>
              {isOpen && (
                <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] shadow w-full">
                  {["credit_card", "banking", "qrcode"]?.map((option) => (
                    <li key={option}>
                      <button
                        className="dropdown-item text-left w-full"
                        type="button"
                        onClick={() => handleSelect(option)}
                      >
                        {option.replace("_", " ")}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Label htmlFor="credentials">Creadentials *</Label>
            <input name="credentials" type="file" required />

            <div className="flex flex-col justify-center w-full items-center gap-2">
              <button
                type="submit"
                className="btn rounded-full bg-gs_purple_gradient hover:bg-opacity-60 border-none w-min px-16"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Submit"
                )}
              </button>
              {error ? (
                <span className="text-sm text-red-500">{error}</span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
