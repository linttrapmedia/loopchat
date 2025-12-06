import { VIEWS } from "@/constants";
import util from "@/util";
import { State, Storage } from "@linttrap/oem";
import { type Mode, type ObjectType, type ThemeType, type ViewType } from "./types";

const GridColState = () => {
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

const GridRowState = () => {
  const state = State<number>(0);
  // account for the two fixed rows at the top of the UI
  const minRows = Object.entries(VIEWS).length + 2;
  const apply = () => {
    const height = window.innerHeight;
    const rows = Math.floor(height / 50);
    state.set(rows < minRows ? minRows : rows);
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
    obj_grid_cols: [GridColState(), "localStorage"],
    obj_grid_rows: [GridRowState(), "localStorage"],
    mode: [State<Mode>("normal"), "localStorage"],
    filteredObjects: [State<ObjectType[]>([]), "memory"],
    filteredObjectIdx: [State<number>(-1), "memory"],
    cachedObjects: [
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
    uiState: [State<"init" | "ready">("init"), "memory"],
    view: [State<keyof typeof VIEWS>("Objects"), "localStorage"],
    showCommands: [State<boolean>(false), "memory"],
    views: [State<[string, ViewType][]>(Object.entries(VIEWS)), "memory"],
  },
});

export const totalGridCells = () =>
  Array.from({ length: store.data.obj_grid_rows.val() * store.data.obj_grid_cols.val() }, (_, i) => i);
