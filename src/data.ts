import { debounce } from "@/util";
import { State, Storage } from "@linttrap/oem";
import { type ThemeType } from "./types";

export const colors = {
  black: "rgba(18, 19, 22, 1)",
  white: "rgb(235, 235, 235)",
  white_alpha_50: "rgba(255, 255, 255, 0.5)",
  white_alpha_10: "rgba(255, 255, 255, 0.1)",
  red: "rgb(162, 84, 84)",
};

const gridCellTolerance = 75;

const gridColState = () => {
  const state = State<number>(0);
  const apply = () => {
    const width = window.innerWidth;
    const cols = Math.floor(width / gridCellTolerance);
    state.set(cols);
  };
  apply();
  window.addEventListener("orientationchange", debounce(apply, 100));
  window.addEventListener("resize", debounce(apply, 100));
  return state;
};

const gridRowState = () => {
  const state = State<number>(0);
  const apply = () => {
    const height = window.innerHeight;
    const rows = Math.floor(height / gridCellTolerance);
    state.set(rows);
  };
  apply();
  window.addEventListener("orientationchange", debounce(apply, 100));
  window.addEventListener("resize", debounce(apply, 100));
  return state;
};

export const store = Storage({
  data: {
    grid_cols: [gridColState(), "localStorage"],
    grid_rows: [gridRowState(), "localStorage"],
    theme: [State<ThemeType>("dark"), "localStorage"],
    uiState: [State<"init" | "ready">("init"), "localStorage"],
  },
});
