import { InputHTMLAttributes } from "react";
import { SearchIcon } from "../icons/search";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  handleChange: (value: string) => void;
}

export function PrimaryInputWithIcon(props: IInputProps) {
  return (
    <div className="w-56 relative">
      <input
        className="w-full rounded-lg p-2 border-none outline-none text-xs text-zinc-900"
        type="text"
        onChange={(event) => props.handleChange(event.target.value)}
        placeholder="Procurando por algum jogo?"
      />

      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <SearchIcon />
      </div>
    </div>
  );
}
