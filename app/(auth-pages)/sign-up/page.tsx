"use client";

import { useState } from "react";
import {
  signUpAction,
  checkUsernameUnique,
  checkEmailUnique,
} from "../actions";
import Link from "next/link";
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";

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

  const handleSubmit = (event: React.FormEvent) => {
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
    signUpAction(formData);
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const newEmail = e.target.value;
    setEmail(newEmail);
    const isUnique = await checkEmailUnique(newEmail);
    setIsEmailUnique(isUnique);
    if (isUnique === false) {
      setError("This email is already used");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setIsEmailValid(false);
      setError("Email is invalid");
    } else {
      setIsEmailValid(true);
      setError("");
    }
  };

  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    const newUsername = e.target.value;
    setUsername(newUsername);
    const isUnique = await checkUsernameUnique(newUsername);
    setIsUsernameUnique(isUnique);
    if (isEmailUnique === false) {
      setError("This email is already used");
      return;
    }
    if (isUnique === false) {
      setError("This username is already used");
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      {/* Left Session */}
      <div className="flex flex-1 justify-center items-center  text-white p-8">
        <div className="text-center space-y-6">
          <img
            src={
              isProvider === null
                ? "/mock_user.jpeg"
                : isProvider === true
                  ? "/mock_provider.jpeg"
                  : "/mock_player.jpg"
            } // Replace with your image path
            alt="Signup Illustration"
            className="max-w-md mx-auto"
          />
          <h1 className="text-4xl font-bold">
            {isProvider === null
              ? "Welcome"
              : isProvider === true
                ? "Provider"
                : "Player"}
          </h1>
          <p className="text-lg">
            Join us and become part of an amazing community. Explore endless
            possibilities as a player or provider.
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
                  onChange={handleEmailChange}
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
                  onChange={handleUsernameChange}
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
              {error.length > 0 && (
                <div className="text-red-500">
                  <p>{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
