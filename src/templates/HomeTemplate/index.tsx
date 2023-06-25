"use client";
import { useGamesContext } from "@/context/GamesContext";
import { ToastContainer } from "react-toastify";
import { GameCard } from "@/components/GameCard";
import { useSearch } from "@/hooks/useSearch";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterByGenre } from "@/components/FilterByGenre";

import "react-toastify/dist/ReactToastify.css";

export function HomeTemplate() {
  const { games, isLoading } = useGamesContext();
  const { filteredGamesByGenre } = useSearch();

  return (
    <>
      <ToastContainer style={{ fontSize: "1rem" }} />

      <main
        className={`flex min-h-screen px-4 flex-col items-center justify-${
          isLoading ? "center" : "between"
        }}`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>
        ) : (
          <>
            {games.length > 0 && (
              <div className="min-h-screen flex flex-col">
                <div className="flex-grow">
                  <Header />

                  <div className="w-full max-w-5xl flex justify-end">
                    <FilterByGenre />
                  </div>

                  <div className="w-full max-w-5xl m-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGamesByGenre.map((game, i) => (
                      <GameCard key={game.title + game.id} {...game} />
                    ))}
                  </div>
                </div>

                <Footer />
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
