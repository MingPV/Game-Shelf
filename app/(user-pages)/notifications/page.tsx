"use client";
import { Notification } from "@/app/types/notification";
import { useEffect, useState } from "react";
import { getAllNotifications } from "../actions";
import { IoNotifications } from "react-icons/io5";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>();
  const supabase = createClient();

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in");
      }
    };

    const fetchNotifications = async () => {
      const fetchData = await getAllNotifications();
      setNotifications(fetchData);
    };

    getUser();
    fetchNotifications();
  }, []);

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 w-full px-2 sm:px-10 md:px-20 lg:px-44  ">
        <div className="flex flex-row w-full justify-start">
          <div className=" font-semibold text-3xl px-12 flex flex-row gap-2 justify-center items-center">
            Notifications{" "}
            <span>
              <IoNotifications />
            </span>
          </div>
        </div>
        {notifications?.length == 0 ? (
          <div className="flex flex-col gap-4 bg-white bg-opacity-10 rounded-xl px-8 py-4 h-full w-full">
            <div className="h-32 flex items-center justify-center text-white text-opacity-50">
              {"You have no notification :)"}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 bg-white bg-opacity-10 rounded-xl px-8 py-4">
              {notifications?.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-row border border-white border-opacity-40 px-5 py-2 my-1 rounded-md space-x-5 items-center"
                >
                  <img
                    alt="moc_notification_image"
                    src={"/mock_provider.jpeg"}
                    className="rounded-full w-16 h-16"
                  />
                  <div className="flex flex-col min-h-24 gap-1 mt-2">
                    <p className="text-white">
                      A new message from {item.admin_id ? "admin" : "system"}
                    </p>
                    <p className="text-white text-opacity-60 text-sm">
                      {item.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
