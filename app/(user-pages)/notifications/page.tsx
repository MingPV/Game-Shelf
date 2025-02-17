"use client";
import { Notification } from "@/app/types/notification";
import { useEffect, useState } from "react";
import { getAllNotifications } from "../actions";

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>();

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchData = await getAllNotifications();
      setNotifications(fetchData);
    };

    fetchNotifications();
  }, []);

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>notifications</div>
          <div className="flex flex-col gap-2">
            {notifications?.map((item, index) => (
              <div key={item.id}>
                {index}. {item.message}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
