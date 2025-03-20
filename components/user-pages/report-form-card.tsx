"use client";

import { use, useEffect, useState, useMemo} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createReport, selectUsersByFilterAction, selectRentalRequestsByPlayerId, selectRentalRequestsByProviderId } from "@/app/(user-pages)/actions";
import { UserData } from "@/app/types/user";
import { RentingRequest } from "@/app/types/game";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import ReportRentalCard from "@/components/user-pages/report-rental-card";
import { getMyUserData } from "@/app/(user-pages)/actions";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

export default function ReportFormCard({
//   userData,
}: {
//   userData: UserData;
}) {
    const [reportType, setReportType] = useState<"general" | "rental">("general");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const [rentalRequests, setRentalRequests] = useState<RentingRequest[]>([]);
    const [selectedGeneralReportedId, setSelectedGeneralReportedId] = useState<string>("");
    const [selectedRentalReportedId, setSelectedRentalReportedId] = useState<string>("");
    const [userData, setUserData] = useState<UserData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<{ topic: boolean; details: boolean, reported: boolean }>({
        topic: false,
        details: false,
        reported: false,
    });
    
    const router = useRouter();

    const fetchMyData = async () => {
        const res = await getMyUserData();
        // console.log("userData loaded:", res);
        setUserData(res);
        setIsLoading(false)
    }
    
    const fetchUsers = useDebouncedCallback(async () => {
        // if (!userData) return;
        const { fetch_data: data } = await selectUsersByFilterAction("");
        console.log("users loaded:", data);
        setUsers(data || []);
    }, 300);

    const fetchRentalRequests = useDebouncedCallback(async () => {
        //if (!userData) return;
        let data;
        if(userData){
            if (userData.isProvider) {
                data = await selectRentalRequestsByProviderId(userData.uid);
                console.log("rental request provider:", data);
            } else {
                data = await selectRentalRequestsByPlayerId(userData.uid);
                console.log("rental request player:", data);
            }
            setRentalRequests(data);
        } else {
            console.log('wait for userData');
        }
    }, 500);

    const userOptions = useMemo(() => {
        return users.map((user) => ({
          value: user.uid,
          label: user.username,
        }));
      }, [users]);
    
    
    const [selectedUser, setSelectedUser] = useState<{value:string, label:string}>({ value: "", label: "" });
    const [searchQuery, setSearchQuery] = useState<string>("");
    
    const filteredOptions = userOptions.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [selectedRental, setSelectedRental] = useState<RentingRequest>(
            {
                id: 0,
                start_date: "",
                end_date: "",
                status: "",
                customer_id: "",
                bg_id: 0,
                created_at: "",
                provider_id: "",
                boardgames: undefined,
                users: { username: "" } as UserData, 
            }
    );

    const filteredRentals = rentalRequests.filter((rental) => rental.id);

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setErrors((prev) => ({ ...prev, [name]: value.trim() === "" }));
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSubmitting(true);

        const formDataUser = new FormData(event.currentTarget);

        const topicValue = formDataUser.get("topic")?.toString().trim();
        const detailsValue = formDataUser.get("details")?.toString().trim()
        const reportedValue = (reportType === "general") ? selectedUser.value : selectedRentalReportedId;

        // console.log("reportedValue", reportedValue)

        const newErrors = {
            topic: !topicValue,
            details: !detailsValue,
            reported: !reportedValue || reportedValue === "",
        };
    
        setErrors(newErrors);
    
        if (Object.values(newErrors).some((error) => error)) {
            setIsSubmitting(false);
            // console.log("found error", newErrors);
            return;
        }

        if (userData) {
            // const selectedRequest = rentalRequests.find((request) => { (userData.isProvider ? request.customer_id : request.provider_id) === selectedRentalReportedId });
            //const rentalValue = userData.isProvider ? selectedRequest?.customer_id : selectedRequest?.provider_id;
            formDataUser.set("reporter", userData.uid);
            formDataUser.set("reported", reportType === "general" ? selectedUser.value : selectedRentalReportedId);
            formDataUser.append("type", reportType);
            
            createReport(formDataUser);
            
            // // ✅ Reset form fields & state
            // //event.currentTarget.reset(); // รีเซ็ตค่า input ทั้งหมด
            // setSelectedUser({ value: "", label: "" }); // ล้างค่า user ที่เลือก
            // setSelectedRentalReportedId(""); // ล้างค่า Rental ID
            // setReportType("general"); // รีเซ็ตประเภทเป็นค่าเริ่มต้น
        }

        setIsSubmitting(false);
    };

    useEffect(() => {
        fetchMyData();
    }, []);

    useEffect(() => {
        if (userData) {
            fetchUsers();
            fetchRentalRequests();
        }
    }, [userData]);

    // useEffect(() => {
    //     if (users.length > 0 && selectedGeneralReportedId === "") {
    //         setSelectedGeneralReportedId(users[0].uid); 
    //     }
    // }, [users]); 
    
    // useEffect(() => {
    //     if (rentalRequests.length > 0 && selectedRentalReportedId === "") {
    //         const rentalValue = userData?.isProvider ? rentalRequests[0].customer_id : rentalRequests[0].provider_id;
    //         setSelectedRentalReportedId(rentalValue); 
    //     }
    // }, [rentalRequests]); 

    useEffect(() => {
        setErrors((prev) => ({ ...prev, reported: false }));
    }, [reportType]);
    


    if(isLoading){
        return (
            <div className="flex justify-center items-center w-full pt-4">
            <div className="card gap-2 w-11/12 md:w-3/5 ">
                <div className="flex gap-4 max-md:justify-center">
                    <button  className={`btn w-24 px-4 py-2 border border-input rounded-lg text-gs_gray text-opacity-10 bg-gs_gray bg-opacity-20`}>
                    </button>
                    <button  className={`btn w-24 px-4 py-2 border border-input rounded-lg text-gs_gray text-opacity-10 bg-gs_gray bg-opacity-20`}>
                    </button>
                </div>

               <div className={`card-body rounded-lg gap-7 py-10 bg-gs_gray bg-opacity-10 h-[400px]`}></div>
                
                <div className="flex justify-center gap-10 mt-7 max-md:gap-5 max-sm:gap-3">
                    <button className="btn rounded-full text-md bg-white bg-opacity-10 border-none w-28 px-16">
                    </button>
                    <button className="btn rounded-full text-md bg-white bg-opacity-10 border-none w-28 px-16">
                    </button>
                </div>
            </div>
        </div>

        );
    }
    
    return (
        <div className="flex justify-center items-center w-full pt-4">
        <div className="card gap-2 w-11/12 md:w-3/5">
            <h1 className="flex justify-center text-2xl font-medium">
                Report Request Form
            </h1>

            <div className="flex gap-4 max-md:justify-center">
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

            <div className={` ${reportType === "rental" ? "grid grid-cols-2 gap-5 max-lg:flex max-lg:flex-col" : ""}`}>
                <div className={`card-body border border-input rounded-md gap-7 py-10 
                                ${reportType === "rental" ?
                                "col-span-1 px-10 " 
                                : 
                                "pl-32 pr-36 max-lg:px-20 max-md:px-7 "}`}>

                    <form className={`flex flex-col w-full gap-5 placeholder:text-gs_white ${reportType === "rental" ? "col-span-1" : ""}`}
                          onSubmit={handleSubmit}
                          id="reportForm"
                    >

                        <div className="grid grid-cols-3 gap-14">
                            <Label htmlFor="reporter" className="content-center text-md col-span-1">Reporter:</Label>
                            <Input
                                className="text-white-50 col-span-2 cursor-default"
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
                                <Listbox value={selectedUser} onChange={setSelectedUser}>
                                        <div className="relative col-span-2">
                                        <ListboxButton
                                             className={`select flex items-center w-full bg-transparent px-3 py-2 text-white border 
                                                ${errors.reported ? "border-gs_red" : "border-input"}
                                                focus:outline-none focus:border focus:border-input peer`}
                                        >
                                            {selectedUser.label !="" ? selectedUser.label : <span className="text-white/50">Select a User</span>}
                                        </ListboxButton>
                                            <ListboxOptions className="absolute w-full bg-gs_black text-white mt-1 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
                                                {/* Search in dropdown */}
                                                <div className="p-2 sticky top-0 bg-gs_black z-20">
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        className="input input-sm w-full bg-gray-500 text-white placeholder:text-white/50 focus:outline-none"
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </div>
                                                {filteredOptions.map((option) => (
                                                    <ListboxOption
                                                        key={option.value}
                                                        value={option}
                                                        className={({ active }) =>
                                                        `cursor-pointer select-none p-2 ${
                                                            active ? "bg-gray-500" : "bg-gs_black"
                                                        }`
                                                        }
                                                    >
                                                        {option.label}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </div>
                                </Listbox>
                            </>
                            :
                            <>
                                <Label htmlFor="reported" className="content-center text-md col-span-1">Report to:</Label>
                                <Input
                                    className={`placeholder:text-white/50 col-span-2 cursor-default border 
                                        ${errors.reported ? "border-gs_red" : "border-input"}`}
                                    name="reported"
                                    placeholder="Select Rental"
                                    value={selectedRental.users?.username || ""}
                                    readOnly
                                    required
                                />
                            </>
                        }
                        </div>
                        
                        <div className="grid grid-cols-3 gap-14">
                            <Label htmlFor="topic" className="content-center text-md col-span-1">Topic:</Label>
                            <Input
                                className={`placeholder:text-white/50 col-span-2 text-white-50 border ${errors.topic ? "border-gs_red" : "border-input"}`}
                                name="topic"
                                placeholder="Topic"
                                required
                                onBlur={handleBlur}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-14">
                            <Label htmlFor="details" className="text-md grid-cols-1">Details:</Label>
                            <textarea
                                className={`flex min-h-36 w-full rounded-md border bg-background px-3 py-2 text-sm text-white-50
                                            ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                                            disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-white/50 col-span-2
                                            ${errors.details ? "border-gs_red" : "border-input"}`}
                                name="details"
                                placeholder="Details"
                                required
                                onBlur={handleBlur}
                                
                            ></textarea>
                        </div>


                    </form>
                </div>

                {reportType === "rental" &&
                    <div className="col-span-1 bg-gs_black bg-opacity-50 rounded-md h-[420px] max-lg:h-[270px] overflow-y-auto max-lg:overflow-x-auto flex lg:flex-col max-lg:flex-row gap-4 p-4">
                        {filteredRentals.length > 0 ? (
                            filteredRentals.map((rental) => (
                                <div 
                                    key={rental.id} 
                                    className= "cursor-pointer max-lg:min-w-[300px]  max-lg:flex-shrink-0"
                                    onClick={() => {
                                        setSelectedRental(rental);
                                        console.log(rental);
                                        const rentalValue = userData?.isProvider ? rental.customer_id : rental.provider_id;
                                        setSelectedRentalReportedId(rentalValue);
                                    }}
                                >
                                    <ReportRentalCard reportRental={rental} isSelected={selectedRental?.id === rental.id}/>   
                                </div>
                            )) 
                        ) : (
                            <div className="w-full flex items-center justify-center my-44"> 
                                <p className="text-gray-400">No Rental Request History</p>
                            </div>
                        )}
                    </div>
                }

            </div>
            
            <div className="flex justify-center gap-10 mt-7 max-md:gap-5 max-sm:gap-3">
                <button
                    type="button"
                    className="btn rounded-full text-md bg-gs_gray bg-opacity-50 hover:bg-black hover:bg-opacity-25 border-none w-min px-16"
                    onClick={() => router.push("/home")}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    form="reportForm"
                    className="btn rounded-full text-md bg-gs_purple_gradient hover:bg-opacity-60 border-none w-min px-16"
                >
                    {isSubmitting ? "Sending.." : "Submit"}
                </button>
            </div>

        </div>
        </div>
    );
    }
