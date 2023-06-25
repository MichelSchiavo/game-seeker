import { useGamesContext } from "@/context/GamesContext";
import { PrimaryInputWithIcon } from "../PrimaryInput";
import { LogoIcon } from "../icons/logo";

export function Header() {
  const { search, setSearch, games } = useGamesContext();
  return (
    <header className="w-full py-6 bg-black sticky top-0 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex justify-center md:justify-start">
            <a href="/">
              <LogoIcon />
            </a>
          </div>

          <div className="flex justify-center md:justify-end">
            <PrimaryInputWithIcon
              value={search}
              handleChange={setSearch}
              placeholder="Procurando por algum jogo?"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
