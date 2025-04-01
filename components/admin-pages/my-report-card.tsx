"use client";

import {
  banUserAction,
  createNotificationByUserId,
} from "@/app/(user-pages)/actions";
import { UserData } from "@/app/types/user";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Dispute } from "@/app/types/admin";
import { updateReportVerdict } from "@/app/(admin-pages)/actions";
import Link from "next/link";
import { RentingRequest } from "@/app/types/game";
import Image from "next/image";

export default function MyReportCard({
  dispute,
  myData,
}: {
  dispute: Dispute;
  myData: UserData;
}) {
  const [profileURL, setProfileURL] = useState("/mock_provider.jpeg");
  const [reporter, setReporter] = useState<UserData>();
  const [reported, setReported] = useState<UserData>();
  const [verdict, setVerdict] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [rental, setRental] = useState<RentingRequest>();
  const [banDuration, setBanDuration] = useState<number>(1);
  const [isRefund, setIsRefund] = useState(false);
  const [isBan, setIsBan] = useState(false);

  useEffect(() => {
    const fetchUserByID = async (
      userID: string
    ): Promise<{
      data: UserData[];
      token: string;
    }> => {
      const res = await fetch(`/api/users/${userID}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchRentalByID = async (
      rentalID: string
    ): Promise<{
      data: RentingRequest;
      token: string;
    }> => {
      const res = await fetch(`/api/rental/${rentalID}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    async function fetchPlayer() {
      const { data: res } = await fetchUserByID(dispute.reporter);
      const { data: res2 } = await fetchUserByID(dispute.report_to);
      if (res.length > 0) {
        setReporter(res[0]);
      }
      if (res2.length > 0) {
        setReported(res2[0]);
      }
    }
    async function fetchRental() {
      const { data: res } = await fetchRentalByID(dispute.rental_id.toString());
      setRental(res);
    }
    if (dispute.rental_id) {
      fetchRental();
    }
    fetchPlayer();
    setProfileURL(reporter?.profilePicture || "/mock_provider.jpeg");
  }, []);

  const handleSubmit = async () => {
    if (verdict == "") {
      alert("verdict is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("id", dispute.id.toString());
    formData.append("verdict", verdict);

    let datestring: string = "";
    if (reported) {
      if (reported.is_banned) {
        const currentBanDate = new Date(reported.ban_until);
        currentBanDate.setDate(currentBanDate.getDate() + banDuration);
        datestring = currentBanDate.toISOString();
      } else {
        const newBanDate = new Date();
        newBanDate.setDate(newBanDate.getDate() + banDuration);
        datestring = newBanDate.toISOString();
      }
    }

    // console.log("Ban until:", datestring);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#359368",
      cancelButtonColor: "#FF2525",
      confirmButtonText: "Accept",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsHidden(true);
        await updateReportVerdict(formData);
        if (reported?.uid) {
          await banUserAction(reported.uid, datestring);
        } else {
          console.error("Reported user UID is undefined.");
        }

        const message = `Your report has been reviewed and give a virdict. You can check report status at report-history`;
        if (reporter) {
          await createNotificationByUserId(reporter.uid, message);
        }

        Swal.fire({
          title: "Judgment completed",
          text: "The decision has been made and a message has been sent to the reporter and the reported person.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        }).then(() => {
          // Close the modal
        });
      }
    });
  };

  function formatDateRange(dateStr: string): string {
    const DateTmp = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };

    const endStr = DateTmp.toLocaleDateString("en-GB", options);
    const year = DateTmp.getFullYear();

    return `${endStr} ${year}`;
  }

  return (
    <>
      <div
        className={`flex flex-col justify-center rounded-sm border border-white border-opacity-30 p-4 w-full hover:bg-white/10 transition-all duration-300 ${isHidden ? "hidden" : ""}`}
        onClick={() => {
          const modal = document.getElementById(
            `my_modal_manage_report_${dispute.id}`
          );
          if (modal) {
            (modal as HTMLDialogElement).showModal();
          }
        }}
      >
        <div className="flex flex-col gap-4 sm:gap-0 sm:grid sm:grid-flow-col sm:grid-cols-12 items-center ">
          <div className="col-span-6 md:col-span-5 lg:col-span-3 flex gap-2 items-center font-bold">
            <div className="flex relative h-7 w-7 rounded-full">
              <img
                alt="provider profile"
                src={profileURL}
                sizes="28px"
                className="rounded-full"
              />
            </div>
            {reporter?.username}
          </div>
          <div className="flex flex-row justify-start sm:col-span-5  md:col-span-3 lg:col-span-3 text-sm">
            <div className="sm:hidden">Reports' Topic : {dispute.id}</div>
            <div>{dispute.title}</div>
          </div>
          <div
            className={`hidden md:block md:col-span-3 lg:col-span-2 text-sm text-center font-bold ${dispute.type == "rental" ? "text-red-500" : ""}`}
          >
            {dispute.type}
          </div>
          <div className="hidden lg:block col-span-3 text-sm items-center justify-start text-center">
            {formatDateRange(dispute.created_at)}
          </div>
          <button
            className="px-3 py-2 bg-gs_purple_gradient rounded-md text-sm"
            onClick={() => {
              const modal = document.getElementById(
                `my_modal_manage_report_${dispute.id}`
              );
              if (modal) {
                (modal as HTMLDialogElement).showModal();
              }
            }}
          >
            Manage
          </button>
        </div>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        id={`my_modal_manage_report_${dispute.id}`}
        className="modal"
        onClick={(e) => {
          const modal = document.getElementById(
            `my_modal_manage_report_${dispute.id}`
          );
          if (modal && e.target === modal) {
            (modal as HTMLDialogElement).close();
          }
        }}
      >
        <div className="modal-box text-black bg-white">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="grid grid-cols-5 gap-4 p-4">
            <div className="font-bold text-lg col-span-5">
              Topic : {dispute.title}
            </div>
            <div className={`font-bold text-md col-span-5 `}>
              Type :{" "}
              <span
                className={`${dispute.type == "rental" ? "text-red-600" : "text-sky-600"}`}
              >
                {dispute.type}
              </span>
            </div>
            <div className="col-span-5 font-bold">
              Reporter :{" "}
              <Link
                className="text-black/60 font-normal hover:underline"
                href={`profile/${reporter?.username}`}
              >
                {reporter?.username}
              </Link>
            </div>
            <div className="col-span-5 font-bold">
              Reported :{" "}
              <Link
                className="text-black/60 font-normal hover:underline"
                href={`profile/${reported?.username}`}
              >
                {reported?.username}{" "}
              </Link>
              <span
                className={`text-red-600 text-sm mx-2 p-2 bg-red-800/10 rounded-md ${reported?.is_banned ? "" : "hidden"}`}
              >
                {reported?.is_banned
                  ? `Currently banned (${formatDateRange(reported.ban_until)})`
                  : ""}
              </span>
            </div>
            <div className="col-span-5 font-bold bg-black/10 rounded-md p-4">
              Details :{" "}
              <span className="text-black/60 font-normal ">
                {dispute.details}
              </span>
            </div>
            {dispute.type == "rental" ? (
              <>
                <div className="flex flex-row col-span-5 gap-2">
                  <div className="flex flex-col items-center  bg-black/10 rounded-md  p-1">
                    <Image
                      src={
                        rental?.before_ship ||
                        "https://sblvrpkvjbvwvzqaiabr.supabase.co/storage/v1/object/public/user_profiles/8268edbc-70a9-4ca0-954e-0cbcaa823907"
                      }
                      alt={rental?.status || ""}
                      width={300}
                      height={300}
                      className="hover:cursor-pointer border-4 hover:border-amber-500/80"
                      onClick={() => {
                        window.open(rental?.before_ship, "_blank");
                      }}
                    />
                    <div className="text-xs ">Before ship</div>
                  </div>
                  <div className="flex flex-col items-center  bg-black/10 rounded-md p-1">
                    <Image
                      src={
                        rental?.before_ship ||
                        "https://sblvrpkvjbvwvzqaiabr.supabase.co/storage/v1/object/public/user_profiles/8268edbc-70a9-4ca0-954e-0cbcaa823907"
                      }
                      alt={rental?.status || ""}
                      width={300}
                      height={300}
                      className="hover:cursor-pointer border-4 hover:border-amber-500/80"
                      onClick={() => {
                        window.open(rental?.before_ship, "_blank");
                      }}
                    />
                    <div className="text-xs ">After Ship</div>
                  </div>
                  <div className="flex flex-col items-center  bg-black/10 rounded-md p-1">
                    <Image
                      src={
                        rental?.before_ship ||
                        "https://sblvrpkvjbvwvzqaiabr.supabase.co/storage/v1/object/public/user_profiles/8268edbc-70a9-4ca0-954e-0cbcaa823907"
                      }
                      alt={rental?.status || ""}
                      width={300}
                      height={300}
                      className="hover:cursor-pointer border-4 hover:border-amber-500/80"
                      onClick={() => {
                        window.open(rental?.before_ship, "_blank");
                      }}
                    />
                    <div className="text-xs ">Before Return</div>
                  </div>
                  <div className="flex flex-col items-center  bg-black/10 rounded-md p-1">
                    <Image
                      src={
                        rental?.before_ship ||
                        "https://sblvrpkvjbvwvzqaiabr.supabase.co/storage/v1/object/public/user_profiles/8268edbc-70a9-4ca0-954e-0cbcaa823907"
                      }
                      alt={rental?.status || ""}
                      width={300}
                      height={300}
                      className="hover:cursor-pointer border-4 hover:border-amber-500/80"
                      onClick={() => {
                        window.open(rental?.before_ship, "_blank");
                      }}
                    />
                    <div className="text-xs ">After Return</div>
                  </div>
                </div>
                <div className="col-span-5 flex flex-row items-center">
                  <input
                    className="checkbox text-black bg-black/10"
                    type="checkbox"
                    onClick={() => setIsRefund(!isRefund)}
                    onChange={(e) => {}}
                    checked={isRefund}
                  />
                  <div className="mx-2 text-sm text-lime-600 font-bold">
                    Refund to player
                  </div>
                </div>
              </>
            ) : null}
            <div className="col-span-5 flex flex-row items-start">
              <input
                className="checkbox text-black bg-black/10"
                type="checkbox"
                onClick={() => setIsBan(!isBan)}
                onChange={(e) => {}}
                checked={isBan}
              />
              <div className="mx-2 text-sm text-red-600 font-bold">
                {reported?.is_banned ? "Extend " : ""}Ban {reported?.username}
              </div>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = parseInt(value.replace("days", ""), 10);
                  setBanDuration(numericValue);
                }}
                className={`select bg-white border border-black/20 focus:border-black/20 mx-2 ${isBan ? "" : "hidden"}`}
              >
                <option value="1days">1 day</option>
                <option value="3days">3 days</option>
                <option value="7days">7 days</option>
                <option value="30days">30 days</option>
                <option value="60days">60 days</option>
                <option value="120days">120 days</option>
                <option value="365days">365 days</option>
              </select>
            </div>
            <div className="col-span-5 font-bold">
              Verdict :{" "}
              <textarea
                className="textarea bg-white border-1 border-black/20 border-opacity-60 col-span-4 focus:border-black/20 w-full"
                value={verdict}
                onChange={(e) => setVerdict(e.target.value)}
              ></textarea>
            </div>
          </div>
          <form method="dialog" className="flex justify-center items-center">
            <button className="rounded-md py-2 px-14 mx-2 border border-black/20 hover:bg-black/10 transition-all duration-300">
              Cancel
            </button>
            <button
              className="rounded-md py-2 px-12 mx-2 bg-gs_purple_gradient text-white/90"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
