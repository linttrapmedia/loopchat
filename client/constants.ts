import type { Command, IndexedDB, View, ViewNames } from "@/client/types";

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

export const SYS_COMMANDS: Command[] = [
  {
    command: "/clear",
    description: "Clear the chat history",
    action: ["ON_CHAT_INPUT", ""],
  },
  {
    command: "/help",
    description: "Show help information",
    action: ["INIT"],
  },
  {
    command: "/mode",
    description: "Switch between normal and command modes",
    action: ["SWITCH_MODE", "normal"],
    options: [
      {
        name: "normal",
        description: "Switch to normal mode",
        short_flag: "-n",
        long_flag: "--normal",
      },
      {
        name: "command",
        description: "Switch to command mode",
        short_flag: "-c",
        long_flag: "--command",
      },
    ],
  },
  {
    command: "/theme",
    description: "Switch between light and dark themes",
    action: ["SWITCH_MODE", "normal"],
    options: [
      {
        name: "light",
        description: "Switch to light theme",
        short_flag: "-l",
        long_flag: "--light",
      },
      {
        name: "dark",
        description: "Switch to dark theme",
        short_flag: "-d",
        long_flag: "--dark",
      },
    ],
  },
  {
    command: "/thesaurus",
    description: "Exit command mode and return to normal mode",
    action: ["SWITCH_MODE_TO_NORMAL"],
  },
];
