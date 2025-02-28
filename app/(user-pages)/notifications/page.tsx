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
        <div className="flex flex-row">
          <div className=" font-semibold text-3xl px-12">Notifications</div>
        </div>
        <div className="flex flex-col gap-4 bg-white bg-opacity-20 rounded-xl px-8 py-4">
          {notifications?.map((item, index) => (
            <div key={item.id} className="border px-5 py-4 rounded-xl flex flex-row space-x-5 items-center">
              <img
                alt="moc_notification_image"
                src={"/mock_provider.jpeg"}
                className="rounded-full w-16 h-16"
              />
              <p>{item.message}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
