"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { getGamesWithTimeout } from "@/utils/check-games-list-timeout";
import { Game } from "@/types/game";
import { Genres } from "@/types/genres";

interface GamesProviderProps {
  children: React.ReactNode;
}

export const GamesContext = createContext({
  search: "",
  setSearch: (value: string) => {},
  games: [] as Game[],
  isLoading: true,
  genre: "ALL" as Genres,
  setGenre: (value: Genres) => {},
});

export const GamesProvider: React.FC<GamesProviderProps> = ({
  children,
}: GamesProviderProps) => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genre, setGenre] = useState<Genres>("ALL");

  const fetchGameData = async () => {
    setIsLoading(true);

    try {
      const data: Game[] = await getGamesWithTimeout();
      data.sort((a, b) => a.title.localeCompare(b.title));
      setGames(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  return (
    <GamesContext.Provider
      value={{ search, setSearch, games, isLoading, genre, setGenre }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => {
  return useContext(GamesContext);
};
