import { isDarkTheme, isLightTheme } from "../state";
import { html } from "../template";
import { color } from "../theme";

const Header = html.div(
  ["style:base", "display", "flex"],
  ["style:base", "flexDirection", "row"],
  ["style:base", "justifyContent", "space-between"],
  ["style:base", "alignItems", "center"],
  ["style:base", "padding", "10px"],
  ["style:base", "borderBottom", `1px solid ${color.white_alpha_10}`]
)(
  html.span(["style:base", "marginRight", "5px"])("$ "),
  html.input(
    ["style:base", "flex", "1"],
    ["style:base", "marginRight", "10px"],
    ["style:base", "border", "none"],
    ["style:base", "backgroundColor", "transparent"],
    ["style:base", "color", "inherit"],
    ["style:base", "outline", "none"],
    ["attr:base", "placeholder", "enter command (/help)"]
  )()
);

const HelpItem = (command: string, description: string) =>
  html.li(
    ["style:base", "display", "flex"],
    ["style:base", "gap", "2px"],
    ["style:base", "alignItems", "center"],
    ["style:base", "justifyContent", "flex-start"],
    ["style:base", "gap", "5px"]
  )(
    html.div(
      ["style:base", "backgroundColor", color.white_alpha_10],
      ["style:base", "padding", "5px"],
      ["style:base", "borderRadius", "2px"]
    )(command),
    html.div(["style:base", "fontStyle", "italic"])(description)
  );

const Help = html.div(["style:base", "padding", "10px"])(
  html.h1(
    ["style:base", "padding", "0px"],
    ["style:base", "margin", "0px"],
    ["style:base", "fontSize", "21px"]
  )("Loopchat"),
  html.p()("Create amazing automated workflows to show your boss."),
  html.h2(["style:base", "fontSize", "16px"])("Commands"),
  html.ul(
    ["style:base", "listStyle", "none"],
    ["style:base", "padding", "0px"],
    ["style:base", "margin", "0px"],
    ["style:base", "display", "flex"],
    ["style:base", "flexDirection", "column"],
    ["style:base", "gap", "5px"]
  )(
    HelpItem("/run <workflow>", "Run a specific workflow"),
    HelpItem("/run", "Run the last workflow"),
    HelpItem("/edit <workflow>", "Edit a saved workflow"),
    HelpItem("/save <workflow>", "Save the current workflow"),
    HelpItem("/delete <workflow>", "Delete a saved workflow"),
    HelpItem("/list", "List all saved workflows"),
    HelpItem("/export", "Export all saved workflows"),
    HelpItem("/import", "Import workflows from a file"),
    HelpItem("/settings", "Open settings"),
    HelpItem("/help", "Show this help message"),
    HelpItem("/clear", "Clear the console"),
    HelpItem("/theme", "Toggle between light and dark themes")
  )
);

export const UI = html.div(
  ["style:base", "fontFamily", "courier, monospace"],
  ["style:base", "display", "flex"],
  ["style:base", "flexDirection", "column"],
  ["style:base", "width", "100%"],
  ["style:base", "height", "100%"],
  ["style:theme", "backgroundColor", color.black, isDarkTheme],
  ["style:theme", "color", color.white, isDarkTheme],
  ["style:theme", "backgroundColor", color.white, isLightTheme],
  ["style:theme", "color", color.black, isLightTheme],
  ["style:base", "fontSize", "12px"]
)(Header, Help);
