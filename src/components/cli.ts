import { store } from "@/store";
import { tag, trait } from "@/template";
import { State } from "@linttrap/oem";
import type { SlashCommandType } from "../types";

const cli_state_inc_suggestion_index = (move: number) => {
  // const index = store.data.cli.val().menu_suggestion_index;
  // const suggestions = store.data.menu
  //   .val()
  //   .filter((item) => item.command.startsWith(store.data.cli.val().current_command));
  // const maxIndex = suggestions.length - 1;
  // if (move > 0) {
  //   store.data.cli.reduce((state) => {
  //     state.menu_suggestion_index = (index + move) % (maxIndex + 1);
  //     return state;
  //   });
  // } else {
  //   store.data.cli.reduce((state) => {
  //     state.menu_suggestion_index = (index + move + (maxIndex + 1)) % (maxIndex + 1);
  //     return state;
  //   });
  // }
  // const currentSuggestion = suggestions[cli_state.get().menu_suggestion_index];
  // if (currentSuggestion) {
  //   cli_state.deepSet("current_slash_command", currentSuggestion.command);
  // }
  // ui_state.set("dirty");
  // return currentSuggestion;
};

function handleInput(evt?: Event) {
  // // get input from field
  // const input = evt?.target as HTMLDivElement | null;
  // if (!input) return;
  // // get input values
  // const command = input.textContent ?? cli_state_get("command");
  // const lastChar = command[command.length - 1] ?? cli_state_get("lastChar");
  // const lastCharIsSpace = lastChar === " " || lastChar === "\xA0";
  // const firstChar = command[0] ?? cli_state_get("lastChar");
  // // get cursor position from editablecontent input
  // const selection = window.getSelection();
  // if (!selection || selection.rangeCount === 0) return;
  // const range = selection.getRangeAt(0);
  // const cursorPosition = range.startOffset;
  // // update the command line state
  // cli_state.deepSet("menu_suggestion_index", 0);
  // cli_state.deepSet("cursor_position", cursorPosition);
  // cli_state.deepSet("command", command);
  // cli_state.deepSet("lastChar", lastChar);
  // cli_state.deepSet("firstChar", firstChar);
  // // top state
  // ui_state.set("dirty");
  // // if the lastChar is a space, reset the command and return
  // if (lastCharIsSpace || command === "") {
  //   cli_state.deepSet("current_command", "");
  //   cli_state.deepSet("menu", "hidden");
  //   return;
  // }
  // // inspect current command
  // const start = command.lastIndexOf(" ", cursorPosition - 1) + 1;
  // const end = command.indexOf(" ", cursorPosition);
  // const curr = command.substring(start, end === -1 ? undefined : end);
  // console.log("Current command:", curr, cli_state_get("menu"));
  // // update the current command state
  // if (curr.startsWith("/")) {
  //   cli_state.deepSet("menu", "showing");
  // } else if (curr.startsWith("#")) {
  //   cli_state.deepSet("menu", "showing");
  // } else {
  //   cli_state.deepSet("menu", "hidden");
  // }
}

function handleKeydown(evt?: KeyboardEvent) {
  // if (!evt) return;
  // const key = evt.key.toLowerCase();
  // console.log("Key pressed:", key);
  // if (cli_state_get("menu") === "showing" && key === "arrowdown") {
  //   cli_state_inc_suggestion_index(1);
  // } else if (cli_state_get("menu") === "showing" && key === "arrowup") {
  //   cli_state_inc_suggestion_index(-1);
  // }
}

function CommandMenuItem(item: SlashCommandType, i: number) {
  const item_hover_state = State(false);

  // return tag.div(
  //   ["event:mouseover", () => item_hover_state.set(true)],
  //   ["event:mouseout", () => item_hover_state.set(false)],
  //   ["style", "padding", "3px"],
  //   ["style", "borderRadius", "4px"],
  //   ["style:cli", "display", "grid", () => item.command.startsWith(cli_state_get("current_command"))],
  //   ["style:cli", "display", "none", () => !item.command.startsWith(cli_state_get("current_command"))],
  //   ["style", "alignItems", "center"],
  //   ["style", "cursor", "pointer"],
  //   ["style", "gap", "10px"],
  //   ["style", "gridTemplateColumns", "max-content auto"],
  //   ["style:hover", "backgroundColor", "transparent", is_not_hovered],
  //   ["style:hover", "color", color.white, is_not_hovered],
  //   ["style:hover", "backgroundColor", color.white_alpha_50, is_hovered],
  //   ["style", "backgroundColor", color.white_alpha_10, is_currently_selected],
  //   ["style:hover", "color", color.black, is_hovered]
  // )(
  //   item_tag.div(
  //     ["style", "padding", "3px 5px"],
  //     ["style", "borderRadius", "4px"],
  //     ["style:hover", "backgroundColor", color.white_alpha_10, is_not_hovered],
  //     ["style:hover", "color", color.white, is_not_hovered],
  //     ["style:hover", "backgroundColor", color.white_alpha_50, is_hovered],
  //     ["style:hover", "color", color.black, is_hovered]
  //   )(item.command),
  //   item.description
  // );
}

export const CommandLine = tag.div(
  trait.style("flex", "1"),
  trait.style("width", "100%"),
  trait.style("position", "relative"),
  trait.event("keydown", () => {}),
  tag.div(
    trait.attr("id", "cli"),
    trait.attr("contentEditable", "true"),
    trait.style("fontFamily", "courier, monospace"),
    trait.style("fontSize", "14px"),
    trait.style("lineHeight", "1.2"),
    trait.style("flex", "1"),
    trait.style("marginRight", "10px"),
    trait.style("border", "none"),
    trait.style("backgroundColor", "transparent"),
    trait.style("color", "inherit"),
    trait.style("outline", "none"),
    trait.attr("autoFocus", "true"),
    trait.style("caretColor", "white"),
    trait.attr("autofocus", "true"),
    trait.event("input", handleInput),
    tag.div(
      trait.style(
        "display",
        "flex",
        store.data.cli.$test((state) => state.command === "")
      ),
      trait.style(
        "display",
        "none",
        store.data.cli.$test((state) => state.command !== "")
      ),
      trait.style("alignItems", "center"),
      trait.style("justifyContent", "center"),
      trait.style("gap", "5px"),
      "Enter the loop"
    )
  ),
  tag
    .div
    // trait.style("flexDirection", "column"),
    // trait.style("gap", "2px"),
    // trait.style("display", "flex", store.data.cli.$test((state) => state.menu === "slash")),
    // trait.style("display", "none", store.data.cli.$test((state) => state.menu === "none")),
    // trait.html(
    //    ...store.data.menu.val().map(CommandMenuItem), store.data.cli.$test((state) => state.menu === "showing")
    // ),
    // trait.html(
    //   () => undefined, store.data.cli.$test((state) => state.menu === "hidden")
    // )
    ()
);
