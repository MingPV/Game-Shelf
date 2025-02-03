"use client";
import { useEffect, useState } from "react";
import { selectGamesByPageAction } from "@/app/(game-pages)/actions";
import { Boardgame } from "@/app/types/game";

export function SearchItems() {
  const [page, setPage] = useState(1);
  const [games, setGames] = useState<Boardgame[]>([]);

  const handleNextPage = async () => {
    const nextPage = page + 1;
    const newGames = await selectGamesByPageAction(nextPage);
    setPage(nextPage);
    setGames(newGames);
  };

  const handlePreviousPage = async () => {
    if (page > 1) {
      const previousPage = page - 1;
      const newGames = await selectGamesByPageAction(previousPage);
      setPage(previousPage);
      setGames(newGames);
    }
  };

  const fetchGames = async () => {
    const initialGames = await selectGamesByPageAction(page);
    setGames(initialGames);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center font-bold">
        <div>Searching games page</div>
      </div>
      <div className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Games</h1>
        <div className="flex flex-col gap-2 mt-8">
          {games.map((game) => (
            <div className="my-1 bg-slate-400" key={game.id}>
              <h2>{game.bg_name}</h2>
              <p>{game.description}</p>
              <img src={game.bg_picture} alt={game.bg_name} />
              <p>{game.price}</p>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
