"use client";
import { useEffect, useState } from "react";
import { selectGamesByPageAndNameAction } from "@/app/(game-pages)/actions";
import { Boardgame } from "@/app/types/game";
import GameCard from "./game-card";
import { Input } from "./ui/input";

export function SearchItems() {
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const [games, setGames] = useState<Boardgame[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [count, setCount] = useState(1);
  const maxPage = Math.ceil( (count||1) /itemsPerPage);

  const fetchGames = async () => {
    const {data, count}  = await selectGamesByPageAndNameAction(page,searchValue,itemsPerPage);
    setGames(data);
    setCount(count||1)
    console.log(data);
  };

  useEffect(() => {
    fetchGames();
  }, [page,searchValue]);

  return (
    <div className="w-full place-items-center">
      <div className="flex flex-col items-center justify-center font-bold">
        <div>Searching games page</div>
      </div>
      <div className="flex flex-col min-w-64 items-center w-full space-y-4">
        <h1 className="text-2xl font-medium">Games</h1>
        <div className="flex flex-row w-2/5 space-x-2">
        <p className="min-w-20 self-center text-center">{count} games</p>
          <Input placeholder="Search Board game by name" className="rounded-full border border-1-gs_white" type="text" onChange={(e)=>setSearchValue(e.target.value)}/>
        </div>
        <div className="flex flex-row flex-wrap gap-12 mt-8 w-4/5 items-center justify-center">
          {games.map((game) => (
            <GameCard name={game.bg_name} price={game.price} img={game.bg_picture || '/mock_user.jpeg'} key={game.id}/>
          ))}
        </div>
        <p>{page} / {maxPage}</p>
        <div className="flex justify-between mt-4 gap-8">
          <button onClick={()=>setPage(page-1)} disabled={page === 1} className="btn">Previous</button>
          <button onClick={()=>setPage(page+1)} disabled={page === maxPage} className="btn">Next</button>
        </div>
      </div>
    </div>
  );
}
