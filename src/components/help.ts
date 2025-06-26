import { html } from "../template";
import { color } from "../theme";

const CommandItem = (command: string, description: string) =>
  html.li(
    ["style:base", "display", "flex"],
    ["style:base", "gap", "2px"],
    ["style:base", "alignItems", "center"],
    ["style:base", "justifyContent", "flex-start"],
    ["style:base", "gap", "5px"]
  )(
    html.div(
      ["style:base", "backgroundColor", color.white_alpha_10],
      ["style:base", "padding", "2px 5px"],
      ["style:base", "borderRadius", "2px"]
    )(command),
    html.div(["style:base", "fontStyle", "italic"])(description)
  );

const Commands = (title: string, description: string, commands: [command: string, description: string][]) =>
  html.div()(
    html.h2(
      ["style:base", "fontSize", "12px"],
      ["style:base", "color", color.white],
      ["style:base", "margin", "0px"]
    )(title),
    html.p(["style:base", "fontSize", "12px"], ["style:base", "margin", "8px 0px"])(description),
    html.ul(
      ["style:base", "listStyle", "none"],
      ["style:base", "padding", "0px"],
      ["style:base", "margin", "0px"],
      ["style:base", "display", "flex"],
      ["style:base", "flexDirection", "column"],
      ["style:base", "gap", "2px"]
    )(...commands.map((args) => CommandItem(...args)))
  );

export const Help = html.div(
  ["style:base", "padding", "10px"],
  ["style:base", "display", "flex"],
  ["style:base", "flexDirection", "column"],
  ["style:base", "gap", "30px"]
)(
  html.div()(
    html.h1(
      ["style:base", "padding", "0px"],
      ["style:base", "margin", "0px"],
      ["style:base", "fontSize", "12px"],
      ["style:base", "color", color.white]
    )("Loopchat"),
    html.p(["style:base", "marginBottom", "0px"])("The ultimate AI workflow automation tool")
  ),
  Commands("Quick Start", "Here are some quick commands to get you started with Loopchat", [
    ["/help", "Show this help message"],
    ["/search #term", "Run the search tool"],
  ]),
  Commands(
    "Slash Commands",
    "Slash commands are special text commands that start with a forward slash (/) and allow users to perform application actions quickly",
    [
      ["/run <workflow>", "Run a specific workflow"],
      ["/run", "Run the last workflow"],
      ["/edit <workflow>", "Edit a saved workflow"],
      ["/save <workflow>", "Save the current workflow"],
    ]
  ),
  Commands(
    "Hash Commands",
    "Hash commands are data input fields that are part of a slash command and allow users to input data into the workflow. Example: #name",
    [["#[hash name]", "A hash command that allows you to input data into the workflow"]]
  ),
  Commands("At Commands", "At commands are used to mention users and agents in the workflow", [
    ["@[some-user]", "A command that allows you to mention a user in the workflow"],
    ["@[some-agent]", "A command that allows you to mention an agent in the workflow"],
    ["@all", "A command that allows you to mention all users in the workflow"],
  ])
);
