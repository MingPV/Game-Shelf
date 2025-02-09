"use client";
import { deleteGameAction } from "@/app/(game-pages)/actions";
import Swal from "sweetalert2";

export default function DeleteBoardgame({
  boardgameId,
}: {
  boardgameId: number;
}) {
  console.log("from delete bg", boardgameId);

  const handleDelete = () => {
    console.log("in handler delete bg");
    const formData = new FormData();
    formData.append("id", boardgameId.toString());

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
        console.log(formData);
        await deleteGameAction(formData);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
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
    <button className="btn btn-primary-content" onClick={handleDelete}>
      Delete
    </button>
  );
}
