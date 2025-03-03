"use client";

import { useState } from "react";
import {
  signUpAction,
  checkUsernameUnique,
  checkEmailUnique,
} from "../actions";
import Link from "next/link";
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

export default function Signup() {
  const [isProvider, setIsProvider] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailUnique, setIsEmailUnique] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isUsernameUnique, setIsUsernameUnique] = useState<boolean | null>(
    null
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Email is required");
      return;
    }

    if (!username) {
      setError("Username is required");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (isProvider === null) {
      setError("Please select a role");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("isProvider", isProvider.toString());
    const { status, message } = await signUpAction(formData);

    if (status == "success") {
      window.location.reload(); // Reload first
      window.location.href = "/home"; // Then Redirect
      // use this because we need to reload profile picture
    } else {
      setError(message);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(e.target.value);
  };

  const validateEmail = useDebouncedCallback(async (email: string) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setIsEmailValid(false);
      setError("Email is invalid");
      return;
    } else {
      setIsEmailValid(true);
      setError("");
    }

    try {
      const isUnique = await checkEmailUnique(email);
      setIsEmailUnique(isUnique);
      if (isUnique === false) {
        setError("This email is already used");
      }
    } catch {
      setError("Error checking email uniqueness");
    }
  }, 300);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUsername(e.target.value);
  };

  const validateUsername = useDebouncedCallback(async (username: string) => {
    // check email first
    if (isEmailUnique === false) {
      setError("This email is already used");
      return;
    }
    if (isEmailValid == false) {
      setError("Email is invalid");
    }

    try {
      const isUnique = await checkUsernameUnique(username);
      setIsUsernameUnique(isUnique);

      if (isUnique === false) {
        setError("This username is already used");
      }
    } catch {
      setError("Error checking username uniqueness");
    }
  }, 300);

  return (
    <div className="flex justify-center items-center w-full">
      {/* Left Session */}
      <div className="flex flex-1 justify-center items-center  text-white p-8 max-lg:hidden">
        <div className="text-center space-y-6">
          <img
            src={
              isProvider === null
                ? "/player.png"
                : isProvider === true
                  ? "/provider.png"
                  : "/player.png"
            } // Replace with your image path
            alt="Signup Illustration"
            className="max-w-md mx-auto rounded-lg shadow-2xl"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 80%)",
              maskImage:
                "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 80%)",
            }}
          />

          <h1 className="text-4xl font-bold">
            {isProvider === null
              ? "Welcome"
              : isProvider === true
                ? "Provider"
                : "Player"}
          </h1>
          <p className="text-lg opacity-50">
            Join now to rent and enjoy your favorite board games anytime! Create
            an account to explore a variety of games and connect with providers.
          </p>
        </div>
      </div>

      {/* Right Session */}
      <div className="flex flex-1 justify-center items-center p-8">
        <div className="card bg-gray-400 bg-opacity-30 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body gap-7">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-medium">Sign up</h1>
              <p className="text-sm text text-foreground">
                Already have an account?{" "}
                <Link
                  className="text-gs_purple font-medium hover:text-gs_white"
                  href="/sign-in"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <form
              className="flex flex-col min-w-64 gap-7 placeholder:text-gs_white"
              onSubmit={handleSubmit}
            >
              <div className="relative flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    handleEmailChange(e);
                    validateEmail(e.target.value);
                  }}
                  className="flex-1 p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gs_purple"
                />
                {isEmailUnique === true && isEmailValid == true && (
                  <FaRegCheckCircle className="absolute right-2 text-gs_green" />
                )}
                {(isEmailUnique === false || isEmailValid == false) && (
                  <FaRegTimesCircle className="absolute right-2 text-gs_red" />
                )}
                {(isEmailUnique === null || isEmailValid == null) && <></>}
              </div>

              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    handleUsernameChange(e);
                    validateUsername(e.target.value);
                  }}
                  className="flex-1 p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gs_purple"
                />
                {isUsernameUnique === true && (
                  <FaRegCheckCircle className="absolute right-2 text-gs_green" />
                )}
                {isUsernameUnique === false && (
                  <FaRegTimesCircle className="absolute right-2 text-gs_red" />
                )}
                {isUsernameUnique === null && <></>}
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gs_purple"
              />
              <div className="flex flex-col gap-2 pt-2">
                <label>Select Role</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`btn flex-1 hover:bg-gs_purple hover:border-none ${isProvider === false ? "bg-gs_purple_gradient border-none" : "bg-transparent border-white"}`}
                    onClick={() => setIsProvider(false)}
                  >
                    Player
                  </button>
                  <button
                    type="button"
                    className={`btn flex-1 hover:bg-gs_purple hover:border-none ${isProvider === true ? "bg-gs_purple_gradient border-none" : "bg-transparent border-white"}`}
                    onClick={() => setIsProvider(true)}
                  >
                    Provider
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="btn bg-gs_black hover:bg-gs_black hover:bg-opacity-60 hover:border-none"
              >
                Create Account
              </button>
              <div className="h-12">
                {error.length > 0 && (
                  <div className="text-red-500">
                    <p>{error}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
