"use client";
import { UserData } from "@/app/types/user";
import { useState } from "react";
import Swal from "sweetalert2";
import { updateProfilePicAction } from "@/app/(user-pages)/actions";

export default function ProfileHeader({ user }: { user: UserData }) {
  const [picture, setPicture] = useState<File>();
  const [img, setImg] = useState<string>(
    user.profilePicture
      ? user.profilePicture
      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );

  const handleClickUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    //
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(file);
      setPicture(file); // Store the file for later use
    }
    //
    const formData = new FormData();
    formData.append("id", user.uid.toString());
    formData.append("profile_picture", file as File);

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
        console.log("update");
        await updateProfilePicAction(formData);
        Swal.fire({
          title: "Updated!",
          text: "Your file has been updated.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      } else {
        setImg(
          user.profilePicture
            ? user.profilePicture
            : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        );
      }
    });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleClickUpdate}
            className="hidden"
          />
          <img
            src={img}
            alt="profile picture"
            className="w-32 h-32 object-cover border rounded-full"
          />
        </label>
      </div>
    </>
  );
}
