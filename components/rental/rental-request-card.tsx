"use client";

import { selectGameAction } from "@/app/(game-pages)/actions";
import {
  deleteRentingRequest,
  updateRentingRequestStatus,
} from "@/app/(rental-pages)/actions";
import {
  createNotificationByUserId,
  selectUserById,
} from "@/app/(user-pages)/actions";
import { Boardgame, RentingRequest } from "@/app/types/game";
import { UserData } from "@/app/types/user";
import { useEffect, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface RequestCardProps {
  rentalRequest: RentingRequest;
}

export default function RequestCard({ rentalRequest }: RequestCardProps) {
  const [profileURL, setProfileURL] = useState("/mock_provider.jpeg");
  const [boardgame, setBoardgame] = useState<Boardgame>();
  const [customer, setCustomer] = useState<UserData>();
  const [isHidden, setIsHidden] = useState(false);
  const [overallPrice, setOverallPrice] = useState<Number>();

  useEffect(() => {
    //   if (params.users.profilePicture) {
    //     setProfileURL(params.users.profilePicture);
    //   }

    async function fetchBoardgame() {
      const res = await selectGameAction(rentalRequest.bg_id);
      setBoardgame(res);

      const startDate = new Date(rentalRequest.start_date);
      const endDate = new Date(rentalRequest.end_date);

      // Calculate the difference in days
      const timeDiff = endDate.getTime() - startDate.getTime();
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      // Calculate total price
      const overallPriceTmp = days * res.price;

      setOverallPrice(overallPriceTmp);
    }

    async function fetchPlayer() {
      const res = await selectUserById(rentalRequest.customer_id);
      if (res.length > 0) {
        setCustomer(res[0]);
      }
    }

    fetchBoardgame();
    fetchPlayer();
    setProfileURL(customer?.profilePicture || "/mock_provider.jpeg");
  }, []);

  async function createCheckoutSession(
    amount: number,
    productName: string,
    customer_id: string,
    provider_id: string,
    request_id: number
  ) {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount, // Amount in THB (or another currency)
          productName, // Name of the product
          customer_id,
          provider_id,
          request_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const result = await response.json();

      // Redirect to Stripe checkout session URL
      // if (result.session?.url) {
      //   window.location.href = result.session.url;
      // } else {
      //   console.error("No checkout URL found:", result);
      // }

      return result;
    } catch (error) {
      console.error("Error during checkout:", error);
      return null;
    }
  }

  const handleAccept = () => {
    if (!customer || !boardgame) {
      return;
    }
    updateRentingRequestStatus(rentalRequest.id, "waiting for payment");

    if (overallPrice !== undefined) {
      createCheckoutSession(
        overallPrice as number,
        boardgame?.bg_name || "",
        rentalRequest.customer_id,
        rentalRequest.provider_id,
        rentalRequest.id
      );
    } else {
      console.error("Overall price is undefined");
    }

    setIsHidden(true);
  };

  const handleDeny = () => {
    if (!customer || !boardgame) {
      return;
    }

    deleteRentingRequest(rentalRequest.id);
    // send notification and insert it and send email
    const message = `Your rental request for the board game ${boardgame?.bg_name} has been denied. We're sorry for the inconvenience.`;
    if (customer?.uid) {
      createNotificationByUserId(customer.uid, message);
    }

    // Close the modal
    const modal = document.getElementById(
      `my_modal_2_${rentalRequest.id}`
    ) as HTMLDialogElement;
    modal?.close();

    // Remove the card from UI
    setIsHidden(true);
  };

  return !isHidden ? (
    <>
      <div
        className="flex flex-col justify-center rounded-sm border border-white border-opacity-30 p-4 w-full cursor-pointer hover:bg-black hover:bg-opacity-10"
        onClick={() => {
          const modal = document.getElementById(
            `my_modal_2_${rentalRequest.id}`
          );
          if (modal) {
            (modal as HTMLDialogElement).showModal();
          }
        }}
      >
        <div className="flex flex-col gap-4 sm:gap-0 sm:grid sm:grid-flow-col sm:grid-cols-12 items-center ">
          <div className="col-span-6 md:col-span-5 lg:col-span-4 flex gap-2 items-center font-bold">
            <div className="flex relative h-7 w-7 rounded-full">
              <img
                alt="provider profile"
                src={profileURL}
                sizes="28px"
                className="rounded-full"
              />
            </div>
            {customer?.username}
          </div>
          <div className="flex flex-row justify-start sm:col-span-5  md:col-span-3 lg:col-span-2 text-sm">
            <div className="sm:hidden">Boardgame name : </div>
            <div>{boardgame?.bg_name}</div>
          </div>
          <div className="hidden md:block md:col-span-3 lg:col-span-2 text-sm ">
            {boardgame?.price} Bath/day
          </div>
          <div className="hidden lg:flex col-span-3 text-sm  items-center justify-start">
            {String(new Date(rentalRequest.start_date).getDate()).padStart(
              2,
              "0"
            )}
            {"/"}
            {String(new Date(rentalRequest.start_date).getMonth() + 1).padStart(
              2,
              "0"
            )}
            {" - "}
            {String(new Date(rentalRequest.end_date).getDate()).padStart(
              2,
              "0"
            )}
            {"/"}
            {String(new Date(rentalRequest.end_date).getMonth() + 1).padStart(
              2,
              "0"
            )}{" "}
            {new Date(rentalRequest.end_date).getFullYear()}
          </div>
          <div className="col-span-1 text-sm flex gap-2  items-center justify-end">
            <button className="btn btn-outline btn-sm">
              <FaXmark />
            </button>
            <button className="btn btn-success btn-sm">
              <FaCheck />
            </button>
          </div>
        </div>
      </div>
      <dialog id={`my_modal_2_${rentalRequest.id}`} className="modal">
        <div className="modal-box bg-slate-50 w-[60vw] h-[60vh] flex flex-col text-black">
          <div className="flex flex-row w-full h-1/2">
            <div className="w-1/2 h-full">
              <img className="w-full h-full" src={profileURL} />
            </div>
            <div className="ml-4 w-1/2 h-full ">
              <div className="m-2 text-sm opacity-60 font-thin">
                <div className=" my-2 font-bold">Next Step</div>
                If you accept the request, the next step is to wait for the
                player to complete the payment for the board game rental. Once
                the payment is confirmed, you will need to send the board game
                to the player.
              </div>
            </div>
          </div>
          <div className="flex flex-row h-1/2 w-full items-start mt-4">
            <div className="flex flex-col">
              <div className="opacity-30 mt-2 sm:text-xs md:text-sm">
                Boardgame name
              </div>
              <div className="text-sm md:text-md">{boardgame?.bg_name}</div>
              <div className="opacity-30 mt-2 sm:text-xs md:text-sm">Price</div>
              <div className="text-sm md:text-md">
                {boardgame?.price} Bath/Day
              </div>
              <div className="opacity-30 mt-2 sm:text-xs md:text-sm">
                Reservation
              </div>
              <div className="text-sm md:text-md">
                {String(new Date(rentalRequest.start_date).getDate()).padStart(
                  2,
                  "0"
                )}
                {"/"}
                {String(
                  new Date(rentalRequest.start_date).getMonth() + 1
                ).padStart(2, "0")}
                {" - "}
                {String(new Date(rentalRequest.end_date).getDate()).padStart(
                  2,
                  "0"
                )}
                {"/"}
                {String(
                  new Date(rentalRequest.end_date).getMonth() + 1
                ).padStart(2, "0")}{" "}
                {new Date(rentalRequest.end_date).getFullYear()}
              </div>
              <div className="flex flex-row gap-2 mt-6">
                <div className="flex relative h-7 w-7 rounded-full ">
                  <img
                    alt="provider profile"
                    src={profileURL}
                    sizes="28px"
                    className="rounded-full"
                  />
                </div>
                {customer?.username}
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-end items-end h-full">
              <div className="opacity-30 mb-1 text-sm">overall price</div>
              <div className="mb-6 text-xl sm:text-2xl md:text-4xl font-bold">
                {overallPrice?.toString()} Bath
              </div>
              <div>
                {" "}
                <div className="col-span-1 text-sm flex gap-2  items-center justify-end ">
                  <button
                    className="btn btn-outline btn-sm border border-slate-400 hover:bg-slate-200 "
                    onClick={handleDeny}
                  >
                    <div className="opacity-80 text-slate-400 hidden sm:block">
                      Denine
                    </div>

                    <FaXmark className="text-slate-400" />
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleAccept}
                  >
                    <div className="opacity-80 hidden sm:block">Accept</div>
                    <FaCheck />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="cursor-default">close</button>
        </form>
      </dialog>
    </>
  ) : (
    <></>
  );
}
