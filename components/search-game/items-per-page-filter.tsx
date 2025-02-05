import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function ItemsPerPageFilter({ itemPerPage, handleChange }: { itemPerPage:number, handleChange: Function }) {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row border rounded-xl p-2">
          <button>{itemPerPage}</button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className="bg-gs_purple_gradient text-white text-semibold rounded-xl gap-0">
          {[1, 2, 3,4,5].map((num) => (
            <DropdownMenuItem key={num} onSelect={() => handleChange(num)}>
              {num}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
