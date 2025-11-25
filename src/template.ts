import { Template } from "@linttrap/oem";
import {
  useAttributeTrait,
  useEventTrait,
  useInnerHTMLTrait,
  useStyleTrait,
} from "node_modules/@linttrap/oem/src/registry";

export const [tag, trait] = Template({
  attr: useAttributeTrait,
  event: useEventTrait,
  html: useInnerHTMLTrait,
  style: useStyleTrait,
});
