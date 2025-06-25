import { State } from "@linttrap/oem";

export const ThemeState = State<"light" | "dark">("dark");
export const isDarkTheme = () => ThemeState.get() === "dark";
export const isLightTheme = () => ThemeState.get() === "light";
