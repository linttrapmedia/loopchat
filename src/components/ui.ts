import { HTML, useStyle } from "@linttrap/oem";
import { theme_state, theme_state_eq } from "../state";
import { color } from "../theme";
import { CommandLine } from "./cli";
import { Help } from "./help";

export const html = HTML({
  "style:base": useStyle(),
  "style:theme": useStyle({ state: theme_state }),
});

const Header = html.div(
  ["style:base", "display", "flex"],
  ["style:base", "flexDirection", "row"],
  ["style:base", "justifyContent", "space-between"],
  ["style:base", "alignItems", "center"],
  ["style:base", "padding", "10px"],
  ["style:base", "borderBottom", `1px solid ${color.white_alpha_10}`]
)(CommandLine);

export const UI = html.div(
  ["style:base", "fontFamily", "courier, monospace"],
  ["style:base", "display", "flex"],
  ["style:base", "flexDirection", "column"],
  ["style:base", "width", "100%"],
  ["style:base", "height", "100%"],
  ["style:theme", "backgroundColor", color.black, theme_state_eq("dark")],
  ["style:theme", "color", color.white_alpha_50, theme_state_eq("dark")],
  ["style:theme", "backgroundColor", color.white, theme_state_eq("light")],
  ["style:theme", "color", color.black, theme_state_eq("light")],
  ["style:base", "fontSize", "13px"],
  ["style:base", "lineHeight", "1"],
  ["style:base", "overflowY", "auto"],
  ["style:base", "scrollbarWidth", "thin"],
  ["style:base", "scrollbarColor", `${color.white_alpha_10} transparent`]
)(Header, Help);
