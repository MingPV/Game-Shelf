"use client";

import { useState } from "react";

export default function ItemsPerPageFilter({
  itemPerPage,
  handleChange,
}: {
  itemPerPage: number;
  handleChange: Function;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex flex-row rounded-xl p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown on click
      >
        <button className="btn btn-outline ">{itemPerPage} items / page</button>
      </div>

      {isOpen && (
        <div
          className="absolute menu bg-base-100 rounded-box z-[1] w-24 p-2 shadow mt-1"
          onKeyDown={handleKeyDown}
        >
          {[4, 8, 10, 15]?.map((num) => (
            <div
              key={num}
              className="cursor-pointer p-3"
              onClick={() => {
                handleChange(num);
                setIsOpen(false); // Close dropdown after selection
              }}
            >
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
