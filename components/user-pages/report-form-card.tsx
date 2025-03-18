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
    const [reportType, setReportType] = useState<string>("general");
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
        <div className="card bg-gray-400 bg-opacity-30 w-11/12 md:w-3/5 shadow-2xl">
            <div className="card-body gap-7">
            <h1 className="flex justify-center text-2xl font-medium">
                Report Form
            </h1>

            <form
                className="flex flex-col min-w-64 gap-5 placeholder:text-gs_white"
                onSubmit={handleSubmit}
            >

                <Label htmlFor="type">Type *</Label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="type"
                            value="general"
                            checked={reportType === "general"}
                            onChange={() => setReportType("general")}
                            className="peer hidden"
                            required
                        />
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:bg-blue-500">
                        <div className="w-3 h-3 bg-blue-500 rounded-full peer-checked:block hidden"></div>
                        </div>
                        General
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="type"
                            value="rental"
                            checked={reportType === "rental"}
                            onChange={() => setReportType("rental")}
                            className="peer hidden"
                            required
                        />
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:bg-blue-500">
                        <div className="w-3 h-3 bg-blue-500 rounded-full peer-checked:block hidden"></div>
                        </div>
                        Rental
                    </label>
                </div>

                <Label htmlFor="reporter">Reporter *</Label>
                <Input
                    className="text-gray-300"
                    name="reporter"
                    placeholder="Reporter"
                    value= {userData?.username}
                    readOnly
                    required
                />

                {reportType === "general" ? 
                    <>
                        <Label htmlFor="reported">Reported *</Label>
                        <select
                            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-transparent"
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
                        <Label htmlFor="related_rental">Related Rental *</Label>
                        <select
                            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-transparent"
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

                <Label htmlFor="topic">Topic *</Label>
                <Input
                    className="placeholder:text-gray-300"
                    name="topic"
                    placeholder="Topic"
                    required
                />


                <Label htmlFor="details">Details *</Label>
                <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                                ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                                disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-300"
                    name="details"
                    placeholder="Details"
                    required
                ></textarea>

                <div className="flex justify-center gap-10">
                    <button
                        type="submit"
                        className="btn rounded-full bg-gs_purple_gradient hover:bg-opacity-60 border-none w-min px-16"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="btn rounded-full bg-gs_purple_gradient hover:bg-opacity-60 border-none w-min px-16"
                    >
                        {isSubmitting ? "Sending.." : "Submit"}
                    </button>
                </div>

            </form>
            </div>
        </div>
        </div>
    );
    }
