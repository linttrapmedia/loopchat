import { VIEWS } from "@/client/constants";
import { State, Storage } from "@linttrap/oem";
import { type Mode, type Theme, type View } from "./types";

export const store = Storage({
  data: {
    chat: [State<string>(""), "localStorage"],
    debug: [State<boolean>(true), "memory"],
    mode: [State<Mode>("normal"), "localStorage"],
    theme: [State<Theme>("dark"), "localStorage"],
    ui_state: [State<"init" | "ready">("init"), "memory"],
    view: [State<keyof typeof VIEWS>("Objects"), "localStorage"],
    views: [State<[string, View][]>(Object.entries(VIEWS)), "memory"],
  },
});
