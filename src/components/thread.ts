import { HTML, useStyle } from "@linttrap/oem";
import { theme_state } from "../state";

export const html = HTML({
  style: useStyle(),
  "style:theme": useStyle({ state: theme_state }),
});

export const Thread = () =>
  html.div(
    ["style", "padding", "20px"],
    ["style", "display", "flex"],
    ["style", "flexDirection", "column"],
    ["style", "gap", "20px"]
  )("thread");
