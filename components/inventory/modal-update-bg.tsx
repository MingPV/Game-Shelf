"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Boardgame, Boardgame_type } from "@/app/types/game";
import { Input } from "../ui/input";
import {
  updateGameAction,
  selectAllBoardgameType,
} from "@/app/(game-pages)/actions";
import { Label } from "../ui/label";

export default function ModalUpdateBg({
  boardgame,
  setBoardgameData,
}: {
  boardgame: Boardgame;
  setBoardgameData: Dispatch<SetStateAction<Boardgame>>;
}) {
  const [name, setName] = useState<string>(boardgame.bg_name);
  const [description, setDescription] = useState<string>(boardgame.description);
  const [price, setPrice] = useState<string>(boardgame.price.toString());
  const [quantity, setQuantity] = useState<string>(
    boardgame.quantity?.toString()
  );
  const [picture, setPicture] = useState<File>();
  const [boardgameTypes, setBoardgameTypes] = useState<Boardgame_type[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Track selected types
  const modalId = `my_modal_6_${boardgame.id}`;
  const [img, setImg] = useState<string>(boardgame.bg_picture);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(file);
      setPicture(file); // Store the file for later use
    }
  };
  const handleClickUpdate = () => {
    const formData = new FormData();
    formData.append("id", boardgame.id.toString());
    formData.append("boardgame_name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("bg_picture", picture as File);
    formData.append("quantity", quantity);

    selectedTypes.forEach((type) => {
      formData.append("boardgame_type", type); // Use '[]' for multiple values with the same name
    });

    const boardgameTmp: Boardgame = {
      id: boardgame.id,
      provider_id: boardgame.provider_id,
      bg_name: name,
      description: description,
      bg_picture: img,
      price: parseFloat(price),
      created_at: boardgame.created_at,
      status: boardgame.status,
      types: selectedTypes,
      quantity: parseFloat(quantity),
    };

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
        setBoardgameData(boardgameTmp);
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
      <div className="modal " role="dialog">
        <div className="modal-box w-3/5 max-w-2xl">
          <div className="flex flex-col  mx-auto">
            <h1 className="text-2xl font-medium">Update Game</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 w-full ">
              <Label htmlFor="boardgame_name" className="font-bold text-md">
                Boardgame Name
              </Label>
              <Input
                name="boardgame_name"
                placeholder="Boardgame Name"
                defaultValue={boardgame.bg_name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gs_white bg-opacity-10"
              />
              <Label htmlFor="description" className="font-bold text-md">
                Description
              </Label>
              <textarea
                name="description"
                placeholder="Description"
                defaultValue={boardgame.description}
                className="px-4 py-2 bg-opacity-10 border border-gs_white rounded-none bg-gs_white font-normal h-32"
                onChange={(e) => setDescription(e.target.value)}
              />

              <Label htmlFor="bg_picture" className="font-bold text-md">
                Picture URL
              </Label>
              {img && (
                <img
                  src={img}
                  className="w-64 h-64 object-cover mt-2"
                  alt="upload preview"
                />
              )}
              <input
                name="bg_picture"
                type="file"
                required
                accept="image/*"
                onChange={handleImageChange} // Handle image selection
              />
              <Label htmlFor="price" className="font-bold text-md">
                Price
              </Label>
              <Input
                name="price"
                placeholder="Price"
                defaultValue={boardgame.price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-gs_white bg-opacity-10"
              />
              <Label htmlFor="quantity" className="font-bold text-md">
                Quantity
              </Label>
              <Input
                name="quantity"
                placeholder="Quantity"
                defaultValue={boardgame.quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-gs_white bg-opacity-10"
              />
              <Label htmlFor="boardgame_type" className="font-bold text-md">
                Boardgame Type
              </Label>

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
                  className="btn rounded-md border border-gs_white border-opacity-50 hover:bg-gs_white hover:text-gs_black"
                >
                  Cancel
                </label>
                <button
                  className="btn rounded-md border border-gs_white border-opacity-50 hover:bg-gs_white hover:text-gs_black"
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
