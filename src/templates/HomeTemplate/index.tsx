"use client";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useGamesContext } from "@/context/GamesContext";
import { ToastContainer } from "react-toastify";
import { GameCard } from "@/components/GameCard";
import { useSearch } from "@/hooks/useSearch";
import { FilterByGenre } from "@/components/FilterByGenre";
import { LoadingSpin } from "@/components/LoadingSpin";
import { BestRated } from "@/components/BestRated";

import "react-toastify/dist/ReactToastify.css";

export function HomeTemplate() {
  const { user } = useAuthContext();
  const {
    handleSetIsFavorites,
    isFavorites,
    games,
    isLoading,
    readGamesOnDB,
    favoriteGames,
  } = useGamesContext();
  const { filteredGamesByGenre } = useSearch();

  useEffect(() => {
    if (user) {
      readGamesOnDB(user.uid);
    }
  }, [user]);

  return (
    <>
      <ToastContainer style={{ fontSize: "1rem" }} />

      <main
        className={`flex min-h-full px-4 flex-col items-center justify-${
          isLoading ? "center" : "between"
        }}`}
      >
        {isLoading ? (
          <LoadingSpin />
        ) : (
          <>
            {games.length > 0 && (
              <div className="min-h-screen flex flex-col">
                <div className="flex-grow">
                  <div className="w-full max-w-5xl flex justify-end gap-2">
                    <BestRated />

                    <button
                      className={`px-2 py-1 rounded-md border-none ${
                        isFavorites
                          ? "bg-white text-[#4c102a]"
                          : "bg-[#4c102a] hover:bg-[#3f0d23]"
                      } cursor-pointer text-base text-dark flex items-center justify-center  transition-background duration-300 ease-in-out`}
                      onClick={handleSetIsFavorites}
                    >
                      Favoritos
                    </button>

                    <FilterByGenre />
                  </div>

                  <div className="w-full max-w-5xl m-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGamesByGenre.map((game) => (
                      <GameCard
                        key={game.title + game.id}
                        {...game}
                        starLevel={favoriteGames[game.id]?.stars || 0}
                        favorite={favoriteGames[game.id]?.favorite || false}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {games.length === 0 && (
              <div className="min-h-screen flex items-center justify-center">
                <img src="./bg-error-api.webp" alt="Background error image" />
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
