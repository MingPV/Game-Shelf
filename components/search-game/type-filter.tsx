"use client";

import { Boardgame_type } from "@/app/types/game";
import { useState } from "react";
export default function TypeFilter({
  selectedType,
  boardgame_type,
  handleChange,
}: {
  selectedType: string[];
  boardgame_type: Boardgame_type[];
  handleChange: (selected: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const toggleSelection = (typeId: string) => {
    let updatedSelection;
    if (selectedType.includes(typeId)) {
      updatedSelection = selectedType.filter((id) => id !== typeId);
    } else {
      updatedSelection = [...selectedType, typeId];
    }
    handleChange(updatedSelection);
  };

  return (
    <div className="relative items-center" onKeyDown={handleKeyDown}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        className="btn btn-outline w-36 bg-transparent border border-gs_white"
      >
        Filter by type
      </button>
      {isOpen && (
        <ul
          tabIndex={0}
          className="absolute mt-2 menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow"
        >
          {boardgame_type?.map((type, index) => (
            <li key={index}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedType.includes(type.bg_type_id.toString())}
                  onChange={() => toggleSelection(type.bg_type_id.toString())}
                  className="w-4 h-4"
                  onKeyDown={handleKeyDown}
                />
                {type.bg_type}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
