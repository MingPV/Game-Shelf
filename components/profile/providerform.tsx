"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UserData } from "@/app/types/user";
import { updateProviderAction2 } from "@/app/(user-pages)/actions";

export default function UserForm({user} : { user: UserData}) {
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
      <div className="bg-white bg-opacity-10 ml-4 rounded-xl p-4 flex-col flex justify-center items-center w-[500px]">
        <div className="text-xl mb-3">Edit Profile</div>
        <div className="grid grid-cols-10 gap-5">
            <Label htmlFor="id" className="font-bold text-md col-span-3">
                ID :
            </Label>
            <Input
                name="id"
                placeholder="ID"
                value={user.uid}
                className="bg-gs_white bg-opacity-10 col-span-7"
                disabled
            />
            <Label htmlFor="username" className="font-bold text-md col-span-3">
                Username :
            </Label>
            <Input
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gs_white bg-opacity-10 col-span-7 border-white border-opacity-60"
            />

            <Label htmlFor="email" className="font-bold text-md col-span-3">
                E-mail :
            </Label>
            <Input
                name="email"
                placeholder="E-mail"
                value={user.email}
                className="bg-gs_white bg-opacity-10 col-span-7"
                disabled
            />
            <Label htmlFor="phoneNumber" className="font-bold text-md col-span-3">
                Phone Number :
            </Label>
            <Input
                name="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-gs_white bg-opacity-10 col-span-7 border-white border-opacity-60"
            />
            <Label htmlFor="location" className="font-bold text-md col-span-3">
                Location : 
            </Label>
            <textarea
                name="location"
                placeholder="Location"
                value  = {location}
                className="px-4 py-2 bg-opacity-10 border border-white border-opacity-60 rounded-md bg-gs_white font-normal h-32 col-span-7"
                onChange={(e) => setLocation(e.target.value)}
            />
            <Label htmlFor="credentials" className="font-bold text-md col-span-3">
                Credentials :
            </Label>
            <Input
                name="credentials"
                placeholder="Credentials"
                value={credentials}
                onChange={(e) => setCredentials(e.target.value)}
                className="bg-gs_white bg-opacity-10 col-span-7 border-white border-opacity-60"
            />
        </div>
        <div className="items-center justify-center flex flex-row">
            <button className="btn bg-white bg-opacity-10 border-white border-opacity-80 border-1 mr-7 mt-5 px-10" onClick={handleClickCancel}>Cancel</button>
            <button className="btn bg-white bg-opacity-10 border-white border-opacity-80 border-1 ml-7 mt-5 px-10" onClick={handleClickUpdate}>Update</button>
        </div>
      </div>
      
    </>
  );
}
