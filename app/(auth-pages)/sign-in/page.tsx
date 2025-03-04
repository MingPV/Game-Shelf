"use client";

import { signInAction } from "@/app/(auth-pages)/actions";
import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Login() {
  // const searchParams = await props.searchParams;

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await signInAction(formData);

    if (response?.status == "success") {
      window.location.reload(); // Reload first
      window.location.href = "/home"; // Then Redirect
      // use this because we need to reload profile picture
    }

    console.log(response);
  };

  return (
    <div className="flex justify-center items-center w-full">
      {/* Left Session */}
      <div className="flex flex-1 justify-center items-center  text-white p-8 max-lg:hidden">
        <div className="text-center space-y-6">
          <img
            src="/player.png"
            alt="SignIn Illustration"
            className="max-w-md mx-auto"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 80%)",
              maskImage:
                "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 80%)",
            }}
          />
          <h1 className="text-4xl font-bold">Welcome</h1>
          <p className="text-xl opacity-50">
            Welcome back! Sign in to rent, manage your bookings, and discover
            new board games. Let the fun begin!
          </p>
        </div>
      </div>

      {/* Right Session */}
      <div className="flex flex-1 justify-center items-center p-8">
        <div className="card bg-gray-400 bg-opacity-30 w-full max-w-sm shadow-2xl">
          <div className="card-body gap-5">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-medium">Sign in</h1>
              <p className="text-sm text-foreground">
                New user?{" "}
                <Link
                  className="text-gs_purple font-medium hover:text-gs_white"
                  href="/sign-up"
                >
                  Create an account
                </Link>
              </p>
            </div>

            <form
              className="flex flex-col min-w-64 placeholder:text-gs_white"
              onSubmit={handleSignIn}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email Address"
                    className="flex-1 p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gs_purple"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 pb-2">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="flex-1 p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gs_purple"
                    required
                  />
                  <div className="flex justify-end p-1">
                    <Link
                      className="text-xs text-foreground text-gray-400 underline "
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn rounded-full bg-gs_purple_gradient hover:bg-opacity-60 border-none"
                >
                  Sign In
                </button>
              </div>

              <div className="divider text-gray-400 py-5">or</div>

              <div className="flex flex-col gap-3">
                <button className="pl-16 max-xs1:pl-12 max-xs2:pl-10 max-xs3:pl-8 btn border-none w-full flex items-center justify-start rounded-full bg-white text-gray-800 border-gray-300 hover:bg-gray-200 py-3">
                  <FcGoogle className="w-6 h-6 shrink-0" />
                  <span className="ml-2 max-xs2:ml-1">
                    Continue With Google
                  </span>
                </button>

                <button className="pl-16 max-xs1:pl-12 max-xs2:pl-10 max-xs3:pl-8 btn border-none w-full flex items-center justify-start rounded-full bg-blue-600 text-white hover:bg-blue-700 py-3">
                  <FaFacebook className="w-6 h-6 shrink-0" />
                  <span className="ml-2 max-xs2:ml-0.5">
                    Continue With Facebook
                  </span>
                </button>

                <button className="pl-16 max-xs1:pl-12 max-xs2:pl-10 max-xs3:pl-8 btn border-none w-full flex items-center justify-start rounded-full bg-black text-white hover:bg-gray-800 py-3">
                  <FaApple className="w-6 h-6 shrink-0" />
                  <span className="ml-2 max-xs2:ml-1">Continue With Apple</span>
                </button>
              </div>
              {/* 
              <FormMessage message={searchParams} /> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
