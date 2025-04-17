"use client";

import {
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen text-white  font-arcade w-5/6 mx-auto flex flex-col items-center gap-20 pt-16">
      {/* Heading */}
      <div className="text-4xl md:text-5xl text-left w-full ">
        Get close to US
      </div>

      {/* Info Grid */}
      <div className="w-full flex flex-col gap-20 ">
        {/* Left Block */}
        <div className="flex flex-row gap-16 ">
          {/* Location */}
          <div className="flex flex-col gap-4 w-1/2">
            <div className="text-2xl md:text-3xl font-semibold tracking-wide">
              Location
            </div>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="w-5 h-5 mt-1" />
              <span>
                Arcadia Headquarters, Tower B, Level 17, 123 Pixel Street, Cyber
                City District, Neo Tokyo 2049
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-4 w-1/2">
            <div className="text-2xl md:text-3xl font-semibold tracking-wide">
              Email
            </div>
            {["contact", "support", "careers"].map((type) => (
              <div className="flex items-center gap-4" key={type}>
                <FaEnvelope className="w-5 h-5" />
                {type}@arcadeverse.com
              </div>
            ))}
          </div>
        </div>

        {/* Right Block */}
        <div className="flex flex-row gap-16">
          {/* Social Media */}
          <div className="flex flex-col gap-4 w-1/2">
            <div className="text-2xl md:text-3xl font-semibold tracking-wide">
              Social Media
            </div>
            <div className="flex items-center gap-4">
              <FaTwitter className="w-5 h-5" />
              @ArcadeVerse
            </div>
            <div className="flex items-center gap-4">
              <FaInstagram className="w-5 h-5" />
              @arcadeverse.official
            </div>
            <div className="flex items-center gap-4">
              <FaDiscord className="w-5 h-5" />
              arcade.gg/invite
            </div>
          </div>

          {/* Telephone */}
          <div className="flex flex-col gap-4 w-1/2">
            <div className="text-2xl md:text-3xl font-semibold tracking-wide">
              Tel
            </div>
            {["+1 (123) 456-7890", "+1 (987) 654-3210", "+66 88 888 8888"].map(
              (number) => (
                <div className="flex items-center gap-4" key={number}>
                  <FaPhoneAlt className="w-5 h-5" />
                  {number}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
