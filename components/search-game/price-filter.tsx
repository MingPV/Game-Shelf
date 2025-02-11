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
      <div onSelect={(e) => e.preventDefault()}>
        <div className="flex justify-between items-center gap-4">
          <p>price</p>
          <div className="text-center px-2 py-1">
            <input
              type="number"
              value={price[0].toString() ?? 0}
              min={0}
              max={1000}
              onChange={(e) => handleChange(e, "min")}
              className="w-16 py-1 px-2 bg-transparent border rounded text-center bg-slate-100 "
            />
            {/* <p className="text-xs">min 0</p> */}
          </div>
          <p>-</p>
          <div className="text-center px-2">
            <input
              type="number"
              value={price[1].toString() ?? 0}
              min={0}
              max={1000}
              onChange={(e) => handleChange(e, "max")}
              className="w-16 p-1 bg-transparent border rounded text-center bg-slate-100 "
            />
            {/* <p className="text-xs">max 1000</p> */}
          </div>
        </div>
      </div>
      {/* </DropdownMenuContent>
      </DropdownMenuPortal> */}
    </DropdownMenu>
  );
}
