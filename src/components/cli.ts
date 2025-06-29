import { HTML, State, useAttribute, useEvent, useStyle } from "@linttrap/oem";
import { SLASH_COMMANDS } from "../constants";
import { theme_state } from "../state";
import { color } from "../theme";
import type { SlashCommandType } from "../types";

export type CliStateType = {
  cursor_position: number;
  current_slash_command: string;
  command: string;
  firstChar: string;
  lastChar: string;
  menu: "slash" | "hash" | "at" | "none";
};

const cli_state = State<CliStateType>({
  cursor_position: 0,
  current_slash_command: "",
  command: "",
  firstChar: "",
  lastChar: "",
  menu: "none",
});

const cli_state_get = (key: keyof CliStateType): string => {
  return String(cli_state.get()[key]);
};

const cli_state_eq = (item: keyof CliStateType, value: any) => () => {
  return cli_state.get()[item] === value;
};

const cli_state_neq = (item: keyof CliStateType, value: any) => () => {
  return cli_state.get()[item] !== value;
};

const html = HTML({
  attr: useAttribute(),
  "event:keydown": useEvent({ event: "keydown" }),
  "event:mouseover": useEvent({ event: "mouseover" }),
  "event:mouseout": useEvent({ event: "mouseout" }),
  "event:keyup": useEvent({ event: "keyup" }),
  "event:input": useEvent({ event: "input" }),
  "event:click": useEvent({ event: "click" }),
  style: useStyle(),
  "style:cli": useStyle({ state: cli_state }),
  "style:mouseout": useStyle({ event: "mouseout" }),
  "style:mouseover": useStyle({ event: "mouseover" }),
  "style:theme": useStyle({ state: theme_state }),
});

function handleInput(evt?: Event) {
  // get input from field
  const input = evt?.target as HTMLDivElement | null;
  if (!input) return;

  // get input values
  const command = input.textContent ?? cli_state_get("command");
  const lastChar = command[command.length - 1] ?? cli_state_get("lastChar");
  const lastCharIsSpace = lastChar === " " || lastChar === "\xA0";
  const firstChar = command[0] ?? cli_state_get("lastChar");

  // get cursor position from editablecontent input
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  const range = selection.getRangeAt(0);
  const cursorPosition = range.startOffset;

  // update the command line state
  cli_state.deepSet("cursor_position", cursorPosition);
  cli_state.deepSet("command", command);
  cli_state.deepSet("lastChar", lastChar);
  cli_state.deepSet("firstChar", firstChar);

  // if the lastChar is a space, reset the command and return
  if (lastCharIsSpace) {
    cli_state.deepSet("current_slash_command", "");
    cli_state.deepSet("menu", "none");
    return;
  }

  // inspect current command
  const start = command.lastIndexOf(" ", cursorPosition - 1) + 1;
  const end = command.indexOf(" ", cursorPosition);
  const curr = command.substring(start, end === -1 ? undefined : end);
  const isSlashCommand = SLASH_COMMANDS.some((item) => item.command.startsWith(curr));
  const isHashCommand = false; // Placeholder for hash commands, if any
  const isAtCommand = false; // Placeholder for at commands, if any

  const menu_type: CliStateType["menu"] =
    curr.startsWith("/") && isSlashCommand
      ? "slash"
      : curr.startsWith("#") && isHashCommand
      ? "hash"
      : curr.startsWith("@") && isAtCommand
      ? "at"
      : "none";

  switch (menu_type) {
    case "slash":
      cli_state.deepSet("current_slash_command", curr);
      cli_state.deepSet("menu", "slash");
      break;
    case "hash":
    case "at":
    case "none":
      cli_state.deepSet("current_slash_command", "");
      cli_state.deepSet("menu", "none");
      break;
    default:
      cli_state.deepSet("current_slash_command", "");
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
    ["style:cli", "display", "grid", () => item.command.startsWith(cli_state_get("current_slash_command"))],
    ["style:cli", "display", "none", () => !item.command.startsWith(cli_state_get("current_slash_command"))],
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
  ["style", "flex", "1"],
  ["style", "width", "100%"],
  ["style", "position", "relative"],
  ["event:keydown", handleKeydown]
)(
  html.div(
    ["attr", "id", "cli"],
    ["style", "fontFamily", "courier, monospace"],
    ["style", "fontSize", "14px"],
    ["style", "lineHeight", "1.2"],
    ["style", "flex", "1"],
    ["style", "marginRight", "10px"],
    ["style", "border", "none"],
    ["style", "backgroundColor", "transparent"],
    ["style", "color", "inherit"],
    ["style", "outline", "none"],
    ["attr", "autoFocus", "true"],
    ["style", "caretColor", color.white],
    ["event:input", handleInput],
    ["style", "width", "100%"],
    ["attr", "contentEditable", "true"]
  )(),
  html.div(
    ["style:cli", "display", "flex", cli_state_eq("command", "")],
    ["style:cli", "display", "none", cli_state_neq("command", "")],
    ["style", "alignItems", "center"],
    ["style", "justifyContent", "flex-start"],
    ["style", "lineHeight", "21px"],
    ["style", "gap", "5px"]
  )(html.div(["style", "fontSize", "21px"])("↑"), html.span()("Enter the loop")),
  html.div(
    ["style", "padding", "10px 0"],
    ["style", "margin", "10px 0 0"],
    ["style", "flexDirection", "column"],
    ["style", "gap", "2px"],
    ["style", "display", "flex"],
    ["style:cli", "display", "flex", cli_state_eq("menu", "slash")],
    ["style:cli", "display", "none", cli_state_eq("menu", "none")]
  )(...SLASH_COMMANDS.map(SlashCommandMenuItem))
);
