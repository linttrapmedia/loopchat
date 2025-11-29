import type { icons } from "@/icons";

export type ThemeType = "light" | "dark";

export type ObjectType = {
  id: string;
  name: string;
  noun: "person" | "place" | "thing";
  selected?: boolean;
};

export type MenuType = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof icons;
  action: () => void;
  active: boolean;
};

export type Actions = [action: "INIT"] | [action: "ACTIVE_MENU_ITEM", id: string];
