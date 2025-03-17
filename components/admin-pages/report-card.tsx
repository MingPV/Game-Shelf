"use client";

import {
  selectGameAction,
  updateBaordgameStatus,
} from "@/app/(game-pages)/actions";
import {
  deleteRentingRequest,
  updateRentingRequestStatus,
} from "@/app/(rental-pages)/actions";
import {
  createNotificationByUserId,
  selectUserById,
} from "@/app/(user-pages)/actions";
import { Boardgame, RentingRequest } from "@/app/types/game";
import { UserData } from "@/app/types/user";
import { useEffect, useState, SetStateAction, Dispatch } from "react";
import Swal from "sweetalert2";
import { Dispute } from "@/app/types/admin";
import { updateReport } from "@/app/(admin-pages)/actions";
import { Label } from "@radix-ui/react-label";

export default function ReportCard({dispute}:{dispute: Dispute}) {
  const [profileURL, setProfileURL] = useState("/mock_provider.jpeg");
  const [reporter, setReporter] = useState<UserData>();
  const [reported, setReported] = useState<UserData>();
  const [status, setStatus] = useState<string>(dispute.status || "");
  const [verdict, setVerdict] = useState<string>(dispute.verdict || "");

  useEffect(() => {
    async function fetchPlayer() {
      const res = await selectUserById(dispute.reporter);
      const res2 = await selectUserById(dispute.report_to);
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
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Ensures two digits
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", dispute.id.toString());
    formData.append("status", status);
    formData.append("verdict", verdict);
    console.log("formData verdict: ", verdict);
    console.log("formData status: ", status);
    await updateReport(formData)

  };

  return (
    <>
      <div
        className="flex flex-col justify-center rounded-sm border border-white border-opacity-30 p-4 w-full cursor-pointer"
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
            <div className="sm:hidden">Reports' Topic : </div>
            <div>{dispute.title}</div>
          </div>
          <div className="hidden md:block md:col-span-3 lg:col-span-2 text-sm text-center">
            {dispute.type}
          </div>
          <div className="hidden lg:block col-span-3 text-sm items-center justify-start text-center">
            {formatDate(dispute.created_at)}
          </div>
          <button className="px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-400 rounded-md" onClick={()=>{
            const modal = document.getElementById(`my_modal_manage_report_${dispute.id}`);
            if (modal) {
                (modal as HTMLDialogElement).showModal();
              }
            }}>Manage</button>
        </div>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
    <dialog id={`my_modal_manage_report_${dispute.id}`} className="modal">
    <div className="modal-box text-black bg-white">
        <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="grid grid-cols-5 gap-4 p-4">
          <div className="font-bold text-lg col-span-5">Topic : {dispute.title}</div>
          <div className="font-bold text-md col-span-5">Type : {dispute.type}</div>
          <div className="col-span-5">Reporter : {reporter?.username}</div>
          <div className="col-span-5">Reported : {reported?.username}</div>
          <div className="col-span-5">Details : {dispute.details}</div>
          <Label className="col-span-1">Status : </Label>
          <div className="dropdown col-span-4 mr-auto">
            <div tabIndex={0} role="button" className={`m-1 text-white px-3 py-1 rounded-md 
              ${status=="waiting" ? "bg-red-500":""} ${status=="considering" ? "bg-orange-500":""} ${status=="complete" ? "bg-green-500":""}`}>{status}</div>
            <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm">
              <li><a onClick={()=>setStatus("waiting")}>waiting</a></li>
              <li><a onClick={()=>setStatus("considering")}>considering</a></li>
              <li><a onClick={()=>setStatus("complete")}>complete</a></li>
            </ul>
          </div>
          <Label className="col-span-1">Verdict : </Label>
          <textarea className="textarea bg-white border-1 border-black border-opacity-60 col-span-4" value={verdict} onChange={(e)=>setVerdict(e.target.value)}></textarea>
        </div>
        <form method="dialog" className="flex justify-center items-center">
          <button className="rounded-md py-1 px-14 mx-2 bg-red-500" onClick={()=>{setStatus(dispute.status);setVerdict(dispute.verdict)}}>Cancel</button>
          <button className="rounded-md py-1 px-14 mx-2 bg-green-500" onClick={handleSubmit}>Submit</button>
        </form>
    </div>
    </dialog>
    </>
  )
}
