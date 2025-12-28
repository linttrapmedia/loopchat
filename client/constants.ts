import type { Command, IndexedDB, View, ViewNames } from "@/client/types";

export const COMMANDS: Command[] = [
  {
    command: "/help",
    description: "Show help information",
    action: ["INIT"],
  },
  {
    command: "/mode [normal|command]",
    description: "Switch between normal and command modes",
    action: ["SWITCH_MODE", "normal"],
    options: [
      {
        option: "normal",
        description: "Switch to normal mode",
      },
      {
        option: "command",
        description: "Switch to command mode",
      },
    ],
  },
];

export const HEX = {
  black: "#121316",
  white: "#aaaaaa",
  red: "#a25454",
  brand: "#d7e5e8ff",
  // brand: "#1fe41f",
};

export const VIEWS: Record<ViewNames, View> = {
  Objects: {
    label: "Objects",
    description: "Object manager",
    icon: "box",
    ctrlCommands: {
      "Ctrl+N": ["Go to Notifications", ["ACTIVE_MENU_ITEM", "Notifications"]],
      "Ctrl+A": ["Go to Agents", ["ACTIVE_MENU_ITEM", "Agents"]],
      "Ctrl+T": ["Go to Tasks", ["ACTIVE_MENU_ITEM", "Tasks"]],
      "Ctrl+L": ["Go to Logs", ["ACTIVE_MENU_ITEM", "Logs"]],
      "Ctrl+S": ["Go to Settings", ["ACTIVE_MENU_ITEM", "Settings"]],
    },
  },
  Notifications: {
    label: "Notifications",
    description: "Notification center",
    icon: "envelope",
  },
  Agents: {
    label: "Agents",
    description: "Agent manager",
    icon: "robot",
  },
  Tasks: {
    label: "Tasks",
    description: "Task manager",
    icon: "clipboard",
  },
  Logs: {
    label: "Logs",
    description: "System logs",
    icon: "list",
  },
  Settings: {
    label: "Settings",
    description: "App settings",
    icon: "gear",
  },
};

export const INDEXEDDB: IndexedDB = {
  version: 1,
  stores: {
    objects: {
      name: "objects",
      keyPath: "id",
    },
  },
};
