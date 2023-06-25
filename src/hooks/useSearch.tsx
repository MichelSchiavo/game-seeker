import { useDeferredValue } from "react";
import { useGamesContext } from "@/context/GamesContext";

export function useSearch() {
  const { games, search, genre } = useGamesContext();
  const searchDeferred = useDeferredValue(search);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchDeferred.toLowerCase())
  );

  const filteredGamesByGenre = filteredGames.filter((game) => {
    if (genre === "ALL") {
      return game;
    } else {
      return game.genre === genre;
    }
  });

  return { filteredGamesByGenre };
}
