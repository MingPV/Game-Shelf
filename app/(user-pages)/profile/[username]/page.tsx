"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { selectInfoByUsername } from "../../actions";
import { UserData } from "@/app/types/user";
import { IoIosArrowForward } from "react-icons/io";
import ReviewCard from "@/components/home/review-card";
import ProfileUsernameForm from "@/components/profile/provider-username";
import {
  selectProviderBoardgameByFilterAction,
  selectReviewByProviderId,
} from "../../actions";
import BoardgameCard from "@/components/home/boardgame-card";
import { BoardgameLoadingCard } from "@/components/home/boardgame-card";
import LastBoardgameCard from "@/components/home/last-boardgame-card";
import { ReviewData } from "@/app/types/review";
import { Boardgame } from "@/app/types/game";
export default function Home() {
  const { username } = useParams();
  const [data, setData] = useState<UserData>();
  const [window, setWindow] = useState<string>("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBoardgame, setIsLoadingBoardgame] = useState(true);
  const [isLoadingRental, setIsLoadingRental] = useState(true);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [countPendingRequest, setCountPendingRequest] = useState(0);
  const [boardgames, setBoardgames] = useState<Boardgame[]>([]);
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    const fetchInfo = async () => {
      if (username) {
        try {
          const fetchData: UserData = await selectInfoByUsername(
            username.toString()
          ); // Await the API call
          setData(fetchData); // Set the state with the fetched data
          setIsLoading(false);
          console.log(fetchData); // Log the fetched data

          const { data: fetchBoardgame } =
            await selectProviderBoardgameByFilterAction("", fetchData.uid, []);

          setBoardgames(fetchBoardgame);
          setIsLoadingBoardgame(false);

          const reviewsData = await selectReviewByProviderId(fetchData.uid);

          setReviews(reviewsData);
          setIsLoadingReview(false);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    const fetchData = async () => {
      if (data) {
      }
    };

    fetchInfo();
  }, []); // Fetch when `uname` updates

  if (isLoading || !data) {
    return (
      <>
        <div>Loading . . .</div>
      </>
    );
  } else {
    return (
      <div className="flex flex-col w-11/12">
        <div className="flex flex-col items-center">
          <label className="cursor-pointer">
            <img
              src={data.profilePicture || "/mock_provider.jpeg"}
              alt="profile picture"
              className="w-32 h-32 object-cover border rounded-full cursor-default"
            />
          </label>
          {data ? <div className="text-2xl mt-2">{data.username}</div> : null}
          {data ? (
            <div className="text-sm opacity-50 mt-1">{data.email}</div>
          ) : null}
        </div>

        {/* <main className="flex-row justify-center p-4 flex md:grid md:grid-cols-5 w-full"> */}
        <main className="flex-col justify-center p-4 gap-4 flex w-full">
          {/* <ul className="hidden md:grid col-span-1 menu bg-white bg-opacity-10 rounded-xl ml-auto mb-auto w-full">
            <li className="menu-title text-xl">Menu</li>
            <li>
              <a
                onClick={() => setWindow("profile")}
                className={`${window == "profile" ? "active" : ""} block `}
              >
                <div className="flex flex-row justify-between items-center w-full">
                  <p>Profile</p>
                  <span
                    className={`${window == "profile" ? "block" : "hidden"}`}
                  >
                    <IoIosArrowForward className="text-white" />
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a
                onClick={() => setWindow("boardgames")}
                className={`${window == "boardgames" ? "active" : ""} block`}
              >
                <div className="flex flex-row justify-between items-center w-full">
                  <p>Boardgame</p>
                  <span
                    className={`${window == "boardgames" ? "block" : "hidden"}`}
                  >
                    <IoIosArrowForward className="text-white" />
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a
                onClick={() => setWindow("review")}
                className={`${window == "review" ? "active" : ""}  block`}
              >
                <div className="flex flex-row justify-between items-center w-full">
                  <p>Review</p>
                  <span
                    className={`${window == "review" ? "block" : "hidden"}`}
                  >
                    <IoIosArrowForward className="text-white" />
                  </span>
                </div>
              </a>
            </li>
          </ul> */}
          {/* <div className="col-span-4">
            {window == "profile" ? (
              <ProfileUsernameForm user={data} setWindow={setWindow} />
            ) : null}
            {window == "boardgames" ? (
              <div className="p-2 grid grid-flow-row overflow-y-scroll grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full bg-gs_white bg-opacity-10 mx-4 rounded-xl gap-2">
                {!isLoadingBoardgame ? (
                  boardgames && boardgames.length > 0 ? (
                    <>
                      {boardgames.map((boardgame) => (
                        <BoardgameCard
                          boardgameData={boardgame}
                          key={boardgame.id}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="w-full h-full flex justify-center items-center text-white text-opacity-30 text-sm">
                      This provider does not have any boardgame
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
            ) : null}
            {window == "review" ? (
              <div className="p-2 flex flex-row overflow-x-scroll h-full bg-gs_white bg-opacity-10 mx-4 rounded-xl gap-2">
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
            ) : null}
          </div> */}
          <ProfileUsernameForm user={data} setWindow={setWindow} />
          {data.isProvider && !data.is_admin ? (
            <>
              <div className="text-xl font-bold ml-12">Boardgames</div>
              <div className="p-2 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full bg-gs_white bg-opacity-10 mx-4 rounded-xl gap-2">
                {!isLoadingBoardgame ? (
                  boardgames && boardgames.length > 0 ? (
                    <>
                      {boardgames.map((boardgame) => (
                        <div
                          className="flex w-full justify-center"
                          key={boardgame.id}
                        >
                          <BoardgameCard boardgameData={boardgame} />
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 w-full h-full flex justify-center items-center text-white text-opacity-30 text-sm">
                      This provider does not have any boardgame
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
              <div className="text-xl font-bold ml-12">Reviews</div>
              <div className="p-2 flex flex-row overflow-x-scroll h-full bg-gs_white bg-opacity-10 mx-4 rounded-xl gap-2">
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
            </>
          ) : null}
        </main>
      </div>
    );
  }
}
