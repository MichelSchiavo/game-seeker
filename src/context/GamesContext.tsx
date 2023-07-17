"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { getGamesWithTimeout } from "@/utils/check-games-list-timeout";
import { onValue, ref, set } from "firebase/database";
import { db } from "@/services/firebase-config";
import { Game } from "@/types/game";
import { Genres } from "@/types/genres";
import { IFavoriteGames } from "@/types/favorite-games";
import { Rates } from "@/types/rates";

interface GamesProviderProps {
  children: React.ReactNode;
}

export const GamesContext = createContext({
  search: "",
  setSearch: (value: string) => {},
  isFavorites: false,
  handleSetIsFavorites: () => {},
  isBestRank: "Todas as avaliações" as Rates,
  handleSetBestRank: (value: Rates) => {},
  games: [] as Game[],
  isLoading: true,
  genre: "ALL" as Genres,
  setGenre: (value: Genres) => {},
  saveGameOnDB: (user: string, data: IFavoriteGames) => {},
  favoriteGames: {} as IFavoriteGames,
  readGamesOnDB: (user: string) => {},
});

export const GamesProvider: React.FC<GamesProviderProps> = ({
  children,
}: GamesProviderProps) => {
  const [search, setSearch] = useState("");
  const [isFavorites, setIsFavorites] = useState(false);
  const [isBestRank, setIsBestRank] = useState<Rates>("Todas as avaliações");
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genre, setGenre] = useState<Genres>("ALL");
  const [favoriteGames, setFavoriteGames] = useState<IFavoriteGames>({});

  function handleSetIsFavorites() {
    setIsFavorites((prev) => !prev);
  }

  function handleSetBestRank(value: Rates) {
    setIsBestRank(value);
  }

  function saveGameOnDB(user: string, data: IFavoriteGames) {
    const uuid = user;
    set(ref(db, `/${uuid}`), { ...favoriteGames, ...data });
  }

  function readGamesOnDB(user: string) {
    const uuid = user;
    onValue(ref(db, `/${uuid}`), (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {
        setFavoriteGames(data);
      }
    });
  }

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
      value={{
        search,
        setSearch,
        isFavorites,
        handleSetIsFavorites,
        isBestRank,
        handleSetBestRank,
        games,
        isLoading,
        genre,
        setGenre,
        saveGameOnDB,
        favoriteGames,
        readGamesOnDB,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => {
  return useContext(GamesContext);
};
