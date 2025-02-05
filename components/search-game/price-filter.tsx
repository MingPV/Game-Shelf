import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function Filter({ price, handleChange }: { price:[number,number], handleChange: Function }) {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row border rounded-xl p-2">
          <button>price</button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className="bg-gs_purple_gradient text-white text-semibold rounded-xl gap-0">
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div className="flex justify-between items-center gap-4">
              <div className="text-center">
                <input
                  type="number"
                  value={price[0].toString()??0}
                  min={0}
                  max={1000}
                  onChange={(e)=>handleChange(e,'min')}
                  className="w-16 p-1 bg-transparent border rounded text-center cursor-pointer"
                />
                <p className="text-xs">min 0</p>
              </div>
              <div className="text-center">
                <input
                  type="number"
                  value={price[1].toString()??0}
                  min={0}
                  max={1000}
                  onChange={(e)=>handleChange(e,'max')}
                  className="w-16 p-1 bg-transparent border rounded text-center cursor-pointer"
                />
                <p className="text-xs">max 1000</p>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
