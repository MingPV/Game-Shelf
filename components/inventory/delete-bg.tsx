"use client";
import { deleteGameAction } from "@/app/(game-pages)/actions";
import { Router } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function DeleteBoardgame({
  boardgameId,
}: {
  boardgameId: number;
}) {
  const router = useRouter();

  const handleDelete = () => {
    // const formData = new FormData();
    // formData.append("id", boardgameId.toString());

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#359368",
      cancelButtonColor: "#FF2525",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteGameAction(boardgameId.toString());
        // await fetch("/api/boardgames", {
        //   method: "DELETE",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     boardgameId: boardgameId.toString(),
        //   }),
        // });
        router.refresh();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        }).then(() => {
          // Close the modal
          const modalCheckbox = document.getElementById(
            "my_modal_6"
          ) as HTMLInputElement;
          if (modalCheckbox) {
            modalCheckbox.checked = false;
          }
        });
      }
    });
  };

  return (
    <button className="btn btn-outline ml-3" onClick={handleDelete}>
      Delete
    </button>
  );
}
