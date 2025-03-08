"use client";

import {
  getLast9Notifications,
  updateReadNotification,
} from "@/app/(user-pages)/actions";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { Notification } from "@/app/types/notification";
import Link from "next/link";

export default function NotificationInNavbar() {
  // notifications will have only 9 notifications. If user want to see more they need to go to notification page.
  const [notifications, setNotifications] = useState<Notification[]>();
  const [isRead, setIsRead] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchData = await getLast9Notifications();
      setNotifications(fetchData);
      let countUnRead = 0;
      fetchData?.forEach((element) => {
        if (!element.is_read) {
          countUnRead += 1;
        }
      });
      setUnread(countUnRead);
    };

    fetchNotifications();
  }, []);

  const handleRead = async () => {
    if (!isRead && unread != 0) {
      updateReadNotification();
      setIsRead(true);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="" onClick={handleRead}>
        <div className="indicator ">
          <IoNotifications className="text-gs_white text-xl" />
          {!isRead && unread != 0 ? (
            <span className="badge badge-sm indicator-item ">{unread}</span>
          ) : null}
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-80 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold py-2 ">Notifications</span>
          <div className="flex flex-col">
            {notifications?.map((item, index) => (
              <div
                key={item.id}
                className="bg-opacity-20  border-t border-white border-opacity-30 w-full px-2 py-4 flex flex-row space-x-2"
              >
                <img
                  alt="mock_nofication_image"
                  src={"/mock_provider.jpeg"}
                  className="rounded-full w-8 h-8"
                />
                <p className="self-center line-clamp-1 text-white text-opacity-50">
                  {item.message}
                </p>
              </div>
            ))}
          </div>

          <div>
            <Link
              className="btn btn-primary btn-block btn-sm "
              href="/notifications"
            >
              see all
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
