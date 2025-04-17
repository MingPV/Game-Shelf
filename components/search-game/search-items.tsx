"use client";
import { useEffect, useState } from "react";
import { selectAllBoardgameType } from "@/app/(game-pages)/actions";
import { Boardgame, Boardgame_type } from "@/app/types/game";
import GameCard from "./game-card";
import { Input } from "../ui/input";
import PriceFilter from "./price-filter";
import ItemsPerPageFilter from "./items-per-page-filter";
import LoadingGameCard from "./loading-card";
import TypeFilter from "./type-filter";
import { useDebouncedCallback } from "use-debounce";
import NoBoardgameMatch from "./no-match-card";
export function SearchItems() {
  const [itemsPerPage, setItemPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [games, setGames] = useState<Boardgame[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [count, setCount] = useState(1);
  const [maxPage, setMaxPage] = useState(
    Math.ceil((count || 0) / itemsPerPage)
  );
  const [price, setPrice] = useState<[number, number]>([0, 1000]);
  const [filtered, setFiltered] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string[]>([]);

  const [isFetching, setIsFetching] = useState(true);
  const [boardgameTypes, setBoardgameTypes] = useState<Boardgame_type[]>([]);
  const [haveBoardgame, setHaveBoardgame] = useState<Boolean>(true);

  const fetchTypes = async (): Promise<{
    data: Boardgame_type[];
    token: string;
  }> => {
    const res = await fetch("/api/boardgames/types", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    return res.json();
  };

  const fetchBoardGames = async (
    searchValue: string,
    price: [number, number],
    page: number,
    itemsPerPage: number,
    maxPage: number,
    selectedTypeFilter: string[]
  ): Promise<any> => {
    // Convert the price array into a query string like "minPrice=10&maxPrice=50"
    const priceQuery = `minPrice=${price[0]}&maxPrice=${price[1]}`;

    // Build the query string
    const queryString = new URLSearchParams({
      searchValue,
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
      maxPage: maxPage.toString(),
      selectedTypeFilter: selectedTypeFilter.join(","), // Join array into a comma-separated string
      ...Object.fromEntries(new URLSearchParams(priceQuery)),
    }).toString();

    // Make the GET request
    const res = await fetch(`/api/boardgames?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`/api/boardgames?${queryString}`);

    // Parse the JSON response
    return res.json();
  };

  const fetchGames = useDebouncedCallback(async () => {
    setIsFetching(true);

    if (page > maxPage) {
      setPage(1);
    }

    const { data: fetchData } = await fetchBoardGames(
      searchValue,
      price,
      page,
      itemsPerPage,
      maxPage,
      selectedTypeFilter
    );
    const { fetch_data: data, count_items: count_games } = await fetchData;
    setGames(data || []);
    setCount(count_games || 0);

    console.log("Ming");
    console.log(count_games);
    console.log(data);

    if (count_games == 0) {
      setPage(1);
      setMaxPage(1);
      setHaveBoardgame(false);
    } else {
      setMaxPage(Math.ceil((count_games || 1) / itemsPerPage));
      setHaveBoardgame(true);
    }

    setIsFetching(false);
  }, 300);

  const getBoardgameType = async () => {
    const { data: data } = await fetchTypes();

    setBoardgameTypes(data);
  };

  useEffect(() => {
    fetchGames();
    getBoardgameType();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    setPage(1);
    setMaxPage(1);
    // maxpage will auto change after fetch
    fetchGames();
    getBoardgameType();
  }, [itemsPerPage, searchValue, price, selectedTypeFilter]);

  const mapped_boardgame_type = boardgameTypes.reduce((acc: any, type: any) => {
    acc[type.bg_type_id] = type.bg_type;
    return acc;
  }, {});

  const setRange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = Number(event.target.value);
    const newPrice = isNaN(value) ? 0 : value;
    if (type === "max")
      setPrice([price[0], Math.min(1000, Math.max(price[0], newPrice))]);
    if (type === "min") setPrice([Math.min(price[1], newPrice), price[1]]);
    setFiltered(true);
  };

  const clearFilter = () => {
    setSearchValue("");
    setPrice([0, 1000]);
    setItemPerPage(15);
    setPage(1);
    setFiltered(false);
    setSelectedTypeFilter([]);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // fetchGames();

  return (
    <div className="w-full place-items-center">
      {/* <div className="flex flex-col items-center justify-center font-bold mt-8 mb-4">
        <div>Searching boardgames page</div>
      </div> */}
      <div className="flex flex-col min-w-64 items-center w-full space-y-4 mt-4">
        {/* <h1 className="text-2xl font-medium mb-4">Boardgames</h1> */}
        <div className="flex flex-col gap-4 items-start  justify-start">
          <div className="flex gap-4 w-full justify-between items-center">
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

          <div className="flex flex-col md:flex-row w-full  gap-4 items-center lg:items-end justify-between">
            <div className="flex flex-col relative gap-4 items-start">
              <TypeFilter
                selectedType={selectedTypeFilter}
                boardgame_type={boardgameTypes}
                handleChange={(value: string[]) => {
                  setSelectedTypeFilter(value);
                  setFiltered(true);
                }}
              />
            </div>

            <div className="flex flex-col md:flex-row  justify-end gap-4 items-center w-full">
              <PriceFilter price={price} handleChange={setRange} />
              <div className="flex flex-row items-center gap-4">
                <ItemsPerPageFilter
                  itemPerPage={itemsPerPage}
                  handleChange={(value: number) => {
                    setItemPerPage(value);
                    setFiltered(true);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {selectedTypeFilter?.map((type, index) => (
              <p key={index} className="p-1 rounded-sm bg-gs_white/20">
                {mapped_boardgame_type[type] || "Unknown Type"}
              </p>
            ))}
          </div>
        </div>

        {isFetching ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pt-4  items-center justify-center">
              {[...Array(12)].map((_, index) => (
                <LoadingGameCard key={index} />
              ))}
            </div>
          </>
        ) : (
          <>
            {haveBoardgame ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4 pt-4  items-stretch justify-center">
                {games?.map((game, index) => (
                  <GameCard
                    boardgame={game}
                    key={index}
                    boardgame_type={mapped_boardgame_type}
                  />
                ))}
              </div>
            ) : (
              <NoBoardgameMatch />
            )}
          </>
        )}

        <p>
          {page} / {maxPage}
        </p>
        <div className="flex justify-between mt-4 gap-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="btn"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === maxPage}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
