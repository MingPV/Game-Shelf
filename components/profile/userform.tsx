"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UserData } from "@/app/types/user";
import { updateUserAction } from "@/app/(user-pages)/actions";
import { RiEdit2Line } from "react-icons/ri";

export default function UserForm({
  user,
  setWindow,
}: {
  user: UserData;
  setWindow: Dispatch<SetStateAction<string>>;
}) {
  const [username, setUsername] = useState<string>(user.username);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user.phoneNumber ? user.phoneNumber : "-"
  );
  const [location, setLocation] = useState<string>(
    user.location ? user.location : "-"
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const toggleEditMode = () => {
    if (editMode) {
      // Reset values when switching from edit mode to view mode
      setUsername(user.username || "-");
      setPhoneNumber(user.phoneNumber || "-");
      setLocation(user.location || "-");
    }
    setEditMode(!editMode);
  };
  const handleClickCancel = () => {
    console.log(user.location);
    setUsername(user.username || "-");
    setPhoneNumber(user.phoneNumber || "-");
    setLocation(user.location || "-");
    setEditMode(false);
  };
  const handleClickUpdate = () => {
    const formData = new FormData();
    formData.append("id", user.uid.toString());
    formData.append("username", username);
    formData.append("phoneNumber", phoneNumber);
    formData.append("location", location);

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
        // await updateUserAction(formData);
        const updateData = {
          id: user.uid.toString(),
          username: username,
          phoneNumber: phoneNumber,
          location: location,
        };
        await fetch("/api/users/players", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updateData,
          }),
        });
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          title: "Updated!",
          text: "Your profile has been updated.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
    });
  };

  if (!user) {
    return (
      <>
        <div>loading</div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white bg-opacity-10 ml-4 rounded-xl p-4 flex-col flex justify-center items-center">
        <div className="flex justify-between items-center w-full ">
          <details className="dropdown md:hidden">
            <summary className="btn p-0 border-0 bg-white bg-opacity-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </summary>
            <ul className="menu dropdown-content bg-base-100 isolation rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <button onClick={() => setWindow("profile")}>My Profile</button>
              </li>

              <li>
                <button onClick={() => setWindow("rental")}>My Rental</button>
              </li>
              <li>
                <button onClick={() => setWindow("to-pay")}>To Pay</button>
              </li>
            </ul>
          </details>
          <div className="mx-auto text-lg md:hidden">Edit Profile</div>
        </div>
        <div className="hidden md:flex text-xl  flex-row mb-3 text-left  w-full justify-between">
          <p>Edit Profile </p>
          <button className="hover:text-gs_yellow" onClick={toggleEditMode}>
            <RiEdit2Line
              className={`text-xl ${editMode ? "text-gs_yellow" : "text-white"}`}
            />
          </button>
        </div>
        <div className="grid grid-cols-11 gap-5 w-full">
          <Label htmlFor="id" className="font-bold md:text-md col-span-3  py-3">
            ID :
          </Label>
          <Input
            name="id"
            placeholder="ID"
            value={user.uid}
            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent ${editMode ? "" : "border-none "}`}
            disabled
          />
          <Label
            htmlFor="username"
            className="font-bold md:text-md col-span-3  py-3 "
          >
            Username :
          </Label>
          <Input
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent ${editMode ? "" : "border-none "}`}
            disabled
            style={{ color: "white", opacity: editMode ? 0.5 : 1 }}
          />

          <Label
            htmlFor="email"
            className="font-bold md:text-md col-span-3  py-3"
          >
            E-mail :
          </Label>
          <Input
            name="email"
            placeholder="E-mail"
            value={user.email}
            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent ${editMode ? "" : "border-none "}`}
            disabled
            style={{ color: "white", opacity: editMode ? 0.5 : 1 }}
          />
          <Label
            htmlFor="phoneNumber"
            className="font-bold md:text-md col-span-3  py-3"
          >
            Phone Number :
          </Label>
          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value || "-")}
            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent ${editMode ? "" : "border-none "}`}
            disabled={!editMode}
            style={{ color: "white", opacity: 1 }}
          />
          <Label
            htmlFor="location"
            className="font-bold md:text-md col-span-3  py-3"
          >
            Location :
          </Label>
          <textarea
            name="location"
            placeholder="Location"
            value={location}
            className={` w-full font-normal bg-transparent col-span-8 border-white border-opacity-60 ${editMode ? "border border-white rounded-md" : "resize-none border-none bg-transparent"} py-2 px-3`}
            disabled={!editMode}
            style={{ color: "white", opacity: 1 }}
            onChange={(e) => {
              if (editMode) setLocation(e.target.value || "-");
            }}
          />
        </div>
        {editMode && (
          <div className=" grid grid-cols-2 w-full pt-5  gap-4">
            <button
              className="cols-span-1  btn btn-outline  bg-transparent  border-white border-opacity-80  border-1"
              onClick={handleClickCancel}
            >
              Cancel
            </button>
            <button
              className="cols-span-1  btn btn-outline  bg-transparent  border-white border-opacity-80  border-1"
              onClick={handleClickUpdate}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </>
  );
}
