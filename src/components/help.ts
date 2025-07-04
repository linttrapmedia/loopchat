import { HTML, useStyle } from "@linttrap/oem";
import { menu_state, theme_state } from "../state";
import { color } from "../theme";

export const html = HTML({
  style: useStyle(),
  "style:theme": useStyle({ state: theme_state }),
});

const CommandItem = (command: string, description: string) =>
  html.li(
    ["style", "display", "flex"],
    ["style", "gap", "2px"],
    ["style", "alignItems", "center"],
    ["style", "justifyContent", "flex-start"],
    ["style", "gap", "5px"]
  )(
    html.div(
      ["style", "backgroundColor", color.white_alpha_10],
      ["style", "padding", "2px 5px"],
      ["style", "borderRadius", "2px"]
    )(command),
    html.div(["style", "fontStyle", "italic"])(description)
  );

const Commands = (title: string, description: string, commands: [command: string, description: string][]) =>
  html.div()(
    html.h2(["style", "fontSize", "12px"], ["style", "color", color.white], ["style", "margin", "0px"])(title),
    html.p(["style", "fontSize", "12px"], ["style", "margin", "8px 0px 16px"])(description),
    html.ul(
      ["style", "listStyle", "none"],
      ["style", "padding", "0px"],
      ["style", "margin", "0px"],
      ["style", "display", "flex"],
      ["style", "flexDirection", "column"],
      ["style", "gap", "4px"]
    )(...commands.map((args) => CommandItem(...args)))
  );

export const Help = () =>
  html.div(
    ["style", "padding", "20px"],
    ["style", "display", "flex"],
    ["style", "flexDirection", "column"],
    ["style", "gap", "20px"]
  )(
    html.div()(
      html.h1(
        ["style", "padding", "0px"],
        ["style", "margin", "0px"],
        ["style", "fontSize", "16px"],
        ["style", "color", color.white],
        ["style", "fontFamily", "monospace"]
      )("L00PCHAT"),
      html.p(
        ["style", "margin", "10px 0px"],
        ["style", "fontSize", "16px"]
      )("Workflow Automation That Keeps You In The Loop")
    ),

    Commands(
      "Help",
      "The following commands are available:",
      menu_state.get().map((menu) => [menu.command, menu.description]) as [string, string][]
    )
  );
