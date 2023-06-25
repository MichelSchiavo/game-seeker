"use client";
import { useGamesContext } from "@/context/GamesContext";
import { Genres, genresList } from "@/types/genres";
import { useState } from "react";

export function FilterByGenre() {
  const [isOpen, setIsOpen] = useState(false);
  const { genre, setGenre } = useGamesContext();

  const handleChangeGenre = (value: Genres) => {
    setGenre(value);
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex items-center relative">
      <button
        className="px-2 py-1 rounded-md border-none bg-[#4c102a] cursor-pointer text-base text-dark flex items-center justify-center"
        onClick={handleOpen}
      >
        {genre !== "ALL" ? genre : "Todos os jogos"}
      </button>

      {isOpen && (
        <div className="absolute w-max bg-white shadow-md rounded-md list-none z-20 top-0 right-0">
          <ul className="flex flex-col">
            {genresList.map((data) => (
              <li
                key={data}
                className={`cursor-pointer px-3 py-2 transition-all delay-250 text-gray-600 ${
                  genre === data && "bg-[#4c102a] text-white"
                } hover:bg-[#4c102a] hover:text-white`}
                onClick={() => handleChangeGenre(data)}
              >
                {data !== "ALL" ? data : "Todos os jogos"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
