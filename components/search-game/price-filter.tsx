"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Filter({
  price,
  handleChange,
}: {
  price: [number, number];
  handleChange: Function;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row border rounded-xl p-2 cursor-pointer">
          <button>price</button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className="bg-gs_purple_gradient opacity-95 text-white text-semibold rounded-xl gap-0"
          onKeyDown={handleKeyDown}
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div className="flex justify-between items-center gap-4">
              <div className="text-center px-2 py-1">
                <input
                  type="number"
                  value={price[0].toString() ?? 0}
                  min={0}
                  max={1000}
                  onChange={(e) => handleChange(e, "min")}
                  className="w-16 py-1 px-2 bg-transparent border rounded text-center bg-slate-100 text-black "
                />
                <p className="text-xs">min 0</p>
              </div>
              <div className="text-center px-2">
                <input
                  type="number"
                  value={price[1].toString() ?? 0}
                  min={0}
                  max={1000}
                  onChange={(e) => handleChange(e, "max")}
                  className="w-16 p-1 bg-transparent border rounded text-center bg-slate-100 text-black"
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
