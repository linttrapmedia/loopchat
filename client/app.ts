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

  // Chat Header
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

  // Chat Body
  tag.div(
    trait.style("display", "flex"),
    trait.style("flexDirection", "row"),
    trait.style("justifyContent", "space-between"),
    trait.style("alignItems", "flex-start"),
    trait.style("gridColumn", "2 / 3"),
    trait.style("gridRow", "2 / -1"),
    trait.style("padding", "10px"),
    trait.style("borderRadius", "5px"),
    trait.style("borderBottom", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    trait.style("borderRight", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    tag.div(
      trait.style("backgroundColor", util.alpha(HEX.white, 0.1), store.data.theme.$test("dark")),
      trait.style("width", "100%"),
      trait.style("padding", "10px 5px 10px 10px"),
      trait.style("display", "flex"),
      trait.style("justifyContent", "space-between"),
      tag.textarea(
        trait.attr("id", "chat-input"),
        trait.attr("placeholder", `Type "/help"`),
        trait.style("backgroundColor", "transparent"),
        trait.style("resize", "none"),
        // trait.style("overflow", "scroll"),
        trait.style("border", "none"),
        trait.style("outline", "none"),
        trait.style("fontSize", "12px"),
        trait.style("fontFamily", "inherit"),
        trait.style("color", HEX.brand, store.data.mode.$test("command")),
        trait.style("color", util.alpha(HEX.brand, 0.5), store.data.mode.$test("normal")),
        trait.style("width", "100%"),
        trait.style("textTransform", "uppercase"),
        trait.style("borderRadius", "5px"),
        trait.event("click", $fsm("SWITCH_MODE_TO_COMMAND")),
        trait.placeholderColor(util.alpha(HEX.brand, 0.5)),
        trait.trigger("focus", store.data.mode.$test("command")),
        trait.trigger("blur", store.data.mode.$test("normal")),
        trait.input("input", (evt) => fsm("ON_CHAT_INPUT", evt)),
        trait.autoResizeTextArea(store.data.chat),
        trait.value(store.data.chat.$val)
      ),
      tag.div(
        trait.style("display", "flex"),
        trait.style("alignItems", "flex-end"),
        trait.style("justifyContent", "flex-end"),
        trait.style("width", "max-content"),
        trait.style("cursor", "pointer"),
        icons.downArrow(util.alpha(HEX.brand, 0.5), 16)
      )
    )
  ),

  // Input
  //   tag.input(
  //     trait.attr("id", "chat-input"),
  //     trait.attr("type", "text"),
  //     trait.attr("placeholder", "CHAT..."),
  //     trait.placeholderColor(util.alpha(HEX.brand, 0.5)),
  //     trait.style("padding", "10px"),
  //     trait.style("border", "none"),
  //     trait.style("outline", "none"),
  //     trait.style("fontSize", "13px"),
  //     trait.style("fontFamily", "inherit"),
  //     trait.style("backgroundColor", "transparent"),
  //     trait.style("color", HEX.brand, store.data.mode.$test("command")),
  //     trait.style("color", util.alpha(HEX.brand, 0.5), store.data.mode.$test("normal")),
  //     trait.style("width", "100%"),
  //     trait.style("height", "100%"),
  //     trait.style("textTransform", "uppercase"),
  //     trait.event("click", $fsm("SWITCH_MODE_TO_COMMAND")),
  //     trait.trigger("focus", store.data.mode.$test("command")),
  //     trait.trigger("blur", store.data.mode.$test("normal")),
  //     trait.input("input", (evt) => fsm("ON_CHAT_INPUT", evt)),
  //     trait.value(store.data.chat.$val)
  //   )
  // ),

  // Combo Box
  // tag.div(
  //   trait.style("gridColumn", `2 / -1`),
  //   trait.style("gridRow", `2 / -1`),
  //   trait.style("zIndex", "1"),
  //   trait.style("display", "flex", store.data.chat.$test(/^@/)),
  //   trait.style("display", "flex", store.data.mode.$test("command")),
  //   trait.style("display", "none", store.data.chat.$test(/^$/)),
  //   trait.style("display", "none", store.data.mode.$test("normal")),
  //   trait.style("overflowY", "auto"),
  //   tag.div(
  //     trait.style("display", "flex"),
  //     trait.style("flexDirection", "column"),
  //     trait.style("backgroundColor", HEX.black),
  //     trait.style("padding", "10px"),
  //     trait.style("borderBottom", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
  //     trait.style("textTransform", "uppercase"),
  //     trait.style("width", "100%"),
  //     trait.style("height", "max-content"),
  //     trait.html(
  //       store.data.filteredObjects.$call("map", (o: ObjectType, i: number) =>
  //         tag.div(
  //           trait.scrollIntoView(store.data.filteredObjectIdx.$test(i)),
  //           trait.style("backgroundColor", util.alpha(HEX.brand, 0.05), store.data.filteredObjectIdx.$test(i)),
  //           trait.style("backgroundColor", "transparent", store.data.filteredObjectIdx.$test(i, false)),
  //           trait.style(
  //             "borderBottom",
  //             `1px solid ${util.alpha(HEX.brand, 0.05)}`,
  //             store.data.filteredObjectIdx.$test(i, false)
  //           ),
  //           trait.style("padding", "5px 10px"),
  //           trait.style("lineHeight", "1.5", 2),
  //           tag.span(trait.style("color", HEX.brand), "@"),
  //           ...o.name.split("").map((char, index) =>
  //             tag.span(
  //               trait.style("color", () => {
  //                 const chatStr = store.data.chat.val().toUpperCase();
  //                 const targetStr = `@${o.name.toUpperCase()}`;
  //                 const isMatch = targetStr.split("").every((c, i) => chatStr.charAt(i) === c || i > index + 1);
  //                 return isMatch ? HEX.brand : util.alpha(HEX.brand, 0.5);
  //               }),
  //               char
  //             )
  //           )
  //         )
  //       ),
  //       store.data.chat
  //     )
  //   )
  // ),

  // Preview
  // tag.div(
  //   trait.style("gridColumn", `3 / -1`),
  //   trait.style("gridRow", `2 / -1`),
  //   trait.style("display", "flex"),
  //   trait.style("alignItems", "center"),
  //   trait.style("justifyContent", "center"),
  //   trait.style("color", util.alpha(HEX.brand, 0.1)),
  //   trait.style("borderLeft", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
  //   "Preview"
  // ),

  // Canvas
  tag.div(
    trait.style("padding", "10px"),
    trait.style("gridColumn", `3 / 4`),
    trait.style("gridRow", `1 / -1`),
    trait.style("display", "grid"),
    trait.style("width", "100%"),
    trait.style("height", "100%"),
    tag.div(
      trait.style("borderRadius", "5px"),
      trait.style("backgroundColor", HEX.white),
      trait.style("color", HEX.black),
      trait.style("padding", "20px"),
      "canvas"
    )
  ),

  // Footer
  tag.div(
    trait.style("gridColumn", `1 / -1`),
    trait.style("gridRow", `-1 / -1`),
    trait.style("padding", "10px"),
    trait.style("borderTop", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    trait.style("textTransform", "uppercase"),
    tag.span(trait.style("opacity", 0.5), "MODE: "),
    store.data.mode.$val
  )
);
