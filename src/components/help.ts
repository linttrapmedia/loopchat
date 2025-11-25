import { colors, store } from "@/store";
import { tag, trait } from "@/template";

const CommandItem = (command: string, description: string) =>
  tag.li(
    trait.style("display", "flex"),
    trait.style("gap", "2px"),
    trait.style("alignItems", "center"),
    trait.style("justifyContent", "flex-start"),
    trait.style("gap", "5px"),
    tag.div(
      trait.style("backgroundColor", colors.white_alpha_10),
      trait.style("padding", "2px 5px"),
      trait.style("borderRadius", "2px"),
      command
    ),
    tag.div(trait.style("fontStyle", "italic"), description)
  );

const Commands = (title: string, description: string, commands: [command: string, description: string][]) =>
  tag.div(
    tag.h2(trait.style("fontSize", "12px"), trait.style("color", colors.white), trait.style("margin", "0px"), title),
    tag.p(trait.style("fontSize", "12px"), trait.style("margin", "8px 0px 16px"), description),
    tag.ul(
      trait.style("listStyle", "none"),
      trait.style("padding", "0px"),
      trait.style("margin", "0px"),
      trait.style("display", "flex"),
      trait.style("flexDirection", "column"),
      trait.style("gap", "4px"),
      ...commands.map((args) => CommandItem(...args))
    )
  );

export const Help = () =>
  tag.div(
    trait.style("padding", "20px"),
    trait.style("display", "flex"),
    trait.style("flexDirection", "column"),
    trait.style("gap", "20px"),
    tag.div(
      tag.h1(
        trait.style("padding", "0px"),
        trait.style("margin", "0px"),
        trait.style("fontSize", "16px"),
        trait.style("color", colors.white),
        trait.style("fontFamily", "monospace"),
        "L00PCHAT",
        tag.p(
          trait.style("margin", "10px 0px"),
          trait.style("fontSize", "16px"),
          "Workflow Automation That Keeps You In The Loop"
        ),
        Commands(
          "Help",
          "The following commands are available:",
          store.data.menu.val().map((menu) => [menu.command, menu.description]) as [string, string][]
        )
      )
    )
  );
