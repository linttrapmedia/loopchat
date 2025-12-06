import { HEX } from "@/constants";
import { $fsm, fsm } from "@/fsm";
import { icons } from "@/icons";
import { tag, trait } from "@/template";
import type { ObjectType, ViewType } from "@/types";
import util from "@/util";
import { $test } from "@linttrap/oem";
import { store } from "./store";

export const UI = tag.div(
  trait.style("padding", "3px"),
  trait.style("width", "100vw"),
  trait.style("height", "100vh"),
  trait.style("display", "grid"),
  trait.style("gridTemplateColumns", "max-content 1fr max-content"),
  trait.style("gridTemplateRows", "max-content 1fr max-content"),
  trait.style("backgroundColor", HEX.black, store.data.theme.$test("dark")),
  trait.style("backgroundColor", HEX.brand, store.data.theme.$test("light")),
  trait.style("color", util.alpha(HEX.brand, 0.5), store.data.theme.$test("dark")),

  // Logo
  tag.div(
    trait.style("gridColumn", "1/1"),
    trait.style("gridRow", "1 / 1"),
    trait.style("padding", "0 10px"),
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

  // Chat
  tag.div(
    trait.style("display", "flex"),
    trait.style("flexDirection", "row"),
    trait.style("justifyContent", "space-between"),
    trait.style("alignItems", "center"),
    trait.style("gridColumn", "2 / -1"),
    trait.style("gridRow", "1 / 1"),
    trait.style("backgroundColor", HEX.black),
    trait.style("borderBottom", `1px solid ${util.alpha(HEX.brand, 0.2)}`),

    // Input
    tag.input(
      trait.attr("id", "chat-input"),
      trait.attr("type", "text"),
      trait.attr("placeholder", "CHAT..."),
      trait.placeholderColor(util.alpha(HEX.brand, 0.5)),
      trait.style("padding", "10px"),
      trait.style("border", "none"),
      trait.style("outline", "none"),
      trait.style("fontSize", "13px"),
      trait.style("fontFamily", "inherit"),
      trait.style("backgroundColor", "transparent"),
      trait.style("color", HEX.brand, store.data.mode.$test("command")),
      trait.style("color", util.alpha(HEX.brand, 0.5), store.data.mode.$test("normal")),
      trait.style("width", "100%"),
      trait.style("height", "100%"),
      trait.style("textTransform", "uppercase"),
      trait.event("click", $fsm("SWITCH_MODE_TO_COMMAND")),
      trait.trigger("focus", store.data.mode.$test("command")),
      trait.trigger("blur", store.data.mode.$test("normal")),
      trait.input("input", (evt) => fsm("ON_CHAT_INPUT", evt)),
      trait.value(store.data.chat.$val)
    )
  ),

  // Combo Box
  tag.div(
    trait.style("gridColumn", `2 / -1`),
    trait.style("gridRow", `2 / -1`),
    trait.style("zIndex", "1"),
    trait.style("display", "flex", store.data.chat.$test(/^@/)),
    trait.style("display", "flex", store.data.mode.$test("command")),
    trait.style("display", "none", store.data.chat.$test(/^$/)),
    trait.style("display", "none", store.data.mode.$test("normal")),
    trait.style("overflowY", "auto"),
    tag.div(
      trait.style("display", "flex"),
      trait.style("flexDirection", "column"),
      trait.style("backgroundColor", HEX.black),
      trait.style("padding", "10px"),
      trait.style("borderBottom", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
      trait.style("textTransform", "uppercase"),
      trait.style("width", "100%"),
      trait.style("height", "max-content"),
      trait.html(
        store.data.filteredObjects.$call("map", (o: ObjectType, i: number) =>
          tag.div(
            trait.scrollIntoView(store.data.filteredObjectIdx.$test(i)),
            trait.style("backgroundColor", util.alpha(HEX.brand, 0.05), store.data.filteredObjectIdx.$test(i)),
            trait.style("backgroundColor", "transparent", store.data.filteredObjectIdx.$test(i, false)),
            trait.style(
              "borderBottom",
              `1px solid ${util.alpha(HEX.brand, 0.05)}`,
              store.data.filteredObjectIdx.$test(i, false)
            ),
            trait.style("padding", "5px 10px"),
            trait.style("lineHeight", "1.5", 2),
            tag.span(trait.style("color", HEX.brand), "@"),
            ...o.name.split("").map((char, index) =>
              tag.span(
                trait.style("color", () => {
                  const chatStr = store.data.chat.val().toUpperCase();
                  const targetStr = `@${o.name.toUpperCase()}`;
                  const isMatch = targetStr.split("").every((c, i) => chatStr.charAt(i) === c || i > index + 1);
                  return isMatch ? HEX.brand : util.alpha(HEX.brand, 0.5);
                }),
                char
              )
            )
          )
        ),
        store.data.chat
      )
    )
  ),

  // Menu
  tag.div(
    trait.style("gridColumn", `1 / 1`),
    trait.style("gridRow", `2 / -1`),
    trait.style("display", "flex"),
    trait.style("flexDirection", "column"),
    trait.style("borderRight", `1px solid ${util.alpha(HEX.brand, 0.2)}`),
    trait.html(
      store.data.views.$call("map", ([key, item]: [any, ViewType]) =>
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

  // Body
  tag.div(
    trait.style("gridColumn", `2 / 3`),
    trait.style("gridRow", `2 / -1`),
    trait.style("display", "grid"),
    trait.style(
      "gridTemplateColumns",
      () => `max-content repeat(${store.data.obj_grid_cols.val()}, 1fr)`,
      store.data.obj_grid_cols
    ),
    trait.style(
      "gridTemplateRows",
      () => `max-content repeat(${store.data.obj_grid_rows.val()}, 1fr)`,
      store.data.obj_grid_rows
    ),
    trait.style("width", "100%"),
    trait.style("height", "100%"),

    // Row Overlay
    tag.div(
      trait.style("display", "grid"),
      trait.style("gridTemplateColumns", "subgrid"),
      trait.style("gridTemplateRows", "subgrid"),
      trait.style("pointerEvents", "none"),
      trait.style("gridColumn", () => `1 / -1`, store.data.obj_grid_cols),
      trait.style("gridRow", () => `1 / -1`, store.data.obj_grid_rows),
      trait.style("width", "100%"),
      trait.style("height", "100%"),
      trait.html(
        () =>
          Array.from({ length: store.data.obj_grid_rows.val() + 1 }, (_, i) => i).map((_, i) =>
            tag.div(
              trait.style("gridColumn", "1/-1"),
              trait.style("alignItems", "center"),
              trait.style("justifyContent", "center"),
              trait.style("borderTop", `1px solid ${util.alpha(HEX.brand, 0.05)}`)
              // `${i + 1}`
            )
          ),
        store.data.obj_grid_cols,
        store.data.obj_grid_rows
      )
    ),

    // Column Overlay
    tag.div(
      trait.style("display", "grid"),
      trait.style("gridTemplateColumns", "subgrid"),
      trait.style("gridTemplateRows", "subgrid"),
      trait.style("pointerEvents", "none"),
      trait.style("gridColumn", () => `1 / -1`, store.data.obj_grid_cols),
      trait.style("gridRow", () => `1 / -1`, store.data.obj_grid_rows),
      trait.style("width", "100%"),
      trait.style("height", "100%"),
      trait.html(
        () =>
          Array.from({ length: store.data.obj_grid_cols.val() + 1 }, (_, i) => i).map((_, i) =>
            tag.div(
              trait.style("gridRow", "1/-1"),
              trait.style("alignItems", "center"),
              trait.style("justifyContent", "center"),
              trait.style("borderLeft", `1px solid ${util.alpha(HEX.brand, 0.05)}`)
              // `${i + 1}`
            )
          ),
        store.data.obj_grid_cols,
        store.data.obj_grid_rows
      )
    ),

    // Row Labels
    tag.div(
      trait.style("display", "grid"),
      trait.style("gridTemplateColumns", "subgrid"),
      trait.style("gridTemplateRows", "subgrid"),
      trait.style("pointerEvents", "none"),
      trait.style("fontFamily", "courier, monospace"),
      trait.style("gridColumn", () => `1 / -1`, store.data.obj_grid_cols),
      trait.style("gridRow", () => `1 / -1`, store.data.obj_grid_rows),
      trait.html(
        () =>
          Array.from({ length: store.data.obj_grid_rows.val() }).map((_, rowIndex) =>
            tag.div(
              trait.style("gridColumn", "1 / span 1"),
              trait.style("gridRow", () => `${rowIndex + 2} / span 1`, store.data.obj_grid_rows),
              trait.style("fontSize", "10px"),
              trait.style("display", "flex"),
              trait.style("alignItems", "center"),
              trait.style("justifyContent", "center"),
              trait.style("padding", "5px"),
              `${rowIndex + 1}`
            )
          ),
        store.data.obj_grid_rows,
        store.data.obj_grid_cols
      )
    ),

    // Column Labels
    tag.div(
      trait.style("display", "grid"),
      trait.style("gridTemplateColumns", "subgrid"),
      trait.style("gridTemplateRows", "subgrid"),
      trait.style("pointerEvents", "none"),
      trait.style("fontFamily", "courier, monospace"),
      trait.style("gridColumn", () => `1 / -1`, store.data.obj_grid_cols),
      trait.style("gridRow", () => `1 / -1`, store.data.obj_grid_rows),
      trait.html(
        () =>
          Array.from({ length: store.data.obj_grid_cols.val() }).map((_, colIndex) =>
            tag.div(
              trait.style("gridRow", "1 / span 1"),
              trait.style("gridColumn", () => `${colIndex + 2} / span 1`, store.data.obj_grid_cols),
              trait.style("fontSize", "10px"),
              trait.style("display", "flex"),
              trait.style("alignItems", "center"),
              trait.style("justifyContent", "center"),
              trait.style("padding", "5px"),
              `${colIndex + 1}`
            )
          ),
        store.data.obj_grid_cols,
        store.data.obj_grid_rows
      )
    ),

    // Objects Grid
    tag.div(
      trait.style("gridColumn", () => `2 / -1`),
      trait.style("gridRow", () => `2 / -1`),
      trait.style("overflowY", "auto"),
      trait.style("display", "grid", store.data.view.$test("Objects")),
      trait.style("display", "none", store.data.view.$test("Objects", false)),
      trait.style("gridTemplateColumns", "subgrid"),
      trait.style("gridTemplateRows", "subgrid"),
      trait.html(
        store.data.cachedObjects.$call("map", (obj) =>
          tag.div(
            trait.style("borderRight", `2px solid ${util.alpha(HEX.brand, 0.2)}`, $test(obj.selected, false)),
            trait.style("borderRight", `2px solid ${util.alpha(HEX.brand, 0.5)}`, $test(obj.selected, true)),
            trait.style("borderBottom", `2px solid ${util.alpha(HEX.brand, 0.2)}`, $test(obj.selected, false)),
            trait.style("borderBottom", `2px solid ${util.alpha(HEX.brand, 0.5)}`, $test(obj.selected, true)),
            trait.style("borderRadius", "3px"),
            trait.style("margin", "3px"),
            trait.style("color", HEX.brand, $test(obj.selected, true)),
            trait.style("color", util.alpha(HEX.brand, 0.3), $test(obj.selected, false)),
            trait.style("backgroundColor", util.alpha(HEX.brand, 0.05), $test(obj.selected, true)),
            trait.style("backgroundColor", "transparent", $test(obj.selected, false)),
            trait.styleOnEvt(
              "mouseover",
              "backgroundColor",
              util.alpha(HEX.brand, 0.1),
              $test(obj.selected ?? false, false)
            ),
            trait.styleOnEvt("mouseout", "backgroundColor", "transparent", $test(obj.selected ?? false, false)),
            trait.style("transition", "background-color 0.2s ease"),
            trait.style("cursor", "pointer"),
            trait.style("padding", "10px"),
            trait.style("display", "flex"),
            trait.style("flexDirection", "column"),
            trait.style("alignItems", "center"),
            trait.style("justifyContent", "center"),
            trait.style("textAlign", "center"),
            trait.style("textTransform", "uppercase"),
            trait.event("click", () => {
              alert(`Clicked on object: ${obj.name}`);
            }),
            tag.div(obj.name)
          )
        ),
        store.data.obj_grid_cols,
        store.data.obj_grid_rows
      )
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
