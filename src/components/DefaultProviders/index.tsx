"use client";

import { GamesProvider } from "@/context/GamesContext";

interface IDefaultProviders {
  children: React.ReactNode;
}

export function DefaultProviders(props: IDefaultProviders) {
  return <GamesProvider>{props.children}</GamesProvider>;
}
