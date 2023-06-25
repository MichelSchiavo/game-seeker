import React from "react";

export type TailwindTextColor =
  | "text-black"
  | "text-white"
  | "text-slate-300"
  | "text-gray-600";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?:
    | "text-3xl"
    | "text-2xl"
    | "text-xl"
    | "text-lg"
    | "text-base"
    | "text-sm"
    | "text-xs"
    | "text-[14px]"
    | "text-[12px]";
  lineHeight?:
    | "leading-[100%]"
    | "leading-[110%]"
    | "leading-[120%]"
    | "leading-[130%]"
    | "leading-[140%]"
    | "leading-[150%]";
  weight?: "font-light" | "font-normal" | "font-semibold" | "font-bold";
  color?: TailwindTextColor;
  centered?: boolean;
  asBlock?: boolean;
  shadow?: boolean;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  size = "text-base",
  weight = "font-normal",
  lineHeight = "leading-[100%]",
  color = "text-light",
  asBlock,
  centered,
  shadow,
  children,
  ...rest
}) => {
  const shadowClass = shadow ? "drop-shadow-lg shadow-black" : "";
  const blockClass = asBlock ? "block" : "";
  const centeredClass = centered ? "text-center" : "";

  return (
    <span
      className={`text ${size} ${lineHeight} ${weight} ${color} ${shadowClass} ${blockClass} ${centeredClass}`}
      // {...rest}
    >
      {children}
    </span>
  );
};
