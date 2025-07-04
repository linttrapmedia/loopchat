import { State } from "@linttrap/oem";
import { type MenuType, type ThemeType } from "./types";

export const theme_state = State<ThemeType>("dark");

export const theme_state_eq = (value: ThemeType) => () => {
  return theme_state.get() === value;
};

export const ui_state = State<"clean" | "dirty">("clean");

export const ui_state_eq = (value: "clean" | "dirty" | "editing") => () => {
  return ui_state.get() === value;
};

export const menu_state = State<MenuType[]>(
  [
    {
      command: "/settings",
      description: "Open settings",
      type: "slash",
      scope: "system",
      usage: "/settings",
    },
    {
      command: "/help",
      description: "Get help",
      type: "slash",
      scope: "system",
      usage: "/help",
    },
    {
      command: "/hold",
      description: "Clear the chat",
      type: "slash",
      scope: "system",
      usage: "/clear",
    },
  ],
  {
    key: "menu_state",
    storage: localStorage,
  }
);

export const menu_state_slash_commands = () => menu_state.get().filter((item) => item.type === "slash");
export const menu_state_at_commands = () => menu_state.get().filter((item) => item.type === "at");
export const menu_state_hash_commands = () => menu_state.get().filter((item) => item.type === "hash");

ui_state.sub(console.log);
