"use client";
import { useEffect } from "react";
import LazyLoad from "vanilla-lazyload";
import { Text } from "../Typography";

interface IGameCard {
  title: string;
  thumbnail: string;
  game_url: string;
}

export function GameCard(props: IGameCard) {
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
          <figcaption>
            <Text color="text-slate-300">{props.title}</Text>
          </figcaption>

          <a
            className="w-full h-full"
            href={props.game_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="rounded-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 lazy"
              data-src={props.thumbnail}
              alt={props.title + " game"}
            />
          </a>
        </picture>
      </figure>
    </div>
  );
}
