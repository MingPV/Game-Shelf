"use client"

import { useState } from "react";
import { signUpAction } from "../actions"; 
import Link from "next/link";


export default function Signup() {
  const [isProvider, setIsProvider] = useState("not selected");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Valid email is required");
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
    if (isProvider === "not selected") {
      setError("Please select a role");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("isProvider", isProvider);
    signUpAction(formData);
  };

  return (
    <div className="flex justify-center items-center">
      {/* Left Session */}
      <div className="flex flex-1 justify-center items-center  text-white p-8">
        <div className="text-center space-y-6">
          <img
            src={isProvider === "not selected" ? "/mock_user.jpeg" : isProvider === "true" ? "/mock_provider.jpeg" : "/mock_player.jpg"} // Replace with your image path
            alt="Signup Illustration"
            className="max-w-md mx-auto"
          />
          <h1 className="text-4xl font-bold">
            {isProvider === "not selected" ? "Welcome" : isProvider === "true" ? "Provider" : "Player"}
          </h1>
          <p className="text-lg">
            Join us and become part of an amazing community. Explore endless possibilities as a player or provider.
          </p>
        </div>
      </div>

      {/* Right Session */}
      <div className="flex flex-1 justify-center items-center p-8">
        <div className="card bg-gray-400 bg-opacity-30 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-2xl font-medium">Sign up</h1>
            <p className="text-sm text text-foreground">
              Already have an account?{" "}
              <Link className="text-gs_purple font-medium underline" href="/sign-in">
                Sign in
              </Link>
            </p>

            <form className="flex flex-col min-w-64 gap-3 placeholder:text-gs_white" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2 p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gs_purple"
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gs_purple"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2 p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gs_purple"
              />
              <label>Select Role</label>
              <div className="flex gap-2">
                <button 
                  type="button" 
                  className={`btn flex-1 hover:bg-gs_purple  ${isProvider === "false" ? "bg-gs_purple_gradient border-none" : "bg-transparent border-white"}`}
                  onClick={() => setIsProvider("false")}>
                  Player
                </button>
                <button 
                  type="button" 
                  className={`btn flex-1 hover:bg-gs_purple ${isProvider === "true" ? "bg-gs_purple_gradient border-none" : "bg-transparent border-white"}`}
                  onClick={() => setIsProvider("true")}>
                  Provider
                </button>
              </div>
              {error && <p className="text-gs_red">{error}</p>}
              <button type="submit" className="btn border-none rounded-3xl bg-gs_purple_gradient text-white m-5">
                Create  Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}