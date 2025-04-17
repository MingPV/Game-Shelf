"use client";
import { useEffect, useState } from "react";
import { Boardgame, Boardgame_type } from "@/app/types/game";
import { Input } from "../ui/input";
import BoardGameCard from "./boardgame-card";
import Skeleton from "./skeleton";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { UserData } from "@/app/types/user";

export function BoardgameItems() {
  const [provider, setProvider] = useState<UserData>();
  const [boardgames, setBoardgames] = useState<Boardgame[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const [filtered, setFiltered] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string[]>([]);

  const [isFetching, setIsFetching] = useState(true);
  const [boardgameTypes, setBoardgameTypes] = useState<Boardgame_type[]>([]);
  const [haveBoardgame, setHaveBoardgame] = useState<Boolean>(false);

  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const fetchMyData = async (): Promise<{
    data: UserData;
    token: string;
  }> => {
    const res = await fetch("/api/users/me", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    return res.json();
  };

  const fetchTypes = async (): Promise<{
    data: Boardgame_type[];
    token: string;
  }> => {
    const res = await fetch("/api/boardgames/types", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    return res.json();
  };

  const fetchProviderBoardgame = async (
    searchValue: string,
    provider_id: string,
    selectedTypeFilter: string[]
  ): Promise<{
    data: Boardgame[];
    token: string;
  }> => {
    const queryString = new URLSearchParams({
      searchValue: searchValue,
      provider_id: provider_id,
      selectedTypeFilter: selectedTypeFilter.join(","), // Join array into a comma-separated string
    }).toString();

    const res = await fetch(`/api/boardgames/provider?${queryString}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    return res.json();
  };

  const fetchGames = useDebouncedCallback(async () => {
    setIsFetching(true);

    if (provider) {
      const { data } = await fetchProviderBoardgame(
        searchValue,
        provider?.uid || "",
        selectedTypeFilter
      );
      setBoardgames(data);
      setHaveBoardgame(data.length > 0);
    }

    setIsFetching(false);
  }, 300);

  const firstFetchGames = async () => {
    setIsFetching(true);
    setIsFirstFetch(false);

    const { data: fetchUserData } = await fetchMyData();
    setProvider(fetchUserData);

    console.log("fetchUserData");
    console.log(fetchUserData);

    const { data } = await fetchProviderBoardgame(
      searchValue,
      fetchUserData.uid,
      selectedTypeFilter
    );
    setBoardgames(data);

    setHaveBoardgame(data.length > 0);
    setIsFetching(false);
  };

  const getBoardgameType = async () => {
    const { data } = await fetchTypes();

    setBoardgameTypes(data);
  };

  useEffect(() => {
    if (!firstFetchGames) {
      fetchGames();
    }
  }, [searchValue, selectedTypeFilter, haveBoardgame]);

  useEffect(() => {
    firstFetchGames();
    getBoardgameType();
  }, []);

  const mapped_boardgame_type = boardgameTypes.reduce((acc: any, type: any) => {
    acc[type.bg_type_id] = type.bg_type;
    return acc;
  }, {});

  const clearFilter = () => {
    setSearchValue("");

    setFiltered(false);
    setSelectedTypeFilter([]);
  };

  return (
    <div className="w-full place-items-center">
      {/* <div className="flex flex-col items-center justify-center font-bold mt-8 mb-4">
        <div>Searching boardgames page</div>
      </div> */}
      <div className="flex flex-col  items-center w-full space-y-4 mt-4">
        {/* <h1 className="text-2xl font-medium mb-4">Boardgames</h1> */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex gap-4  justify-between items-center">
            <Input
              placeholder="Search Board game by name"
              value={searchValue}
              className="px-4 py-6 rounded-full border border-neutral-200 hover:border-gs_white min-w-[60vw]"
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value);
                setFiltered(true);
              }}
            />
            <button
              onClick={clearFilter}
              disabled={!filtered}
              className="btn btn-outline"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-row relative  justify-end gap-2 items-start"></div>
        </div>

        {isFetching ? (
          <>
            <div
              className="w-[85%] mx-auto bg-white bg-opacity-10 rounded-2xl p-1 
               lg:p-2"
            >
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </>
        ) : (
          <>
            {haveBoardgame ? (
              <div
                className="w-[85%] mx-auto bg-white bg-opacity-10 rounded-2xl p-1 
               lg:p-2
              "
              >
                <div className="flex flex-row w-full">
                  <div className="flex justify-start w-full mt-2 mr-2">
                    <div className="font-extrabold text-2xl px-4 py-2 mx-4">
                      Inventory
                    </div>
                  </div>
                  <div className="flex justify-end w-full mt-2 mr-2">
                    <Link
                      className="flex justify-center items-center bg-black bg-opacity-20 px-4 py-2 mx-4 rounded-lg text-white text-opacity-80 hover:bg-opacity-40 hover:cursor-pointer transition-all duration-300 hover:text-opacity-90"
                      href={"/add-game"}
                      prefetch={true}
                    >
                      + Add Boardgame
                    </Link>
                  </div>
                </div>

                {boardgames?.map((boardgame, index) => (
                  <BoardGameCard
                    key={index}
                    boardgame={boardgame}
                    boardgame_type={mapped_boardgame_type}
                    boardgame_types={boardgameTypes}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 gap-4">
                <svg
                  height="200px"
                  width="200px"
                  viewBox="-24.69 -24.69 296.24 296.24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f5f5f5"
                  stroke="#f5f5f5"
                >
                  <g>
                    <path
                      d="M230.614,93.452c-11.592-45.333-25.152-55.611-40.246-38.556 c-7.488-26.783-22.85-47.706-52.236-52.93c-7.469-2.4-15.128-2.611-22.618-0.586C83.402,5.467,67.999,30.957,61.258,62.547 
          c-16.624-9.692-31.675,3.96-44.777,46.57c-4.475,15.728,6.347,27.396,13.787,15.424c11.973-17.309,20.719-25.052,26.626-24.319 
          c-1.079,27.736,1.561,55.662,3.586,75.476c-6.657,26.486,2.196,34.407,26.028,24.361c-13.624,35.946,13.095,51.335,32.337,18.27 
          c13.715,45.913,35.14,30.487,31.547-4.575c18.438,33.299,40.074,22.3,31.3-10.948h0.001c20.937,16.745,33.586,3.085,10.51-26.091 
          c2.592-24.594,6.135-58.033,3.65-89.156c4.32-6.46,12.127-0.389,24.043,20.316C225.678,119.063,234.092,108.15,230.614,93.452z 
          M147.011,56.697c6.185,0,11.202,7.94,11.202,17.739s-5.018,17.74-11.202,17.74c-6.183,0-11.202-7.941-11.202-17.74 
          S140.828,56.697,147.011,56.697z M103.824,56.887c6.183,0,11.203,7.941,11.203,17.739s-5.02,17.74-11.203,17.74 
          c-6.184,0-11.203-7.942-11.203-17.74C92.621,64.828,97.64,56.887,103.824,56.887z M90.461,154.741 
          c24.544-61.591,49.633-56.537,75.08,0.861C140.094,127.492,115.006,124.57,90.461,154.741z"
                    />
                  </g>
                </svg>
                <p>There is no Boardgame matched with your filter.</p>
                <Link
                  className="btn btn-neutral"
                  href={"/add-game"}
                  prefetch={true}
                >
                  add new boardgame
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
