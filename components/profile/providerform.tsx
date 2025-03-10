"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Swal from "sweetalert2";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UserData } from "@/app/types/user";
import { updateProviderAction2 } from "@/app/(user-pages)/actions";
import IconMenu from "./iconmenu";


export default function ProviderForm({user, setWindow} : { user: UserData, setWindow: Dispatch<SetStateAction<string>> }) {
  const [username, setUsername] = useState<string>(user.username);
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber);
  const [location, setLocation] = useState<string>(user.location);
  const [credentials, setCredentials] = useState<string>(user.credentials);

  const handleClickCancel = () => {
    console.log(user.location);
    setUsername(user.username);
    setPhoneNumber(user.phoneNumber);
    setLocation(user.location);
    setCredentials(user.credentials);
  };
  const handleClickUpdate = () => {
    const formData = new FormData();
    formData.append("id", user.uid.toString());
    formData.append("username", username);
    formData.append("phoneNumber", phoneNumber);
    formData.append("location", location);
    formData.append("credentials", credentials);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#359368",
      cancelButtonColor: "#FF2525",
      confirmButtonText: "Yes, update it!",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateProviderAction2(formData);
        Swal.fire({
          title: "Updated!",
          text: "Your profile has been updated.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        })
        ;
      }
    });
  };

  return (
    <>
      <div className="bg-white bg-opacity-10 rounded-xl p-6 md:px-8 mx-4 flex-col flex justify-center items-center w-[320px] md:w-[400px]">
      <div className="flex justify-between items-center w-full">
        <IconMenu type={'provider'} setWindow={setWindow}/>
        <div className="mx-auto text-lg md:hidden">Edit Profile</div>
      </div>
        <div className="hidden md:block text-xl mb-3">Edit Profile</div>
        <div className="grid grid-cols-10 gap-5">
            <Label htmlFor="id" className="font-bold md:text-md col-span-4 mt-1 md:mt-2">
                ID :
            </Label>
            <Input
                name="id"
                placeholder="ID"
                value={user.uid}
                className="bg-gs_white bg-opacity-10 col-span-6"
                disabled
            />
            <Label htmlFor="username" className="font-bold md:text-md col-span-4 mt-1 md:mt-2">
                Username :
            </Label>
            <Input
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gs_white bg-opacity-10 col-span-6 border-white border-opacity-60"
            />

            <Label htmlFor="email" className="font-bold md:text-md col-span-4 mt-1 md:mt-2">
                E-mail :
            </Label>
            <Input
                name="email"
                placeholder="E-mail"
                value={user.email}
                className="bg-gs_white bg-opacity-10 col-span-6"
                disabled
            />
            <Label htmlFor="phoneNumber" className="font-bold md:text-md col-span-4 mt-1 md:mt-2">
                Phone Number :
            </Label>
            <Input
                name="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-gs_white bg-opacity-10 col-span-6 border-white border-opacity-60"
            />
            <Label htmlFor="location" className="font-bold md:text-md col-span-4 mt-1 md:mt-2">
                Location : 
            </Label>
            <textarea
                name="location"
                placeholder="Location"
                value  = {location}
                className="px-4 py-2 bg-opacity-10 border border-white border-opacity-60 rounded-md bg-gs_white font-normal h-32 col-span-6"
                onChange={(e) => setLocation(e.target.value)}
            />
            <Label htmlFor="credentials" className="font-bold md:text-md col-span-4 mt-1 md:mt-2">
                Credentials :
            </Label>
            <Input
                name="credentials"
                placeholder="Credentials"
                value={credentials}
                onChange={(e) => setCredentials(e.target.value)}
                className="bg-gs_white bg-opacity-10 col-span-6 border-white border-opacity-60"
            />
        </div>
        <div className="items-center justify-center flex flex-row p-5 mt-1">
            <button className="btn bg-white bg-opacity-10 border-white border-opacity-80 mx-4 border-1" onClick={handleClickCancel}>Cancel</button>
            <button className="btn bg-white bg-opacity-10 border-white border-opacity-80 mx-4 border-1" onClick={handleClickUpdate}>Update</button>
        </div>
      </div>
      
    </>
  );
}
