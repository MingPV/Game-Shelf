"use client";
import { selectMyRentingRequest } from "@/app/(rental-pages)/actions";
import {
  getMyUserData,
  selectProviderBoardgameByFilterAction,
  selectReviewByProviderId,
} from "@/app/(user-pages)/actions";
import { Boardgame, RentingRequest } from "@/app/types/game";
import { ReviewData } from "@/app/types/review";
import { UserData } from "@/app/types/user";
import { useEffect, useState } from "react";
import BoardgameCard, { BoardgameLoadingCard } from "./boardgame-card";
import RentalCard from "./rental-card";
import RequestCard from "./request-card";
import ReviewCard from "./review-card";
import LastBoardgameCard from "./last-boardgame-card";
import { VscGraphLine } from "react-icons/vsc";
import { MdInventory2 } from "react-icons/md";
import { MdRateReview } from "react-icons/md";

export function ProviderManage() {
  const [provider, setProvider] = useState<UserData>();
  const [boardgames, setBoardgames] = useState<Boardgame[]>();
  const [rentalRequests, setRentalRequests] = useState<RentingRequest[]>();
  const [reviews, setReviews] = useState<ReviewData[]>();
  const [isLoadingBoardgame, setIsLoadingBoardgame] = useState(true);
  const [isLoadingRental, setIsLoadingRental] = useState(true);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUserData = await getMyUserData();
      setProvider(fetchUserData);

      if (fetchUserData) {
        const { data: fetchData } = await selectProviderBoardgameByFilterAction(
          "",
          fetchUserData.uid,
          []
        );

        setBoardgames(fetchData);
        setIsLoadingBoardgame(false);

        const rentalsData = await selectMyRentingRequest();
        setRentalRequests(rentalsData || []);
        setIsLoadingRental(false);

        const reviewsData = await selectReviewByProviderId(fetchUserData.uid);

        setReviews(reviewsData);
        setIsLoadingReview(false);
      }
    };

    fetchData();

    // fetch rental requests
    // fetch reviews
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-6 bg-black bg-opacity-10 border border-white border-opacity-10 rounded-md overflow-x-hidden">
      <div className="p-4 w-full h-full gap-8 flex flex-col overflow-x-hidden">
        <div className="w-full bg-black bg-opacity-20 flex flex-row gap-4 overflow-x-auto px-4 py-8">
          <a
            href="/home"
            className="flex flex-row justify-center items-center gap-2 bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-10 text-white text-opacity-80 hover:text-opacity-30 font-bold transition duration-300 "
          >
            Dashboard
            <span>
              <VscGraphLine />
            </span>
          </a>
          <a
            href="/inventory"
            className="flex flex-row justify-center items-center gap-2 bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-10 text-white text-opacity-80 hover:text-opacity-30 font-bold transition duration-300 "
          >
            Inventory
            <span>
              <MdInventory2 />
            </span>
          </a>
          <a
            href="/rental-request"
            className="flex flex-row justify-center items-center gap-2 bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-10 text-white text-opacity-80 hover:text-opacity-30 font-bold transition duration-300 "
          >
            Rental request
          </a>
          <a
            href="/home"
            className="flex flex-row justify-center items-center gap-2 bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-10 text-white text-opacity-80 hover:text-opacity-30 font-bold transition duration-300 "
          >
            Rental status
          </a>
          <a
            href={`/profile/${provider?.username}`}
            className="flex flex-row justify-center items-center gap-2 bg-white bg-opacity-20 rounded-lg p-4 hover:bg-opacity-10 text-white text-opacity-80 hover:text-opacity-30 font-bold transition duration-300 "
          >
            Reviews
            <span>
              <MdRateReview />
            </span>
          </a>
        </div>
        <div className="w-full bg-black bg-opacity-20 flex flex-col overflow-x-hidden px-4 py-8 min-h-60">
          <div className="mb-4 ml-4 font-bold text-white text-opacity-80 ">
            My Boardgames
          </div>
          <div className="flex flex-row overflow-x-scroll h-full">
            {!isLoadingBoardgame ? (
              boardgames && boardgames.length > 0 ? (
                <>
                  {boardgames.map((boardgame) => (
                    <BoardgameCard
                      boardgameData={boardgame}
                      key={boardgame.id}
                    />
                  ))}
                  <LastBoardgameCard />
                </>
              ) : (
                <div className="w-full h-full flex justify-center items-center text-white text-opacity-30 text-sm">
                  You have no boardgames let's add your new boardgame :{")"}
                </div>
              )
            ) : (
              <>
                <BoardgameLoadingCard />
                <BoardgameLoadingCard />
                <BoardgameLoadingCard />
                <BoardgameLoadingCard />
              </>
            )}
          </div>
        </div>

        <div className="w-full bg-black bg-opacity-20 flex flex-col overflow-x-hidden px-4 py-8 min-h-44">
          <div className="flex flex-row justify-between">
            <div className="mb-4 ml-4 font-bold text-white text-opacity-80 ">
              Incoming requests
            </div>
            <a
              className="mb-4 text-white hover:text-opacity-40 text-opacity-60"
              href="/rental-request"
            >
              {" "}
              manage {"➞"}
            </a>
          </div>
          <div className="flex flex-row overflow-x-scroll h-full">
            {rentalRequests && rentalRequests.length > 0 ? (
              rentalRequests.map((rentalRequest) => (
                <RequestCard
                  requestData={rentalRequest}
                  key={rentalRequest.id}
                />
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center text-white text-opacity-30 text-sm">
                There are no requests coming in at this time.
              </div>
            )}
          </div>
        </div>
        <div className="w-full bg-black bg-opacity-20 flex flex-col overflow-x-hidden px-4 py-8 min-h-52">
          <div className="flex flex-row justify-between">
            <div className="mb-4 ml-4 font-bold text-white text-opacity-80 ">
              Reviews
            </div>
            <a
              className="mb-4 text-white hover:text-opacity-40 text-opacity-60"
              href={`/profile/${provider?.username}`}
            >
              {" "}
              see more {"➞"}
            </a>
          </div>

          <div className="flex flex-row overflow-x-scroll h-full">
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewCard reviewData={review} key={index} />
              ))
            ) : (
              <div className="w-full h-full flex justify-center items-center text-white text-opacity-30 text-sm">
                There are no customer reviews yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
