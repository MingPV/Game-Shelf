"use client";

import { UserData } from "@/app/types/user";
import { useEffect, useState, SetStateAction, Dispatch } from "react";
import Swal from "sweetalert2";
import { Dispute } from "@/app/types/admin";
import { updateReport, updateTakeReport } from "@/app/(admin-pages)/actions";
import Link from "next/link";

export default function ReportCard({
  dispute,
  myData,
  setMyDispute,
}: {
  dispute: Dispute;
  myData: UserData;
  setMyDispute: Dispatch<SetStateAction<Dispute[]>>;
}) {
  const [profileURL, setProfileURL] = useState("/mock_provider.jpeg");
  const [reporter, setReporter] = useState<UserData>();
  const [reported, setReported] = useState<UserData>();
  const [isHidden, setIsHidden] = useState(false);

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

    async function fetchPlayer() {
      if (!dispute.reporter || !dispute.report_to) {
        console.log("no reporter or report_to");
        return;
      }
      const { data: res } = await fetchUserByID(dispute.reporter);
      const { data: res2 } = await fetchUserByID(dispute.report_to);
      if (res.length > 0) {
        setReporter(res[0]);
      }
      if (res2.length > 0) {
        setReported(res2[0]);
      }
    }
    fetchPlayer();
    setProfileURL(reporter?.profilePicture || "/mock_provider.jpeg");
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", dispute.id.toString());
    formData.append("status", "considering");
    formData.append("admin_id", myData.uid.toString());

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
        setMyDispute((prev) => [...prev, dispute]);
        await updateTakeReport(formData);

        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          title: "Report accepted",
          text: "The report has been taken to my responsibilities.",
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
            className="px-3 py-2 border bg-white/10 border-white/10 hover:bg-white/20 rounded-md"
            onClick={() => {
              const modal = document.getElementById(
                `my_modal_manage_report_${dispute.id}`
              );
              if (modal) {
                (modal as HTMLDialogElement).showModal();
              }
            }}
          >
            Take
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
                {reported?.username}
              </Link>
            </div>
            <div className="col-span-5 font-bold bg-black/10 rounded-md p-4">
              Details :{" "}
              <span className="text-black/60 font-normal ">
                {dispute.details}
              </span>
            </div>
            {/* <Label className="col-span-1">Status : </Label> */}
            {/* <div className="dropdown col-span-4 mr-auto">
              <div
                tabIndex={0}
                role="button"
                className={`m-1 text-white px-3 py-1 rounded-md 
              ${status == "waiting" ? "bg-red-500" : ""} ${status == "considering" ? "bg-orange-500" : ""} ${status == "complete" ? "bg-green-500" : ""}`}
              >
                {status}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a onClick={() => setStatus("waiting")}>waiting</a>
                </li>
                <li>
                  <a onClick={() => setStatus("considering")}>considering</a>
                </li>
                <li>
                  <a onClick={() => setStatus("complete")}>complete</a>
                </li>
              </ul>
            </div> */}
            {/* <Label className="col-span-1 font-bold">Verdict : </Label>
            <textarea
              className="textarea bg-white border-1 border-black border-opacity-60 col-span-4"
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
            ></textarea> */}
          </div>
          <form method="dialog" className="flex justify-center items-center">
            {/* <button
              className="rounded-md py-1 px-14 mx-2 bg-red-500"
              onClick={() => {
                setStatus(dispute.status);
                setVerdict(dispute.verdict);
              }}
            >
              Cancel
            </button> */}
            <button
              className="rounded-md py-2 px-12 mx-2 bg-gs_purple_gradient text-white/90"
              onClick={handleSubmit}
            >
              Add to my responsibilities
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
