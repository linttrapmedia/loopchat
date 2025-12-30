import type { VIEWS } from "@/client/constants";
import type { icons } from "@/client/icons";

export type Actions =
  | [action: "INIT"]
  | [action: "ACTIVE_MENU_ITEM", id: keyof typeof VIEWS]
  | [action: "SWITCH_MODE", mode: Mode]
  | [action: "SWITCH_MODE_TO_NORMAL"]
  | [action: "SWITCH_MODE_TO_COMMAND"]
  | [action: "NEXT_CMD_INDEX"]
  | [action: "PREV_CMD_INDEX"]
  | [action: "ON_CHAT_INPUT", input: string]
  | [action: "SHOW_HELP"]
  | [action: "AUTO_COMPLETE_COMMAND", command: string];

export type Command = {
  command: string;
  description: string;
  action: Actions;
  options?: {
    short_flag?: string;
    long_flag?: string;
    name: string;
    description: string;
    value?: { name: string; description: string };
  }[];
};

export type CommandMode = "at" | "slash" | "dash" | "hash" | undefined;

export type IndexedDB = { version: number; stores: Record<string, { name: string; keyPath: string }> };

export type Mode = "normal" | "command";

export type Theme = "light" | "dark";

export type ObjectType = {
  id: string;
  name: string;
  noun: "person" | "place" | "thing";
  selected?: boolean;
};

export type ViewNames = "Objects" | "Notifications" | "Agents" | "Tasks" | "Logs" | "Settings";

export type View = {
  label: string;
  description: string;
  icon: keyof typeof icons;
  ctrlCommands?: Record<string, [description: string, action: Actions]>;
  altCommands?: Record<string, [description: string, action: Actions]>;
};
