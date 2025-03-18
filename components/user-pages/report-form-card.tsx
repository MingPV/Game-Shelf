"use client";

import { use, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createReport, selectUsersByFilterAction, selectRentalRequestsByPlayerId, selectRentalRequestsByProviderId } from "@/app/(user-pages)/actions";
import { UserData } from "@/app/types/user";
import { RentingRequest } from "@/app/types/game";

export default function ReportFormCard({
  userData,
}: {
  userData: UserData;
}) {
    const [reportType, setReportType] = useState<"general" | "rental">("general");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const [rentalRequests, setRentalRequests] = useState<RentingRequest[]>([]);
    const [selectedGeneralReportedId, setSelectedGeneralReportedId] = useState<string>("");
    const [selectedRentalReportedId, setSelectedRentalReportedId] = useState<string>("");

    
    const fetchUsers = async () => {
        const { fetch_data: data } = await selectUsersByFilterAction("");
        console.log("data", data);
        setUsers(data || []);
    }

    const fetchRentalRequests = async () => {
        if (userData.isProvider){
            const data  = await selectRentalRequestsByProviderId(userData.uid);
            setRentalRequests(data);
            console.log("rental request provider", data);
        } else  {
            const data  = await selectRentalRequestsByPlayerId(userData.uid);
            console.log("rental request player",data);
            setRentalRequests(data);
        }
    };



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSubmitting(true);

        const formDataUser = new FormData(event.currentTarget);

        if (userData) {
            const selectedRequest = rentalRequests.find((request) => request.id === Number(selectedRentalReportedId));
            const rentalValue = userData.isProvider ? selectedRequest?.customer_id : selectedRequest?.provider_id;
            formDataUser.set("reporter", userData.uid);
            formDataUser.set("reported", reportType === "general" ? selectedGeneralReportedId : rentalValue || "");

            createReport(formDataUser);
            // console.log("user data", userData);
        }

        setIsSubmitting(false);
    };

    useEffect(() => {
        fetchUsers();
        fetchRentalRequests();
    }, []);

    useEffect(() => {
        if (users.length > 0 && selectedGeneralReportedId === "") {
            setSelectedGeneralReportedId(users[0].uid); 
        }
    }, [users]); 
    
    useEffect(() => {
        if (rentalRequests.length > 0 && selectedRentalReportedId === "") {
            const rentalValue = userData.isProvider ? rentalRequests[0].customer_id : rentalRequests[0].provider_id;
            setSelectedRentalReportedId(rentalValue); 
        }
    }, [rentalRequests]); 
    
    return (
        <div className="flex justify-center items-center w-full pt-4">
        <div className="card gap-2 w-11/12 md:w-3/5">
            <h1 className="flex justify-center text-2xl font-medium">
                Report Request Form
            </h1>

            <div className="flex gap-4">
                <button
                    type="button"
                    className={`px-4 py-2 border border-input rounded-lg text-white ${
                        reportType === "general" ? "bg-gs_gray bg-opacity-30" : "border-gray-400"
                    }`}
                    onClick={() => setReportType("general")}
                >
                    General
                </button>

                <button
                    type="button"
                    className={`px-6 py-2 border border-input rounded-lg text-white ${
                        reportType === "rental" ? "bg-gs_gray bg-opacity-30" : "border-gray-400"
                    }`}
                    onClick={() => setReportType("rental")}
                >
                    Rental
                </button>
            </div>

        
            <div className="card-body border border-input rounded-md gap-7 pl-24 pr-32 py-10 ">

            <form
                className="flex flex-col min-w-64 gap-5 placeholder:text-gs_white"
                onSubmit={handleSubmit}
            >

                <div className="grid grid-cols-3 gap-14">
                    <Label htmlFor="reporter" className="content-center text-md col-span-1">Reporter:</Label>
                    <Input
                        className="text-gray-400 col-span-2"
                        name="reporter"
                        placeholder="Reporter"
                        value= {userData?.username}
                        readOnly
                        required
                    />
                </div>

                <div className="grid grid-cols-3 gap-14">
                    {reportType === "general" ? 
                        <>
                            <Label htmlFor="reported" className="content-center text-md col-span-1">Reported User:</Label>
                            <select
                                className="w-full rounded-md border border-input px-3 py-2 text-sm bg-transparent col-span-2"
                                name="reported"
                                value={selectedGeneralReportedId}
                                onChange={(e) => setSelectedGeneralReportedId(e.target.value)}
                                required
                            >
                                {users.map((user) => (
                                    <option key={user.uid} value={user.uid} className="bg-black w-fit rounded-md text-sm">
                                        {user.username}
                                    </option>
                                ))}
                            </select>

                        </> 
                        :
                        <>
                            <Label htmlFor="related_rental" className="content-center text-md col-span-1">Related Rental:</Label>
                            <select
                                className="w-full rounded-md border border-input px-3 py-2 text-sm bg-transparent col-span-2"
                                name="related_rental"
                                value={selectedRentalReportedId}
                                onChange={(e) => {
                                    setSelectedRentalReportedId(e.target.value)
                                }}
                                required
                            >
                                {rentalRequests.map((request) => {
                                    return (
                                        <option 
                                            key={request.id} 
                                            value={request.id}
                                            className="bg-black w-fit rounded-md text-sm"
                                        >
                                            {request.id}
                                        </option>
                                    )
                                    }
                                )}
                            </select>
                        </> 
                    }
                </div>
                
                <div className="grid grid-cols-3 gap-14">
                    <Label htmlFor="topic" className="content-center text-md col-span-1">Topic:</Label>
                    <Input
                        className="placeholder:text-gray-400 col-span-2"
                        name="topic"
                        placeholder="Topic"
                        required
                    />
                </div>

                <div className="grid grid-cols-3 gap-14">
                    <Label htmlFor="details" className="text-md grid-cols-1">Details:</Label>
                    <textarea
                        className="flex min-h-36 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                                    ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                                    disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 col-span-2"
                        name="details"
                        placeholder="Details"
                        required
                    ></textarea>
                </div>

            </form>
            </div>

            <div className="flex justify-center gap-10 mt-7">
                <button
                    type="submit"
                    className="btn rounded-full text-md bg-gs_gray bg-opacity-50 hover:bg-black hover:bg-opacity-25 border-none w-min px-16"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn rounded-full text-md bg-gs_purple_gradient hover:bg-opacity-60 border-none w-min px-16"
                >
                    {isSubmitting ? "Sending.." : "Submit"}
                </button>
            </div>

        </div>
        </div>
    );
    }
