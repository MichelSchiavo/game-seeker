import { useState } from "react";
import { useGamesContext } from "@/context/GamesContext";
import { Rates, ratesList } from "@/types/rates";

export function BestRated() {
  const { isBestRank, handleSetBestRank } = useGamesContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((prev) => !prev);

  const handleChangeRate = (value: Rates) => {
    handleSetBestRank(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center relative">
      <button
        className={`px-2 py-1 rounded-md border-none bg-[#4c102a] hover:bg-[#3f0d23] cursor-pointer text-base text-dark flex items-center justify-center  transition-background duration-300 ease-in-out`}
        onClick={handleOpen}
      >
        {isBestRank}
      </button>

      {isOpen && (
        <div className="absolute w-max bg-white rounded-md z-20 top-0 right-0">
          <ul className="flex flex-col relative">
            {ratesList.map((data, index) => (
              <li
                key={data}
                className={`cursor-pointer px-2 py-1 text-gray-600 transition-all duration-300 ease-in-out ${
                  isBestRank === data && "bg-[#4c102a] text-white"
                } hover:bg-[#4c102a] hover:text-white ${
                  index === 0
                    ? "rounded-t-md"
                    : index === ratesList.length - 1
                    ? "rounded-b-md"
                    : ""
                }`}
                onClick={() => handleChangeRate(data)}
              >
                {data !== "Todas as avaliações" ? data : "Todas as avaliações"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
