import { State, Storage } from "@linttrap/oem";
import { type ThemeType } from "./types";

export const colors = {
  black: "rgba(18, 19, 22, 1)",
  white: "rgb(235, 235, 235)",
  white_alpha_50: "rgba(255, 255, 255, 0.5)",
  white_alpha_10: "rgba(255, 255, 255, 0.1)",
  red: "rgb(162, 84, 84)",
};

export const store = Storage({
  data: {
    baseGrid: {
      state: State<number>(12),
      key: "baseGrid",
      storage: "localStorage",
    },
    theme: {
      state: State<ThemeType>("dark"),
      key: "theme",
      storage: "localStorage",
    },
  },
});
