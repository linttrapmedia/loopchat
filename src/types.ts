export type CliStateType = {
  cursor_position: number;
  command: string;
  firstChar: string;
  lastChar: string;
  menu: "slash" | "hash" | "at" | "none";
};

export type SlashCommandType = {
  command: string;
  description: string;
};

export type ThemeType = "light" | "dark";
