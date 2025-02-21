"use client";
import { useSearchParams } from "next/navigation";
import { addGameAction, selectAllBoardgameType } from "../actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Boardgame_type } from "@/app/types/game";
import { useState, useEffect, useRef, Suspense } from "react";
import { Boardgame } from "@/app/types/game";
import Swal from "sweetalert2";
function AddGameForm(props: { searchParams: Promise<Message> }) {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  if (message) {
    const parsedMessage: Message | null = message ? JSON.parse(message) : null;

    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        {parsedMessage && <FormMessage message={parsedMessage} />}
      </div>
    );
  }

  const [img, setImg] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [picture, setPicture] = useState<File>();
  const [boardgameTypes, setBoardgameTypes] = useState<Boardgame_type[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Track selected types
  const fetchboardgameTypes = async () => {
    const boardgametypes = await selectAllBoardgameType();
    setBoardgameTypes(boardgametypes);
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

  const handleAddgame = () => {
    const formData = new FormData();
    formData.append("boardgame_name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("bg_picture", picture as File);
    formData.append("quantity", quantity);

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
        await addGameAction(formData);
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
          setName("");
          setPrice("");
          setQuantity("");
          setDescription("");
          setPicture(undefined);
          setSelectedTypes([]);
          setImg("");
          resetImage;
        });
      }
    });
  };

  useEffect(() => {
    fetchboardgameTypes();
  }, []);

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

  const resetImage = () => {
    setImg(""); // Clear the preview
    setPicture(undefined); // Clear the file state
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input field
    }
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 w-full">
        <div className="flex flex-col items-center justify-center font-bold">
          <div className="flex flex-col w-4/5 max-w-5xl mx-auto ">
            <h1 className="text-2xl font-bold text-center">
              Add new game to your shelf
            </h1>
            <div className="flex flex-col w-full gap-2 lg:gap-4">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 [&>input]:mb-3 mt-8">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="boardgame_name" className="font-bold text-md">
                    Boardgame Name
                  </Label>
                  <Input
                    name="boardgame_name"
                    placeholder="Boardgame Name"
                    className="placeholder:opacity-50"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                  <Label htmlFor="description" className="font-bold text-md">
                    Description
                  </Label>
                  <Input
                    name="description"
                    placeholder="Description"
                    className="placeholder:opacity-50"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
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
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="price" className="font-bold text-md">
                    Price
                  </Label>
                  <Input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="placeholder:opacity-50"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    required
                  />
                  <Label htmlFor="quantity" className="font-bold text-md">
                    Quantity
                  </Label>
                  <Input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    className="placeholder:opacity-50"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
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
                          )}
                          onChange={handleCheckboxChange}
                        />
                        <p>{type.bg_type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddgame}
                  className=" w-32 align-end btn rounded border border-gs_white  hover:bg-gs_white hover:text-gs_black"
                >
                  Add Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function Home(props: { searchParams: Promise<Message> }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddGameForm searchParams={props.searchParams} />
    </Suspense>
  );
}
