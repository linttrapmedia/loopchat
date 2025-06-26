import { isDarkTheme, isLightTheme } from "../state";
import { html } from "../template";
import { color } from "../theme";
import { CommandLine } from "./cli";
import { Help } from "./help";

const Header = html.div(
  ["style:base", "display", "flex"],
  ["style:base", "flexDirection", "row"],
  ["style:base", "justifyContent", "space-between"],
  ["style:base", "alignItems", "center"],
  ["style:base", "padding", "10px"],
  ["style:base", "borderBottom", `1px solid ${color.white_alpha_10}`]
)(html.span(["style:base", "marginRight", "5px"])("$ "), CommandLine);

export const UI = html.div(
  ["style:base", "fontFamily", "courier, monospace"],
  ["style:base", "display", "flex"],
  ["style:base", "flexDirection", "column"],
  ["style:base", "width", "100%"],
  ["style:base", "height", "100%"],
  ["style:theme", "backgroundColor", color.black, isDarkTheme],
  ["style:theme", "color", color.white_alpha_50, isDarkTheme],
  ["style:theme", "backgroundColor", color.white, isLightTheme],
  ["style:theme", "color", color.black, isLightTheme],
  ["style:base", "fontSize", "13px"],
  ["style:base", "lineHeight", "1"],
  ["style:base", "overflowY", "auto"],
  ["style:base", "scrollbarWidth", "thin"],
  ["style:base", "scrollbarColor", `${color.white_alpha_10} transparent`]
)(Header, Help);
