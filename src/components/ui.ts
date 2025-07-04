import { HTML, useInnerHTML, useStyle } from "@linttrap/oem";
import { theme_state, theme_state_eq, ui_state } from "../state";
import { color } from "../theme";
import { CommandLine } from "./cli";
import { Help } from "./help";
import { Thread } from "./thread";

export const html = HTML({
  style: useStyle(),
  "style:theme": useStyle({ state: theme_state }),
  "html:ui": useInnerHTML({ state: ui_state }),
});

const Header = html.div(
  ["style", "display", "flex"],
  ["style", "flexDirection", "row"],
  ["style", "justifyContent", "space-between"],
  ["style", "alignItems", "center"],
  ["style", "padding", "10px"],
  ["style", "borderBottom", `1px solid ${color.white_alpha_10}`]
)(CommandLine);

export const UI = html.div(
  ["style", "fontFamily", "courier, monospace"],
  ["style", "display", "flex"],
  ["style", "flexDirection", "column"],
  ["style", "width", "100%"],
  ["style", "height", "100%"],
  ["style:theme", "backgroundColor", color.black, theme_state_eq("dark")],
  ["style:theme", "color", color.white_alpha_50, theme_state_eq("dark")],
  ["style:theme", "backgroundColor", color.white, theme_state_eq("light")],
  ["style:theme", "color", color.black, theme_state_eq("light")],
  ["style", "fontSize", "13px"],
  ["style", "lineHeight", "1"],
  ["style", "overflowY", "auto"],
  ["style", "scrollbarWidth", "thin"],
  ["style", "scrollbarColor", `${color.white_alpha_10} transparent`]
)(Header, html.div(["html:ui", (state) => (state === "clean" ? Help() : Thread())])());
