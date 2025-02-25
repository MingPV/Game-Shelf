"use client";

import { useParams } from "next/navigation";

export default function Home() {
  const { username } = useParams();

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>user profile username : {username}</div>
        </div>
      </main>
    </>
  );
}
