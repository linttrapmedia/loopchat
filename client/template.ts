import {
  useAutoResizeTextareaTrait,
  useCaretPosition,
  useCustomCaretForContentEditable,
  usePlaceholderColorTrait,
  useScrollintoViewTrait,
  useStyleOnEventTrait,
  useToolTipTrait,
  useTriggerTrait,
} from "@/client/traits";
import {
  Template,
  useAttributeTrait,
  useEventTrait,
  useInnerHTMLTrait,
  useInputEventTrait,
  useInputValueTrait,
  useStyleTrait,
} from "@linttrap/oem";

export const [tag, trait] = Template({
  attr: useAttributeTrait,
  caretPosition: useCaretPosition,
  event: useEventTrait,
  html: useInnerHTMLTrait,
  style: useStyleTrait,
  styleOnEvt: useStyleOnEventTrait,
  input: useInputEventTrait,
  value: useInputValueTrait,
  placeholderColor: usePlaceholderColorTrait,
  trigger: useTriggerTrait,
  fatCaret: useCustomCaretForContentEditable,
  tooltip: useToolTipTrait,
  scrollIntoView: useScrollintoViewTrait,
  autoResizeTextArea: useAutoResizeTextareaTrait,
});
