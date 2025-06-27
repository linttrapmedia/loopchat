import { HTML, useStyle } from "@linttrap/oem";
import { theme_state } from "../state";
import { color } from "../theme";

export const html = HTML({
  "style:base": useStyle(),
  "style:theme": useStyle({ state: theme_state }),
});

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
      ["style:base", "gap", "4px"]
    )(...commands.map((args) => CommandItem(...args)))
  );

export const Help = html.div(
  ["style:base", "padding", "20px"],
  ["style:base", "display", "flex"],
  ["style:base", "flexDirection", "column"],
  ["style:base", "gap", "20px"]
)(
  html.div(
    ["style:base", "textAlign", "center"],
    ["style:base", "borderBottom", `1px dashed ${color.white_alpha_10}`],
    ["style:base", "paddingBottom", "30px"]
  )(
    html.pre(["style:base", "color", color.red])(`             
                                 
      0000         0000      
   0000000000   0000000000   
  0000    000000000    0000  
  000       00000       000  
  0000    000000000    0000  
   0000000000   0000000000   
      0000         0000      
                                  
      `),
    html.h1(
      ["style:base", "padding", "0px"],
      ["style:base", "margin", "0px"],
      ["style:base", "fontSize", "16px"],
      ["style:base", "color", color.white]
    )("Loopchat"),
    html.p(
      ["style:base", "marginBottom", "0px"],
      ["style:base", "fontSize", "16px"]
    )("Workflow Automation That Keeps You In The Loop")
  ),
  Commands("Quick Start", "Here are some quick commands to get you started with Loopchat", [
    ["/setup", "Run the setup tool to get started with Loopchat"],
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
