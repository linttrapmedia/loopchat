import type { VIEWS } from "@/constants";
import type { icons } from "@/icons";

export type Actions =
  | [action: "INIT"]
  | [action: "ACTIVE_MENU_ITEM", id: keyof typeof VIEWS]
  | [action: "SWITCH_MODE", mode: Mode];

export type Mode = "normal" | "command";

export type ThemeType = "light" | "dark";

export type ObjectType = {
  id: string;
  name: string;
  noun: "person" | "place" | "thing";
  selected?: boolean;
};

export type ViewNames = "Objects" | "Notifications" | "Agents" | "Tasks" | "Logs" | "Settings";

export type ViewType = {
  label: string;
  description: string;
  icon: keyof typeof icons;
  ctrlCommands?: Record<string, [description: string, action: Actions]>;
  altCommands?: Record<string, [description: string, action: Actions]>;
};
