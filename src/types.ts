export type CliStateType = {
  command: string;
  firstChar: string;
  lastChar: string;
  menu: "slash" | "hash" | "at" | "none";
  value: string;
};

export type SlashCommandType = {
  command: string;
  description: string;
};

export type ThemeType = "light" | "dark";
