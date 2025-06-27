import { HTML, State, useAttribute, useEvent, useStyle } from "@linttrap/oem";
import { SLASH_COMMANDS } from "../constants";
import { theme_state } from "../state";
import { color } from "../theme";
import type { CliStateType, SlashCommandType } from "../types";

const cli_state = State<CliStateType>({
  cursor_position: 0,
  command: "",
  firstChar: "",
  lastChar: "",
  menu: "none",
});

const cli_state_get = (key: keyof CliStateType) => {
  return cli_state.get()[key];
};

const cli_state_eq = (item: keyof CliStateType, value: any) => () => {
  return cli_state.get()[item] === value;
};

const html = HTML({
  "attr:base": useAttribute(),
  "event:keydown": useEvent({ event: "keydown" }),
  "event:mouseover": useEvent({ event: "mouseover" }),
  "event:mouseout": useEvent({ event: "mouseout" }),
  "event:keyup": useEvent({ event: "keyup" }),
  "event:input": useEvent({ event: "input" }),
  "event:click": useEvent({ event: "click" }),
  "style:base": useStyle(),
  "style:cli": useStyle({ state: cli_state }),
  "style:mouseout": useStyle({ event: "mouseout" }),
  "style:mouseover": useStyle({ event: "mouseover" }),
  "style:theme": useStyle({ state: theme_state }),
});

function handleInput(evt?: Event) {
  // get input from field
  const input = evt?.target as HTMLInputElement;
  if (!input) return;

  // get input values
  const value = input.value ?? cli_state_get("command");
  const lastChar = value[value.length - 1] ?? cli_state_get("lastChar");
  const firstChar = value[0] ?? cli_state_get("lastChar");

  // update the cursor position
  const cursor_position = input.selectionStart ?? cli_state_get("cursor_position");

  // update the command line state
  cli_state.deepSet("cursor_position", cursor_position);
  cli_state.deepSet("command", value);
  cli_state.deepSet("lastChar", lastChar);
  cli_state.deepSet("firstChar", firstChar);

  console.log(cli_state.get());

  // if user enters space, reset the command
  if (lastChar === " ") {
    cli_state.deepSet("command", "");
    cli_state.deepSet("menu", "none");
    return;
  }

  // process input for special characters
  if (cli_state_get("lastChar") === "/") {
    cli_state.deepSet("menu", "slash");
  }

  if (cli_state_get("command") === "") {
    cli_state.deepSet("menu", "none");
  }
}

function handleKeydown(evt?: KeyboardEvent) {
  if (!evt) return;
  const key = evt.key.toLowerCase();
  if (cli_state_get("menu") === "slash" && key === "arrowdown") {
    console.log("Arrow down pressed", key);
  }
}

function SlashCommandMenuItem(item: SlashCommandType) {
  console.log();

  const item_hover_state = State(false);
  const is_hovered = () => item_hover_state.get() === true;
  const is_not_hovered = () => item_hover_state.get() === false;

  const item_html = HTML({
    "event:mouseover": useEvent({ event: "mouseover" }),
    "event:mouseout": useEvent({ event: "mouseout" }),
    "style:hover": useStyle({ state: item_hover_state }),
    "style:cli": useStyle({ state: cli_state }),
    style: useStyle(),
  });

  return item_html.div(
    ["event:mouseover", () => item_hover_state.set(true)],
    ["event:mouseout", () => item_hover_state.set(false)],
    ["style", "padding", "3px"],
    ["style", "borderRadius", "4px"],
    ["style:cli", "display", "grid", () => item.command.startsWith(cli_state_get("command"))],
    ["style:cli", "display", "none", () => !item.command.startsWith(cli_state_get("command"))],
    ["style", "alignItems", "center"],
    ["style", "cursor", "pointer"],
    ["style", "gap", "10px"],
    ["style", "gridTemplateColumns", "max-content auto"],
    ["style:hover", "backgroundColor", "transparent", is_not_hovered],
    ["style:hover", "color", color.white, is_not_hovered],
    ["style:hover", "backgroundColor", color.white_alpha_50, is_hovered],
    ["style:hover", "color", color.black, is_hovered]
  )(
    item_html.div(
      ["style", "padding", "3px 5px"],
      ["style", "borderRadius", "4px"],
      ["style:hover", "backgroundColor", color.white_alpha_10, is_not_hovered],
      ["style:hover", "color", color.white, is_not_hovered],
      ["style:hover", "backgroundColor", color.white_alpha_50, is_hovered],
      ["style:hover", "color", color.black, is_hovered]
    )(item.command),
    item.description
  );
}

export const CommandLine = html.div(
  ["style:base", "flex", "1"],
  ["style:base", "width", "100%"],
  ["style:base", "position", "relative"],
  ["event:keydown", handleKeydown]
)(
  html.input(
    ["attr:base", "id", "cli"],
    ["style:base", "fontFamily", "courier, monospace"],
    ["style:base", "fontSize", "14px"],
    ["style:base", "lineHeight", "1.2"],
    ["style:base", "flex", "1"],
    ["style:base", "marginRight", "10px"],
    ["style:base", "border", "none"],
    ["style:base", "backgroundColor", "transparent"],
    ["style:base", "color", "inherit"],
    ["style:base", "outline", "none"],
    ["attr:base", "placeholder", "⠿ Enter the loop here"],
    ["attr:base", "autoFocus", "true"],
    ["style:base", "caretColor", color.white],
    ["event:input", handleInput],
    ["style:base", "width", "100%"]
  )(),
  html.div(
    ["style:base", "padding", "10px 0"],
    ["style:base", "margin", "10px 0 0"],
    ["style:base", "flexDirection", "column"],
    ["style:base", "gap", "2px"],
    ["style:base", "display", "flex"],
    ["style:cli", "display", "flex", cli_state_eq("menu", "slash")],
    ["style:cli", "display", "none", cli_state_eq("menu", "none")]
  )(...SLASH_COMMANDS.map(SlashCommandMenuItem))
);
