import type { SlashCommandType } from "./types";

export const SLASH_COMMANDS: SlashCommandType[] = [
  {
    command: "/help",
    description: "Show help information for available commands.",
  },
  {
    command: "/clear",
    description: "Clear the command line input.",
  },
  {
    command: "/create",
    description: "Create a new item or resource.",
  },
  { command: "/theme", description: "Change the theme of the application." },
];
