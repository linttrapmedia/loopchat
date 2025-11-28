export type ThemeType = "light" | "dark";

export type Actions = ["INIT"];

export type ObjectType = {
  id: string;
  name: string;
  noun: "person" | "place" | "thing";
};

export type MenuType = {
  id: string;
  title: string;
  description: string;
  icon: SVGSVGElement;
  action: () => void;
  active: boolean;
};
