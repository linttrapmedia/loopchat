import { Template, useAttributeTrait, useEventTrait, useInnerHTMLTrait, useStyleTrait } from "@linttrap/oem";

export const [tag, trait] = Template({
  attr: useAttributeTrait,
  event: useEventTrait,
  html: useInnerHTMLTrait,
  style: useStyleTrait,
});
