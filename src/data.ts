import icons from "@/icons";
import util from "@/util";
import { State, Storage } from "@linttrap/oem";
import { type MenuType, type ObjectType, type ThemeType } from "./types";

export const hex = {
  black: "#121316",
  white: "#ebebeb",
  red: "#a25454",
  brand: "#6c63ff",
};

const gridColState = () => {
  const state = State<number>(0);
  const apply = () => {
    const width = window.innerWidth;
    const cols = Math.floor(width / 100);
    state.set(cols);
  };
  apply();
  window.addEventListener("orientationchange", util.debounce(apply, 100));
  window.addEventListener("resize", util.debounce(apply, 100));
  return state;
};

const gridRowState = () => {
  const state = State<number>(0);
  const apply = () => {
    const height = window.innerHeight;
    const rows = Math.floor(height / 50);
    state.set(rows);
  };
  apply();
  window.addEventListener("orientationchange", util.debounce(apply, 100));
  window.addEventListener("resize", util.debounce(apply, 100));
  return state;
};

export const store = Storage({
  data: {
    chat: [State<string>(""), "localStorage"],
    debug: [State<boolean>(true), "memory"],
    grid_cols: [gridColState(), "memory"],
    grid_rows: [gridRowState(), "memory"],
    menu: [
      State<MenuType[]>([
        // object manager grid
        {
          id: "1",
          title: "Objects",
          description: "Object manager",
          icon: icons.box(hex.white),
          action: () => {},
          active: true,
        },
        // messages and updates
        {
          id: "2",
          title: "Messages",
          description: "Message center",
          icon: icons.box(hex.white),
          action: () => {},
          active: false,
        },
        // task manager and calendar
        {
          id: "3",
          title: "Tasks",
          description: "Task manager",
          icon: icons.box(hex.white),
          action: () => {},
          active: false,
        },
        // agents
        {
          id: "4",
          title: "Agents",
          description: "Agent manager",
          icon: icons.box(hex.white),
          action: () => {},
          active: false,
        },
        // settings
        {
          id: "5",
          title: "Settings",
          description: "App settings",
          icon: icons.box(hex.white),
          action: () => {},
          active: false,
        },
      ]),
      "localStorage",
    ],
    objects: [
      State<ObjectType[]>([
        { id: "1", name: "Alice", noun: "person" },
        { id: "1", name: "Allan", noun: "person" },
        { id: "2", name: "Wonderland", noun: "place" },
        { id: "3", name: "Rabbit Hole", noun: "thing" },
        { id: "4", name: "Debug Button", noun: "thing" },
        { id: "5", name: "Chat Input", noun: "thing" },
        { id: "6", name: "Send Button", noun: "thing" },
        { id: "7", name: "Message", noun: "thing" },
        { id: "8", name: "Settings", noun: "thing" },
        { id: "9", name: "Profile", noun: "thing" },
        { id: "10", name: "Search", noun: "thing" },
        { id: "11", name: "Notification", noun: "thing" },
        { id: "12", name: "Archive", noun: "thing" },
        { id: "13", name: "Trash", noun: "thing" },
        { id: "14", name: "Home", noun: "place" },
        { id: "15", name: "Library", noun: "place" },
      ]),
      "localStorage",
    ],
    theme: [State<ThemeType>("dark"), "localStorage"],
    uiState: [State<"init" | "ready">("init"), "localStorage"],
  },
});

export const totalGridCells = () =>
  Array.from({ length: store.data.grid_rows.val() * store.data.grid_cols.val() }, (_, i) => i);
