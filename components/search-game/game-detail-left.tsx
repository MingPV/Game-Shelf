'use client'

import { Boardgame } from "@/app/types/game";
import HeartButton from "./heart-button";
import { useEffect, useState } from "react";
import { UserData } from "@/app/types/user";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import { Input } from "../ui/input";

export default function GameDetailLeft({ boardgame, provider }: { boardgame: Boardgame, provider: UserData }) {
    const [filled, setFilled] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const [errorTextStartDate, setErrorTextStartDate] = useState<string>("");
    const [errorTextEndDate, setErrorTextEndDate] = useState<string>("");
    const [totalDate, setTotalDate] = useState<number>(0)

    const [note, setNote] = useState<string>('')

    const handleStartDateChange = (date: Dayjs | null) => {
        if (!date) return;

        if (date.isBefore(dayjs(), "day") || (endDate && date.isAfter(endDate, "day"))) {
            setErrorTextStartDate("invalid booking");
        } else {
            setErrorTextStartDate("");
            setStartDate(date);
        }
    };

    const handleEndDateChange = (date: Dayjs | null) => {
        if (!date) return;

        if (date.isBefore(dayjs(), "day") || (startDate && date.isBefore(startDate, "day"))) {
            setErrorTextEndDate("invalid booking");
        } else {
            setErrorTextEndDate("");
            setEndDate(date);
        }
    }

    const calculateTotalDate = () => {
        if (!endDate || !startDate) return ""
        if (errorTextStartDate || errorTextEndDate) return ""

        const totalDate = endDate.diff(startDate, "day")

        setTotalDate(totalDate)
    }

    useEffect(() => { calculateTotalDate() }, [startDate, endDate, errorTextEndDate, errorTextStartDate])

    return (
        <div className="flex flex-col p-10 bg-white/10 rounded-xl items-center justify-between gap-6 lg:min-w-96 lg:max-w-md sm:w-48 md:w-64">
            <div className="lg:w-64 sm:w-24 md:w-48 rounded-xl">
                <img
                    src={boardgame.bg_picture}
                    alt={boardgame.bg_name}
                    className="rounded-xl"
                />
            </div>

            <div className="space-y-1 w-full">
                <div className="flex flex-row justify-between text-md text-gs_white/50 w-full">
                    <p>name</p>
                    <p>baht / day</p>
                </div>

                <div className="flex flex-row justify-between text-2xl font-semibold text-gs_white w-full gap-10">
                    <p>{boardgame.bg_name}</p>
                    <p>{boardgame.price}</p>
                </div>
            </div>

            <div className="flex flex-row w-full gap-2">
                <HeartButton filled={filled} onChange={(filled: boolean) => setFilled(filled)} />
                <button
                    className="w-full font-semibold text-sm px-4 rounded-xl py-2 self-end hover:border bg-gs_purple_gradient"
                    onClick={() => setOpenDialog(true)}
                >
                    Booking Here
                </button>
            </div>

            <dialog open={openDialog} className="modal">
                <div className="modal-box bg-slate-50 flex-frow h-[60vh] flex flex-col text-black space-y-5">
                    <p className="font-bold text-3xl">Booking Request</p>

                    <div className="flex flex-row w-full">
                        <p className="w-[20%] font-semibold">Name :</p>
                        <p className="w-[80%]">{boardgame.bg_name}</p>
                    </div>

                    <div className="flex flex-row w-full">
                        <p className="w-[20%] font-semibold">Store :</p>
                        <p className="w-[80%]">{provider.username}</p>
                    </div>

                    <div className="flex flex-row w-full">
                        <p className="w-[20%] font-semibold">Price :</p>
                        <p className="w-[80%]">{boardgame.price} Bath/Day</p>
                    </div>

                    <div className="flex flex-row w-full items-center">
                        <p className="w-[20%] font-semibold">Date :</p>
                        <div className="flex flex-row gap-4">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    format="M/D/YY"
                                    sx={{ width: "150px", ".MuiInputBase-root": { height: "30px" } }}
                                    onChange={(date) => handleStartDateChange(date)}
                                    slots={{
                                        textField: (params) => (
                                            <TextField {...params} error={!!errorTextStartDate} helperText={errorTextStartDate} />
                                        ),
                                    }} />
                            </LocalizationProvider>
                            <p>to</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    format="M/D/YY"
                                    sx={{ width: "150px", ".MuiInputBase-root": { height: "30px" } }}
                                    onChange={(date => handleEndDateChange(date))}
                                    slots={{
                                        textField: (params) => (
                                            <TextField {...params} error={!!errorTextEndDate} helperText={errorTextEndDate} />
                                        ),
                                    }} />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div className="flex flex-row w-full">
                        <p className="w-[20%] font-semibold">Total :</p>
                        <p className="w-[80%]">{totalDate} Days ({boardgame.price * totalDate} Bath in Total)</p>
                    </div>

                    <div className="flex flex-row w-full items-center">
                        <p className="w-[20%] font-semibold">Note :</p>
                        <TextField variant="outlined" size="small" className="w-[75%]" value={note} onChange={(e)=>setNote(e.target.value)}/>
                    </div>

                    <div className="w-full flex flex-row justify-between text-white h-9 gap-4 my-6">
                        <button onClick={() => setOpenDialog(false)} className="w-1/2 border rounded-xl bg-red-500">cancle</button>
                        <button className="w-1/2 border rounded-xl bg-green-500" onClick={()=>alert(`confirm!\n${note? "Note : "+note:"No note add."}`)}>comfirm</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}