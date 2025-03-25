import { BoardgameLoadingCard } from "../home/boardgame-card";
import { Label } from "../ui/label";
export default function Loading(){
    return (
        <div className="flex flex-col w-11/12">
                <div className="flex flex-col items-center">
                  <label className="cursor-pointer">
                    {/* <img
                      src={data.profilePicture || "/mock_provider.jpeg"}
                      alt="profile picture"
                      className="w-32 h-32 object-cover border rounded-full cursor-default"
                    /> */}
                    <div className="w-32 h-32 object-cover rounded-full skeleton bg-white bg-opacity-10"></div>
                  </label>
                  <div className="text-2xl mt-2 skeleton bg-white bg-opacity-10 text-transparent">Username</div>
                  <div className="text-sm opacity-50 mt-1 skeleton bg-white bg-opacity-10 text-transparent">user@gameshelf.com</div>
                </div>
                <main className="flex-col justify-center p-4 gap-4 flex w-full">
                  {/* <ProfileUsernameForm user={data} setWindow={setWindow} /> */}
                  <>
                    <div className="bg-white bg-opacity-10 ml-4 rounded-xl p-4 flex-col flex justify-center items-center">
                      <div className="flex justify-between items-center w-full ">
                        <details className="dropdown md:hidden">
                          <summary className="btn p-0 border-0 bg-white bg-opacity-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              className="inline-block h-5 w-5 stroke-current"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                              ></path>
                            </svg>
                          </summary>
                          <ul className="menu dropdown-content bg-base-100 isolation rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                              <button>Profile</button>
                            </li>

                            <li>
                              <button>Boardgames</button>
                            </li>
                            <li>
                              <button>Review</button>
                            </li>
                          </ul>
                        </details>
                      </div>

                      <div className="grid grid-cols-11 gap-5 w-full">
                        <Label htmlFor="id" className="font-bold  col-span-3  py-3 text-transparent">
                          ID :
                        </Label>
                        <p
                          className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent text-transparent`}
                        >
                          useruid
                        </p>
                        <Label
                          htmlFor="username"
                          className="font-bold md:text-md col-span-3  py-3 text-transparent"
                        >
                          Username :
                        </Label>
                        <p
                          className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent text-transparent`}
                        >
                          username
                        </p>

                        <Label
                          htmlFor="email"
                          className="font-bold md:text-md col-span-3  py-3 text-transparent"
                        >
                          E-mail :
                        </Label>
                        <p
                          className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent text-transparent`}
                        >
                          user@gameshelf.com
                        </p>
                        <Label
                          htmlFor="phoneNumber"
                          className="font-bold md:text-md col-span-3  py-3 text-transparent"
                        >
                          Phone Number :
                        </Label>
                        <p
                          className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent text-transparent`}
                        >
                          phonenumber
                        </p>
                  
                          <Label
                            htmlFor="location"
                            className="font-bold md:text-md col-span-3  py-3 text-transparent"
                          >
                            Location :
                          </Label>
            
                       
                          <p
                            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent text-transparent`}
                          >
                            user location
                          </p>
                    
                      </div>
                    </div>
                  </>
                  {/**/}
                  {/* {data.isProvider && !data.is_admin ? (
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
                  ) : null} */}
                </main>
              </div>
    );
}