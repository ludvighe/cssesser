import { createUniqueId } from "solid-js";
import { BoxShadow, Shadow } from "./types";

export const shadowsToString = (
  shadows: Shadow[],
  fullString: boolean = false
) => {
  let shadowsStr = "";
  shadows.forEach((shadow, index) => {
    const shadowArgs: string[] = [
      shadow.color,
      `${shadow.horizontalOffset}px`,
      `${shadow.verticalOffset}px`,
    ];

    if (shadow.blurRadius !== 0 || shadow.spread !== 0)
      shadowArgs.push(`${shadow.blurRadius}px`);
    if (shadow.spread !== 0) shadowArgs.push(`${shadow.spread}px`);
    if (shadow.inset) shadowArgs.push("inset");

    if (index !== 0) shadowsStr += ", ";
    shadowsStr += shadowArgs.join(" ");
  });
  return fullString ? `box-shadow: ${shadowsStr};` : shadowsStr;
};

export const initialBoxShadow: BoxShadow = {
  backgroundColor: "#ffffff",
  foregroundColor: "#ffffff",
  shadows: [
    {
      id: createUniqueId(),
      color: "#000000aa",
      horizontalOffset: 0,
      verticalOffset: 5,
      blurRadius: 15,
      inset: false,
      spread: 0,
    },
  ],
};
