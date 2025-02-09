"use client";
import { useEffect, useState } from "react";
import { selectGamesByFilterAction } from "@/app/(game-pages)/actions";
import { Boardgame } from "@/app/types/game";
import GameCard from "./game-card";
import { Input } from "../ui/input";
import PriceFilter from "./price-filter";
import ItemsPerPageFilter from "./items-per-page-filter";
import LoadingGameCard from "./loading-card";

export function SearchItems() {
  const [itemsPerPage, setItemPerPage] = useState(3);
  const [page, setPage] = useState(1);
  const [games, setGames] = useState<Boardgame[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [count, setCount] = useState(1);
  const maxPage = Math.ceil((count || 1) / itemsPerPage);
  const [price, setPrice] = useState<[number, number]>([0, 1000]);
  const [filtered, setFiltered] = useState(false);

  const [isFetching, setIsFetching] = useState(true);

  const fetchGames = async () => {
    setIsFetching(true);

    if (page > maxPage) {
      setPage(1);
    }

    const { data, count } = await selectGamesByFilterAction(
      searchValue,
      price,
      page,
      itemsPerPage,
      maxPage
    );
    setGames(data);
    setCount(count || 1);
    console.log(data);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchGames();
  }, [page, searchValue, price, itemsPerPage]);

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
    setItemPerPage(3);
    setPage(1);
    setFiltered(false);
  };

  return (
    <div className="w-full place-items-center">
      {/* <div className="flex flex-col items-center justify-center font-bold mt-8 mb-4">
        <div>Searching boardgames page</div>
      </div> */}
      <div className="flex flex-col min-w-64 items-center w-full space-y-4 mt-4">
        {/* <h1 className="text-2xl font-medium mb-4">Boardgames</h1> */}
        <div className="flex flex-row  space-x-2 my-4 ">
          <div className="min-w-36 text-center self-center ">{count} games</div>
          <Input
            placeholder="Search Board game by name"
            value={searchValue}
            className="px-8 py-5 rounded-full border border-neutral-700 hover:border-gs_white min-w-[40vw] bg-neutral-700 text-neutral-400"
            type="text"
            onChange={(e) => {
              setSearchValue(e.target.value);
              setFiltered(true);
            }}
          />
          <button
            onClick={clearFilter}
            disabled={filtered === false}
            className="btn btn-sm self-center"
          >
            Clear Filters
          </button>
        </div>
        <div className="flex flex-row items-center gap-16  ">
          <div className="flex flex-row relative gap-2 items-center">
            <PriceFilter price={price} handleChange={setRange} />
            <p>
              {price[0]} - {price[1]} Bath/day
            </p>
          </div>
          <div className="flex flex-row relative justify-end gap-2 items-center">
            <ItemsPerPageFilter
              itemPerPage={itemsPerPage}
              handleChange={(value: number) => {
                setItemPerPage(value);
                setFiltered(true);
              }}
            />
            <p>games/page</p>
          </div>
        </div>
        {isFetching ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pt-4  items-center justify-center">
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pt-4  items-center justify-center">
              {games.map((game) => (
                <GameCard
                  name={game.bg_name}
                  price={game.price}
                  img={game.bg_picture || "/mock_user.jpeg"}
                  key={game.id}
                />
              ))}
            </div>
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
