import {
  extractConditions,
  extractStates,
  Template,
  useInputEventTrait,
  useInputValueTrait,
  type Condition,
  type StateType,
} from "@linttrap/oem";
import {
  useAttributeTrait,
  useEventTrait,
  useInnerHTMLTrait,
  useStyleTrait,
} from "node_modules/@linttrap/oem/src/registry";

export function useStyleOnEventTrait(
  el: HTMLElement,
  evt: "click" | "mouseover" | "mouseout" | "focus" | "blur",
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(val, ...rest);
  const conditions = extractConditions(...rest);
  const apply = () => {
    const _val = typeof val === "function" ? val() : val;
    const applies = conditions.every((i) => (typeof i === "function" ? i() : i));
    if (applies) {
      (prop as string).startsWith("--")
        ? el.style.setProperty(prop as string, _val as string)
        : (el.style[prop as any] = _val as any);
    }
  };

  const register = () => {
    el.addEventListener(evt, apply);
  };
  register();
  const unsubs = states.map((state) => state.sub(register));
  return () => {
    unsubs.forEach((unsub) => unsub());
    el.removeEventListener(evt.slice(2), apply);
  };
}

export function usePlaceholderColorTrait(el: HTMLElement, color: string) {
  const styleEl = document.createElement("style");
  const className = `placeholder-color-${Math.random().toString(36).substring(2, 15)}`;
  styleEl.innerHTML = `
    .${className}::placeholder {
      color: ${color} !important;
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(styleEl);
  el.classList.add(className);
  return () => {
    el.classList.remove(className);
    document.head.removeChild(styleEl);
  };
}

export function useCustomCaretForContentEditable(el: HTMLElement, caretColor: string, caretWidth: string = "2px") {
  const caret = tag.span(
    trait.style("width", caretWidth),
    trait.style("backgroundColor", caretColor),
    trait.style("display", "inline-block"),
    trait.style("height", "1em")
  );

  caret.animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], {
    duration: 1000,
    iterations: Infinity,
  });

  el.addEventListener("focus", () => {});
  el.addEventListener("blur", () => {});
  el.addEventListener("input", (e) => {});
  return () => {};
}

export const useTriggerTrait = (
  el: HTMLElement,
  evt: "focus" | "blur" | "click",
  ...rest: (StateType<any> | Condition)[]
) => {
  const states = extractStates(...rest);
  const conditions = extractConditions(...rest);
  const apply = () => {
    const applies = conditions.every((i) => (typeof i === "function" ? i() : i));
    if (applies) el[`${evt}`]();
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};

export const useToolTipTrait = (
  el: HTMLElement,
  content: string | number | HTMLElement | (() => string | number | HTMLElement),
  style?: {
    position: "top" | "bottom" | "left" | "right";
    bgColor?: string;
    textColor?: string;
    padding?: string;
    borderRadius?: string;
    fontSize?: string;
  },
  ...rest: (StateType<any> | Condition)[]
) => {
  const states = extractStates(...rest);
  const conditions = extractConditions(...rest);
  const {
    position = "top",
    bgColor = "rgba(0, 0, 0, 0.75)",
    textColor = "#fff",
    padding = "6px 10px",
    borderRadius = "4px",
    fontSize = "12px",
  } = style || {};

  const showTooltip = () => {
    removeTooltip();
    const tooltipEl = tag.div(
      trait.attr("id", "tooltip"),
      trait.style("position", "absolute"),
      trait.style("backgroundColor", bgColor),
      trait.style("color", textColor),
      trait.style("padding", padding),
      trait.style("borderRadius", borderRadius),
      trait.style("fontSize", fontSize),
      trait.style("pointerEvents", "none"),
      trait.style("zIndex", "1000"),
      trait.style("whiteSpace", "nowrap"),
      trait.style("boxShadow", "0 2px 6px rgba(0,0,0,0.2)"),
      trait.style("textTransform", "uppercase"),
      content
    );
    // if tooltiop not yet attached to DOM
    if (!document.getElementById("tooltip")) {
      document.body.prepend(tooltipEl);
    }
    const rect = el.getBoundingClientRect();

    // Positioning
    if (!tooltipEl) return;
    if (position === "top") tooltipEl.style.top = `${rect.top + window.scrollY - tooltipEl.offsetHeight - 4}px`;
    if (position === "bottom") tooltipEl.style.top = `${rect.bottom + window.scrollY + 4}px`;
    if (position === "left") tooltipEl.style.left = `${rect.left + window.scrollX - tooltipEl.offsetWidth - 4}px`;
    if (position === "right") tooltipEl.style.left = `${rect.right + window.scrollX + 4}px`;

    // Center horizontally
    if (position === "top" || position === "bottom") {
      tooltipEl.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltipEl.offsetWidth / 2}px`;
    }
    // Center vertically
    if (position === "left" || position === "right") {
      tooltipEl.style.top = `${rect.top + window.scrollY + rect.height / 2 - tooltipEl.offsetHeight / 2}px`;
    }
  };

  const removeTooltip = () => {
    const tooltipEl = document.getElementById("tooltip");
    if (tooltipEl) tooltipEl.remove();
  };

  function apply() {
    const applies = conditions.every((i) => (typeof i === "function" ? i() : i));
    if (applies) {
      el.addEventListener("mouseover", showTooltip);
      el.addEventListener("mouseout", removeTooltip);
    } else {
      el.removeEventListener("mouseover", showTooltip);
      el.removeEventListener("mouseout", removeTooltip);
    }
  }

  removeTooltip();
  apply();
  const unsubs = states.map((state) => state.sub(apply));

  return () => {
    el.removeEventListener("mouseover", showTooltip);
    el.removeEventListener("mouseout", removeTooltip);
    unsubs.forEach((unsub) => unsub());
  };
};

export const useScrollintoViewTrait = (el: HTMLElement, ...rest: (StateType<any> | Condition)[]) => {
  const states = extractStates(...rest);
  const conditions = extractConditions(...rest);
  const apply = () => {
    const applies = conditions.every((i) => (typeof i === "function" ? i() : i));
    if (applies) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};

export const [tag, trait] = Template({
  attr: useAttributeTrait,
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
});
