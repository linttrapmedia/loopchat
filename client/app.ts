import { HEX } from "@/client/constants";
import { $fsm, fsm } from "@/client/fsm";
import { icons } from "@/client/icons";
import { tag, trait } from "@/client/template";
import type { View } from "@/client/types";
import util from "@/client/util";
import { store } from "./state";

export const UI = tag.div(
  trait.style("width", "100vw"),
  trait.style("height", "100vh"),
  trait.style("display", "grid"),
  trait.style("gridTemplateColumns", "max-content minmax(200px, 300px)  1fr max-content"),
  trait.style("gridTemplateRows", "max-content 1fr max-content"),
  trait.style("backgroundColor", HEX.black, store.data.theme.$test("dark")),
  trait.style("backgroundColor", HEX.brand, store.data.theme.$test("light")),
  trait.style("color", util.alpha(HEX.brand, 0.5), store.data.theme.$test("dark")),

  // Logo
  tag.div(
    trait.style("gridColumn", "1/1"),
    trait.style("gridRow", "1 / 1"),
    trait.style("padding", "10px"),
    trait.style("textAlign", "center"),
    trait.style("display", "flex"),
    trait.style("alignItems", "center"),
    trait.style("justifyContent", "center"),
    trait.style("backgroundColor", HEX.black),
    trait.style("color", HEX.brand),
    trait.style("textShadow", `0 0 5px ${util.alpha(HEX.brand, 0.6)}`, store.data.theme.$test("dark")),
    trait.style("borderBottom", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    trait.style("borderRight", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    "LOOP"
  ),

  // Menu
  tag.div(
    trait.style("gridColumn", `1 / 1`),
    trait.style("gridRow", `2 / -1`),
    trait.style("display", "flex"),
    trait.style("flexDirection", "column"),
    trait.style("borderRight", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    trait.html(
      store.data.views.$call("map", ([key, item]: [any, View]) =>
        tag.div(
          trait.style("display", "flex"),
          trait.style("alignItems", "center"),
          trait.style("cursor", "pointer"),
          trait.style("justifyContent", "center"),
          trait.style("fontSize", "12px"),
          trait.style("padding", "10px"),
          trait.style("color", util.alpha(HEX.brand, 0.2), store.data.view.$test(key, false)),
          trait.style("color", HEX.brand, store.data.view.$test(key as any, true)),
          trait.styleOnEvt("mouseover", "color", util.alpha(HEX.brand, 0.5), store.data.view.$test(key, false)),
          trait.styleOnEvt("mouseout", "color", util.alpha(HEX.brand, 0.2), store.data.view.$test(key, false)),
          trait.event("click", $fsm("ACTIVE_MENU_ITEM", key)),
          trait.tooltip(item.label, {
            position: "right",
            bgColor: HEX.brand,
            textColor: HEX.black,
          }),
          icons[item.icon]("currentColor", 21)
        )
      ),
      store.data.view
    )
  ),

  // Header
  tag.div(
    trait.style("display", "flex"),
    trait.style("flexDirection", "row"),
    trait.style("justifyContent", "space-between"),
    trait.style("alignItems", "center"),
    trait.style("gridColumn", "2 / 3"),
    trait.style("gridRow", "1 / 1"),
    trait.style("backgroundColor", HEX.black),
    trait.style("borderBottom", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    trait.style("borderRight", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    trait.style("padding", "10px"),
    "CHAT"
  ),

  // Chat Input
  tag.div(
    trait.style("display", "flex"),
    trait.style("flexDirection", "row"),
    trait.style("justifyContent", "space-between"),
    trait.style("alignItems", "flex-start"),
    trait.style("gridColumn", "2 / 3"),
    trait.style("gridRow", "2 / -1"),
    trait.style("padding", "10px"),
    trait.style("borderRight", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    tag.div(
      trait.style("borderBottom", `1px solid ${util.alpha(HEX.brand, 0.2)}`, store.data.theme.$test("dark")),
      trait.style("width", "100%"),
      trait.style("padding", "10px 5px 10px 0px"),
      trait.style("gap", "5px"),
      trait.style("display", "flex"),
      trait.style("justifyContent", "space-between"),
      tag.div(icons.chevronArrowRight(util.alpha(HEX.brand, 0.5), 16)),
      tag.div(
        trait.attr("contenteditable", "true"),
        trait.attr("id", "chat-input"),
        trait.attr("placeholder", `Type "/help"`),
        trait.style("backgroundColor", "transparent"),
        trait.style("resize", "none"),
        trait.style("border", "none"),
        trait.style("outline", "none"),
        trait.style("fontSize", "13px"),
        trait.style("fontFamily", "inherit"),
        trait.style("color", HEX.brand, store.data.mode.$test("command")),
        trait.style("color", util.alpha(HEX.brand, 0.5), store.data.mode.$test("normal")),
        trait.style("width", "100%"),
        trait.style("borderRadius", "5px"),
        trait.event("click", $fsm("SWITCH_MODE_TO_COMMAND")),
        trait.placeholderColor(util.alpha(HEX.brand, 0.5)),
        trait.trigger("focus", store.data.mode.$test("command")),
        trait.trigger("blur", store.data.mode.$test("normal")),
        trait.event("input", (evt) => fsm("ON_CHAT_INPUT", (evt!.target as HTMLDivElement).innerText)),
        trait.html(store.data.chat.val),
        trait.caretPosition((pos) => store.data.caret_pos.set(pos)),
        trait.refreshInput(store.data.chat_refresh, store.data.chat.val, store.data.caret_pos.val)
      )
    )
  ),

  // Canvas
  tag.div(
    trait.style("padding", "10px"),
    trait.style("gridColumn", `3 / 4`),
    trait.style("gridRow", `1 / -1`),
    trait.style("display", "grid"),
    trait.style("width", "100%"),
    trait.style("color", HEX.white),
    trait.style("height", "100%"),
    trait.style("fontSize", "14px"),
    tag.div(
      trait.style(
        "display",
        "flex",
        store.data.commands_filter.$test((f) => f.length === 0)
      ),
      trait.style(
        "display",
        "none",
        store.data.commands_filter.$test((f) => f.length > 0)
      ),
      trait.style("borderRadius", "5px"),
      trait.style("backgroundColor", util.alpha(HEX.white, 0.05)),
      trait.style("padding", "20px"),
      "canvas"
    ),
    tag.div(
      trait.style(
        "display",
        "none",
        store.data.commands_filter.$test((f) => f.length === 0)
      ),
      trait.style(
        "display",
        "flex",
        store.data.commands_filter.$test((f) => f.length > 0)
      ),
      trait.style("flexDirection", "column"),
      trait.style("gap", "5px"),
      trait.style("borderRadius", "5px"),
      trait.style("color", HEX.white),
      trait.style("padding", "20px"),
      trait.html(
        store.data.commands_filter.$call("map", (cmd, i) =>
          tag.div(
            trait.style("display", "flex"),
            trait.style("flexDirection", "column"),
            trait.style("gap", "2px"),
            trait.style("padding", "3px"),
            trait.style("margin", "-3px"),
            trait.style("color", HEX.black, store.data.commands_filter_idx.$test(i)),
            trait.style("color", util.alpha(HEX.brand, 0.5), store.data.commands_filter_idx.$test(i, false)),
            trait.style("backgroundColor", util.alpha(HEX.white, 1), store.data.commands_filter_idx.$test(i)),
            trait.style("backgroundColor", "transparent", store.data.commands_filter_idx.$test(i, false)),
            // Command Entry
            tag.div(
              trait.style("display", "flex"),
              trait.style("gap", "10px"),
              tag.span(cmd.command),
              tag.span(trait.style("opacity", 0.5), cmd.description)
            )
          )
        )
      )
    )
  ),

  // Footer
  tag.div(
    trait.style("gridColumn", `1 / -1`),
    trait.style("gridRow", `-1 / -1`),
    trait.style("padding", "10px"),
    trait.style("borderTop", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    trait.style("display", "flex"),
    trait.style("gap", "10px"),
    ...Object.entries(store.data)
      .filter(([key, _]) =>
        [
          "chat",
          "command_curr",
          "command_mode",
          "caret_pos",
          "commands_filter_idx",
          "mode",
          "commands_filter",
        ].includes(key)
      )
      .map(([key, _]) =>
        tag.div(tag.span(trait.style("opacity", 0.75), key, ":"), store.data[key as keyof typeof store.data].$val)
      )
  )
);
