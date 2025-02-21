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
import BoardgameCard from "./boardgame-card";
import RentalCard from "./rental-card";
import RequestCard from "./request-card";
import ReviewCard from "./review-card";
import LastBoardgameCard from "./last-boardgame-card";

export function ProviderManage() {
  const [provider, setProvider] = useState<UserData>();
  const [boardgames, setBoardgames] = useState<Boardgame[]>();
  const [rentalRequests, setRentalRequests] = useState<RentingRequest[]>();
  const [reviews, setReviews] = useState<ReviewData[]>();
  const [isLoading, setIsLoading] = useState(true);

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

        const rentalsData = await selectMyRentingRequest();
        setRentalRequests(rentalsData || []);

        const reviewsData = await selectReviewByProviderId(fetchUserData.uid);

        setReviews(reviewsData);
      }
      setIsLoading(false);
    };

    fetchData();

    // fetch rental requests
    // fetch reviews
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-6 bg-black bg-opacity-10 border border-white border-opacity-10 rounded-md overflow-x-hidden">
      <div className="p-4 w-full h-full gap-8 flex flex-col overflow-x-hidden">
        <div className="w-full bg-black bg-opacity-20 flex flex-col overflow-x-hidden px-4 py-8">
          <div className="mb-4 ml-4 font-bold">My Boardgames</div>
          <div className="flex flex-row overflow-x-scroll">
            {boardgames?.map((boardgame) => (
              <BoardgameCard boardgameData={boardgame} key={boardgame.id} />
            ))}
            <LastBoardgameCard />
          </div>
        </div>
        <div className="w-full bg-black bg-opacity-20 flex flex-col overflow-x-hidden px-4 py-8">
          <div className="flex flex-row justify-between">
            <div className="mb-4 ml-4 font-bold">Rental status</div>
            <a
              className="mb-4 text-white hover:text-opacity-40 text-opacity-60"
              href="/"
            >
              {" "}
              see more {"➞"}
            </a>
          </div>
          <div className="flex flex-row overflow-x-scroll">
            {rentalRequests?.map((rentalRequest) => (
              <RentalCard rentalData={rentalRequest} key={rentalRequest.id} />
            ))}
          </div>
        </div>
        <div className="w-full bg-black bg-opacity-20 flex flex-col overflow-x-hidden px-4 py-8">
          <div className="flex flex-row justify-between">
            <div className="mb-4 ml-4 font-bold">Request</div>
            <a
              className="mb-4 text-white hover:text-opacity-40 text-opacity-60"
              href="/"
            >
              {" "}
              manage {"➞"}
            </a>
          </div>
          <div className="flex flex-row overflow-x-scroll">
            {rentalRequests?.map((rentalRequest) => (
              <RequestCard requestData={rentalRequest} key={rentalRequest.id} />
            ))}
          </div>
        </div>
        <div className="w-full bg-black bg-opacity-20 flex flex-col overflow-x-hidden px-4 py-8">
          <div className="flex flex-row justify-between">
            <div className="mb-4 ml-4 font-bold">Reviews</div>
            <a
              className="mb-4 text-white hover:text-opacity-40 text-opacity-60"
              href="/"
            >
              {" "}
              see more {"➞"}
            </a>
          </div>

          <div className="flex flex-row overflow-x-scroll">
            {reviews?.map((review, index) => (
              <ReviewCard reviewData={review} key={index} />
            ))}
            {reviews?.map((review, index) => (
              <ReviewCard reviewData={review} key={index} />
            ))}
            {reviews?.map((review, index) => (
              <ReviewCard reviewData={review} key={index} />
            ))}
            {reviews?.map((review, index) => (
              <ReviewCard reviewData={review} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
