import { State } from "@linttrap/oem";
import type { ThemeType } from "./types";

export const theme_state = State<ThemeType>("dark");

export const theme_state_eq = (value: ThemeType) => () => {
  return theme_state.get() === value;
};
