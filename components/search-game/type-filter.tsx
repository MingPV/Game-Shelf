"use client";

import { useState } from "react";
import { Boardgame_type } from "@/app/types/game";

export default function TypeFilter({
  selectedType,
  boardgame_type,
  handleChange,
}: {
  selectedType: string[] | undefined;
  boardgame_type: Boardgame_type[];
  handleChange: (selected: string[]) => void;
}) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    selectedType || []
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const toggleSelection = (typeId: string) => {
    let updatedSelection;
    if (selectedTypes.includes(typeId)) {
      updatedSelection = selectedTypes.filter((id) => id !== typeId);
    } else {
      updatedSelection = [...selectedTypes, typeId];
    }
    setSelectedTypes(updatedSelection);
    handleChange(updatedSelection);
  };

  return (
    <div className="p-4 dropdown dropdown-content items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        className="btn m-1 bg-transparent border-none"
      >
        Filter by type
      </button>
      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow"
        >
          {boardgame_type.map((type, index) => (
            <li key={index}>
              <label
                key={type.bg_type_id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.bg_type_id.toString())}
                  onChange={() => toggleSelection(type.bg_type_id.toString())}
                  className="w-4 h-4"
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
