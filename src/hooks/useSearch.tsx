import { useDeferredValue } from "react";
import { useGamesContext } from "@/context/GamesContext";

export function useSearch() {
  const { isFavorites, isBestRank, games, search, genre, favoriteGames } =
    useGamesContext();
  const searchDeferred = useDeferredValue(search);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchDeferred.toLowerCase())
  );

  const filteredGamesByFavorites = filteredGames.filter((game) => {
    if (isFavorites) {
      return favoriteGames[game.id]?.favorite;
    } else {
      return game;
    }
  });

  const filteredGamesByStars = filteredGamesByFavorites
    .map((game) => ({
      ...game,
      stars: favoriteGames[game.id]?.stars || 0,
    }))
    .sort((gameA, gameB) => {
      if (isBestRank === "Piores") {
        return gameA.stars - gameB.stars;
      } else if (isBestRank === "Melhores") {
        return gameB.stars - gameA.stars;
      } else {
        return 0;
      }
    });

  const filteredGamesByGenre = filteredGamesByStars.filter((game) => {
    if (genre === "ALL") {
      return game;
    } else {
      return game.genre === genre;
    }
  });

  return { filteredGamesByGenre };
}
