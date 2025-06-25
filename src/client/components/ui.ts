import { isDarkTheme, isLightTheme } from "../state";
import { html } from "../template";
import { color } from "../theme";

export const UI = html.div(
  ["style:base", "display", "flex"],
  ["style:base", "flexDirection", "column"],
  ["style:base", "width", "100%"],
  ["style:base", "height", "100%"],
  ["style:base", "padding", "10px"],
  ["style:theme", "backgroundColor", color.black, isDarkTheme],
  ["style:theme", "color", color.white, isDarkTheme],
  ["style:theme", "backgroundColor", color.white, isLightTheme],
  ["style:theme", "color", color.black, isLightTheme]
)("hi");
