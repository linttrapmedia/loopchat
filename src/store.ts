import { State, Storage } from "@linttrap/oem";
import { type CliStateType, type MenuType, type ThemeType } from "./types";

export const colors = {
  black: "rgb(26,28,36)",
  white: "rgb(235, 235, 235)",
  white_alpha_50: "rgba(255, 255, 255, 0.5)",
  white_alpha_10: "rgba(255, 255, 255, 0.1)",
  red: "rgb(162, 84, 84)",
};

export const store = Storage({
  data: {
    cli: {
      state: State<CliStateType>({
        command: "",
        current_command: "",
        cursor_position: 0,
        firstChar: "",
        lastChar: "",
        menu_suggestion_index: 0,
        menu: "hidden",
      }),
      key: "cli",
      storage: "localStorage",
    },
    menu: {
      state: State<MenuType[]>([
        {
          command: "/settings",
          description: "Open settings",
          type: "slash",
          scope: "system",
          usage: "/settings",
        },
        {
          command: "/clear",
          description: "Clear the chat",
          type: "slash",
          scope: "system",
          usage: "/clear",
        },
      ]),
      key: "menu",
      storage: "localStorage",
    },
    theme: {
      state: State<ThemeType>("dark"),
      key: "theme",
      storage: "localStorage",
    },
    ui: {
      state: State<"clean" | "dirty">("clean"),
      key: "ui",
      storage: "localStorage",
    },
  },
});
