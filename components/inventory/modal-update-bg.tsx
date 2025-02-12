"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Boardgame, Boardgame_type } from "@/app/types/game";
import { Input } from "../ui/input";
import {
  updateGameAction,
  selectAllBoardgameType,
} from "@/app/(game-pages)/actions";
import { Label } from "../ui/label";

export default function ModalUpdateBg({ boardgame }: { boardgame: Boardgame }) {
  console.log(boardgame);

  const [name, setName] = useState<string>(boardgame.bg_name);
  const [description, setDescription] = useState<string>(boardgame.description);
  const [price, setPrice] = useState<number>(boardgame.price);
  const [picture, setPicture] = useState<File>();
  const [boardgameTypes, setBoardgameTypes] = useState<Boardgame_type[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Track selected types
  const modalId = `my_modal_6_${boardgame.id}`;

  const handleClickUpdate = () => {
    const formData = new FormData();
    formData.append("id", boardgame.id.toString());
    formData.append("boardgame_name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("bg_picture", picture as File);

    selectedTypes.forEach((type) => {
      formData.append("boardgame_type", type); // Use '[]' for multiple values with the same name
    });

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
        console.log(formData);
        await updateGameAction(formData);
        Swal.fire({
          title: "Updated!",
          text: "Your file has been updated.",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        }).then(() => {
          const modalCheckbox = document.getElementById(
            modalId
          ) as HTMLInputElement;
          if (modalCheckbox) {
            modalCheckbox.checked = false;
          }
        });
      }
    });
  };

  const getBoardgameType = async () => {
    const data = await selectAllBoardgameType();
    setBoardgameTypes(data);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedTypes((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((type) => type !== value);
      }
    });
  };

  useEffect(() => {
    getBoardgameType();
    // Set selected types from the existing boardgame
    setSelectedTypes(boardgame.types);
  }, [boardgame]);

  return (
    <>
      <label htmlFor={modalId} className="btn btn-outline">
        edit condition
      </label>

      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="flex flex-col min-w-64 max-w-96 mx-auto">
            <h1 className="text-2xl font-medium">Update Game</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="boardgame_name">Boardgame Name</Label>
              <Input
                name="boardgame_name"
                placeholder="Boardgame Name"
                defaultValue={boardgame.bg_name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gs_white bg-opacity-10"
              />
              <Label htmlFor="description">Description</Label>
              <textarea
                name="description"
                placeholder="Description"
                defaultValue={boardgame.description}
                className="px-4 py-2 bg-opacity-10 border border-gs_white rounded-none bg-gs_white font-normal h-24"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Label htmlFor="bg_picture" className="pt-1">
                Picture{" "}
                <span className="text-gs_green text-xs">
                  *choose new picture if you need to change
                </span>
              </Label>
              <Input
                type="file"
                name="bg_picture"
                placeholder="Picture URL"
                className="bg-gs_white bg-opacity-10"
                onChange={(e) => setPicture(e.target.files?.[0])}
              />
              <Label htmlFor="price">Price</Label>
              <Input
                name="price"
                placeholder="Price"
                defaultValue={boardgame.price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                className="bg-gs_white bg-opacity-10"
              />
              <div className="flex flex-col gap-2">
                {boardgameTypes?.map((type, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="boardgame_type"
                      value={type.bg_type_id}
                      checked={selectedTypes.includes(
                        type.bg_type_id.toString()
                      )} // Check if selected
                      onChange={handleCheckboxChange}
                    />
                    <p>{type.bg_type}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-row gap-2 items-center justify-end ">
                <label
                  htmlFor={modalId}
                  className="btn rounded-none border border-gs_white border-opacity-50 hover:bg-gs_white hover:text-gs_black"
                >
                  Cancel
                </label>
                <button
                  className="btn rounded-none border border-gs_white border-opacity-50 hover:bg-gs_white hover:text-gs_black"
                  onClick={handleClickUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
