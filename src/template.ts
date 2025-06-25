import { HTML, useAttribute, useStyle, useTextContent } from "@linttrap/oem";
import { ThemeState } from "./state";
export const html = HTML({
  "attr:base": useAttribute(),
  "style:base": useStyle(),
  "style:mouseout": useStyle({ event: "mouseout" }),
  "style:mouseover": useStyle({ event: "mouseover" }),
  "style:theme": useStyle({ state: ThemeState }),
  "text:base": useTextContent(),
  "text:mouseout": useTextContent({ event: "mouseout" }),
  "text:mouseover": useTextContent({ event: "mouseover" }),
});
