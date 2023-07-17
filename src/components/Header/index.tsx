"use client";

import { useGamesContext } from "@/context/GamesContext";
import { PrimaryInputWithIcon } from "../PrimaryInput";
import { LogoIcon } from "../icons/logo";
import { useAuthContext } from "@/context/AuthContext";
import { Spinner } from "../Spinner";

export function Header() {
  const { user, loadingUser, handleLogOff } = useAuthContext();
  const { search, setSearch } = useGamesContext();

  return (
    <header className="w-full py-6 px-2 bg-black sticky top-0 z-10 md:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex justify-center md:justify-start">
            <a href="/">
              <LogoIcon />
            </a>
          </div>

          <div className="flex justify-center items-center gap-2 md:justify-end">
            <PrimaryInputWithIcon
              value={search}
              handleChange={setSearch}
              placeholder="Procurando por algum jogo?"
            />

            {loadingUser ? (
              <Spinner size="medium" />
            ) : (
              <button
                className="py-1 px-2 bg-[#4c102a] hover:bg-[#3f0d23] text-white rounded-md shadow-md font-medium transition-background duration-300 ease-in-out"
                onClick={
                  user
                    ? handleLogOff
                    : () => (window.location.href = "/auth/login")
                }
              >
                {user ? "Logout" : "Login"}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
