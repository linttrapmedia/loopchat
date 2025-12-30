import { SYS_COMMANDS, VIEWS } from "@/client/constants";
import { State, Storage } from "@linttrap/oem";
import { type Command, type CommandMode, type Mode, type Theme, type View } from "./types";

export const store = Storage({
  data: {
    chat: [State<string>(""), "localStorage"],
    chat_refresh: [State<number>(0), "localStorage"],
    caret_pos: [State<number>(0), "localStorage"],
    commands: [State<Command[]>(SYS_COMMANDS), "localStorage"],
    commands_filter: [State<Command[]>([]), "localStorage"],
    commands_filter_idx: [State<number>(-1), "localStorage"],
    command_mode: [State<CommandMode>(undefined), "localStorage"],
    command_curr: [State<string | null>(null), "localStorage"],
    debug: [State<boolean>(true), "memory"],
    mode: [State<Mode>("normal"), "localStorage"],
    theme: [State<Theme>("dark"), "localStorage"],
    ui_state: [State<"init" | "ready">("init"), "memory"],
    view: [State<keyof typeof VIEWS>("Objects"), "localStorage"],
    views: [State<[string, View][]>(Object.entries(VIEWS)), "memory"],
  },
});
