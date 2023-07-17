import { useEffect, useState } from "react";
import LazyLoad from "vanilla-lazyload";
import { Text } from "../Typography";
import { StarIcon, HeartIcon } from "@heroicons/react/20/solid";
import { useGamesContext } from "@/context/GamesContext";
import { useAuthContext } from "@/context/AuthContext";

interface IGameCard {
  id: number;
  title: string;
  thumbnail: string;
  game_url: string;
  starLevel: number;
  favorite?: boolean;
}

export function GameCard(props: IGameCard) {
  const { user } = useAuthContext();
  const { saveGameOnDB, favoriteGames } = useGamesContext();
  const [hoveredStars, setHoveredStars] = useState(0);
  const [isSelected, setIsSelected] = useState(props.favorite || false);

  const handleStarHover = (index: number) => {
    setHoveredStars(index + 1);
  };

  const handleStarLeave = () => {
    setHoveredStars(0);
  };

  const handleHeartClick = () => {
    if (user) {
      setIsSelected(!isSelected);
      saveGameOnDB(user.uid, {
        ...favoriteGames,
        [props.id]: { favorite: !isSelected, stars: props.starLevel },
      });

      return;
    }

    window.location.href = "/auth/login";
  };

  const handleStarClick = (index: number) => {
    if (user) {
      saveGameOnDB(user.uid, {
        ...favoriteGames,
        [props.id]: { favorite: props.favorite, stars: index },
      });

      return;
    }

    window.location.href = "/auth/login";
  };

  const handleRedirectClick = () => {
    window.open(props.game_url, "_blank");
  };

  useEffect(() => {
    const lazyLoad = new LazyLoad({});
    lazyLoad.update();

    return () => {
      lazyLoad.destroy();
    };
  }, []);

  return (
    <div className={`w-80 h-52 relative`}>
      <figure className="relative w-full h-full">
        <picture className="flex flex-col gap-2">
          <figcaption className="flex items-center justify-between gap-2">
            <Text color="text-slate-300">{props.title}</Text>
          </figcaption>

          <div className="w-full h-full relative transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              className="rounded-lg cursor-pointer lazy"
              data-src={props.thumbnail}
              alt={props.title + " game"}
              onClick={handleRedirectClick}
            />

            <div className="w-full p-2 bg-[#4c102a] rounded-b-md absolute bottom-0 flex items-center justify-between">
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => {
                  const isFilled =
                    (hoveredStars === 0 && props.starLevel > index) ||
                    (hoveredStars > 0 && index < hoveredStars);

                  return (
                    <StarIcon
                      key={index + props.starLevel}
                      className={`h-4 w-4 cursor-pointer ${
                        isFilled ? "text-yellow-500" : "text-gray-400"
                      }`}
                      onMouseEnter={() => handleStarHover(index)}
                      onMouseLeave={handleStarLeave}
                      onClick={() => {
                        handleStarClick(
                          index === 0 &&
                            hoveredStars === 1 &&
                            props.starLevel === 1
                            ? 0
                            : index + 1
                        );
                      }}
                    />
                  );
                })}
              </div>

              <div
                className={`cursor-pointer ${
                  isSelected ? "text-red-500" : "text-gray-400"
                } ${props.favorite && "text-red-500"} hover:text-red-500`}
                onClick={() => handleHeartClick()}
              >
                <HeartIcon
                  className={`h-6 w-6 transition-all duration-300 ease-in-out ${
                    isSelected
                      ? "animate-pulse scale-125 text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>
        </picture>
      </figure>
    </div>
  );
}
