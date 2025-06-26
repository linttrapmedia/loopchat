import { html } from "../template";
import { color } from "../theme";

function handleInput(evt?: Event) {
  const input = evt?.target as HTMLInputElement;
  if (!input) return;

  // get most recent character typed
  const value = input.value;
  const lastChar = value[value.length - 1];

  // if last character is a newline, execute command
  if (lastChar === "\n") {
  }
  // else, just log the current input value
  else {
    console.log(lastChar);
    console.log("Current input:", value);
  }
}

export const CommandLine = html.input(
  ["style:base", "flex", "1"],
  ["style:base", "marginRight", "10px"],
  ["style:base", "border", "none"],
  ["style:base", "backgroundColor", "transparent"],
  ["style:base", "color", "inherit"],
  ["style:base", "outline", "none"],
  ["attr:base", "placeholder", "...type a command here..."],
  ["attr:base", "autoFocus", "true"],
  ["style:base", "caretColor", color.white],
  ["event:input", handleInput]
)();
