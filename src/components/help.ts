import { HTML, useStyle } from "@linttrap/oem";
import { theme_state } from "../state";
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
    html.p(["style", "fontSize", "12px"], ["style", "margin", "8px 0px"])(description),
    html.ul(
      ["style", "listStyle", "none"],
      ["style", "padding", "0px"],
      ["style", "margin", "0px"],
      ["style", "display", "flex"],
      ["style", "flexDirection", "column"],
      ["style", "gap", "4px"]
    )(...commands.map((args) => CommandItem(...args)))
  );

export const Help = html.div(
  ["style", "padding", "20px"],
  ["style", "display", "flex"],
  ["style", "flexDirection", "column"],
  ["style", "gap", "20px"]
)(
  html.div(
    ["style", "textAlign", "center"],
    ["style", "borderBottom", `1px dashed ${color.white_alpha_10}`],
    ["style", "paddingBottom", "30px"]
  )(
    html.pre(["style", "color", color.red])(`             
                                 
      0000         0000      
   0000000000   0000000000   
  0000    000000000    0000  
  000       00000       000  
  0000    000000000    0000  
   0000000000   0000000000   
      0000         0000      
                                  
      `),
    html.h1(
      ["style", "padding", "0px"],
      ["style", "margin", "0px"],
      ["style", "fontSize", "16px"],
      ["style", "color", color.white]
    )("Loopchat"),
    html.p(
      ["style", "marginBottom", "0px"],
      ["style", "fontSize", "16px"]
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
