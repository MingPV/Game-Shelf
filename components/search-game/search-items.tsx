"use client";
import { useEffect, useState } from "react";
import { selectGamesByFilterAction } from "@/app/(game-pages)/actions";
import { Boardgame } from "@/app/types/game";
import GameCard from "./game-card";
import { Input } from "../ui/input";
import PriceFilter from "./price-filter";
import ItemsPerPageFilter from "./items-per-page-filter";

export function SearchItems() {
  const [itemsPerPage,setItemPerPage] = useState(3)
  const [page, setPage] = useState(1);
  const [games, setGames] = useState<Boardgame[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [count, setCount] = useState(1);
  const maxPage = Math.ceil( (count||1) /itemsPerPage);
  const [price, setPrice] = useState<[number, number]>([0, 1000]);
  const [filtered,setFiltered] = useState(false)

  const fetchGames = async () => {
    const {data, count}  = await selectGamesByFilterAction(searchValue,price,page,itemsPerPage);
    setGames(data);
    setCount(count||1)
    console.log(data);
  };

  useEffect(() => {
    fetchGames();
  }, [page,searchValue,price,itemsPerPage]);

  const setRange = (event:any, type:string) => {
    const value = Number(event.target.value);
    const newPrice = isNaN(value)? 0:value;
    if(type=='max') setPrice([price[0],Math.min(1000,Math.max(price[0],newPrice))])
    if(type=='min') setPrice([Math.min(price[1],newPrice),price[1]])
    setFiltered(true)
  }

  const clearFilter = ()=>{
    setSearchValue('')
    setPrice([0,1000])
    setItemPerPage(3)
    setPage(1)
    setFiltered(false)
  }


  return (
    <div className="w-full place-items-center">
      <div className="flex flex-col items-center justify-center font-bold">
        <div>Searching games page</div>
      </div>
      <div className="flex flex-col min-w-64 items-center w-full space-y-4">
        <h1 className="text-2xl font-medium">Games</h1>
        <div className="flex flex-row w-2/5 space-x-2">
          <p className="min-w-20 self-center text-center">{count} games</p>
          <Input placeholder="Search Board game by name" value={searchValue} className="rounded-full border border-1-gs_white" 
          type="text" onChange={(e)=>{setSearchValue(e.target.value);setFiltered(true)}} />
          <button onClick={clearFilter} disabled={filtered === false} className="btn btn-sm self-center">Clear Filters</button>
        </div>
        <div className="flex flex-row items-center gap-16 w-3/10">
          {/* <Filter placeholder="price" value={price} minValue={0} maxValue={1000} handleChange={(value:any)=>setPrice(value)}/>
          <label className="self-center">Bath/day</label>
          <Filter placeholder="games/page" value={itemsPerPage} minValue={1} maxValue={5} handleChange={(value:any)=>setItemPerPage(value)}/> */}
          <div className="flex flex-row relative gap-2 items-center">
            <PriceFilter price={price} handleChange={setRange}/>
            <p>{price[0]} - {price [1]} Bath/day</p>
          </div>
          <div className="flex flex-row relative justify-end gap-2 items-center">
            <ItemsPerPageFilter itemPerPage={itemsPerPage} handleChange={(value:number)=>{setItemPerPage(value);setFiltered(true)}}/>
            <p>games/page</p>
          </div>
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
