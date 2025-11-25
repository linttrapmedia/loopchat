export type CliStateType = {
  command: string;
  current_command: string;
  cursor_position: number;
  firstChar: string;
  lastChar: string;
  menu_suggestion_index: number;
  menu: "showing" | "hidden";
};

export type SlashCommandType = {
  command: string;
  description: string;
};

export type HashCommandType = {
  command: string;
  description: string;
};

export type AtCommandType = {
  command: string;
  description: string;
};

export type MenuType = {
  command: string;
  description: string;
  type: "slash" | "hash" | "at";
  scope: "system" | "user";
  usage?: string;
};

export type ThemeType = "light" | "dark";
