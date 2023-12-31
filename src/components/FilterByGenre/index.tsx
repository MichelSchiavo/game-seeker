"use client";
import { useState } from "react";
import { useGamesContext } from "@/context/GamesContext";
import { Genres, genresList } from "@/types/genres";

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
        className="px-2 py-1 rounded-md border-none bg-[#4c102a] cursor-pointer text-base text-dark flex items-center justify-center hover:bg-[#3f0d23] transition-background duration-300 ease-in-out"
        onClick={handleOpen}
      >
        {genre !== "ALL" ? genre : "Todos os jogos"}
      </button>

      {isOpen && (
        <div className="absolute w-max bg-white rounded-md z-20 top-0 right-0">
          <ul className="flex flex-col relative">
            {genresList.map((data, index) => (
              <li
                key={data}
                className={`cursor-pointer px-2 py-1 text-gray-600 transition-all duration-300 ease-in-out ${
                  genre === data && "bg-[#4c102a] text-white"
                } hover:bg-[#4c102a] hover:text-white ${
                  index === 0
                    ? "rounded-t-md"
                    : index === genresList.length - 1
                    ? "rounded-b-md"
                    : ""
                }`}
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
