import { $fsm } from "@/fsm";
import { icons } from "@/icons";
import { tag, trait } from "@/template";
import util from "@/util";
import { $test } from "@linttrap/oem";
import { hex, store, totalGridCells } from "./data";

export const UI = tag.div(
  trait.style("padding", "3px"),
  trait.style("fontFamily", "courier, monospace"),
  trait.style("width", "100vw"),
  trait.style("height", "100vh"),
  trait.style("overflow", "scroll"),
  trait.style("backgroundColor", hex.black, store.data.theme.$test("dark")),
  trait.style("backgroundColor", hex.white, store.data.theme.$test("light")),
  trait.style("color", util.alpha(hex.white, 0.5), store.data.theme.$test("dark")),
  trait.style("color", hex.black, store.data.theme.$test("light")),
  trait.style("display", "grid"),
  trait.style(
    "gridTemplateColumns",
    () => `max-content max-content repeat(${store.data.grid_cols.val() - 2}, 1fr)`,
    store.data.grid_cols
  ),
  trait.style(
    "gridTemplateRows",
    () => `max-content max-content repeat(${store.data.grid_rows.val() - 2}, 1fr)`,
    store.data.grid_rows
  ),

  // Grid Overlay
  tag.div(
    trait.style("display", "grid", store.data.debug.$test(true)),
    trait.style("display", "none", store.data.debug.$test(false)),
    trait.style("gridTemplateColumns", "subgrid"),
    trait.style("gridTemplateRows", "subgrid"),
    trait.style("pointerEvents", "none"),
    trait.style("fontFamily", "courier, monospace"),
    trait.style("gridColumn", () => `1 / -1`, store.data.grid_cols),
    trait.style("gridRow", () => `1 / -1`, store.data.grid_rows),
    trait.html(
      () =>
        totalGridCells().map((_, i) =>
          tag.div(
            trait.style("borderTop", `1px solid ${util.alpha(hex.white, 0.1)}`),
            trait.style("borderLeft", `1px solid ${util.alpha(hex.white, 0.1)}`),
            trait.style("alignItems", "center"),
            trait.style("justifyContent", "center"),
            trait.style("display", "flex"),
            trait.style("fontSize", "10px"),
            trait.style("color", util.alpha(hex.white, 0.1))
            // `${i + 1}`
          )
        ),
      store.data.grid_rows,
      store.data.grid_cols
    )
  ),

  // Column Labels
  tag.div(
    trait.style("display", "grid"),
    trait.style("gridTemplateColumns", "subgrid"),
    trait.style("gridTemplateRows", "subgrid"),
    trait.style("pointerEvents", "none"),
    trait.style("fontFamily", "courier, monospace"),
    trait.style("gridColumn", () => `1 / -1`, store.data.grid_cols),
    trait.style("gridRow", () => `1 / -1`, store.data.grid_rows),
    trait.html(
      () =>
        Array.from({ length: store.data.grid_cols.val() - 2 }).map((_, colIndex) =>
          tag.div(
            trait.style("gridColumn", () => `${colIndex + 3} / span 1`, store.data.grid_cols),
            trait.style("gridRow", "2 / span 1"),
            trait.style("fontSize", "10px"),
            trait.style("display", "flex"),
            trait.style("alignItems", "center"),
            trait.style("justifyContent", "center"),
            trait.style("padding", "2px"),
            trait.style("color", util.alpha(hex.white, 0.2)),
            `${colIndex + 1}`
          )
        ),
      store.data.grid_cols
    )
  ),

  // Row Labels
  tag.div(
    trait.style("display", "grid"),
    trait.style("gridTemplateColumns", "subgrid"),
    trait.style("gridTemplateRows", "subgrid"),
    trait.style("pointerEvents", "none"),
    trait.style("fontFamily", "courier, monospace"),
    trait.style("gridColumn", () => `1 / -1`, store.data.grid_cols),
    trait.style("gridRow", () => `1 / -1`, store.data.grid_rows),
    trait.html(
      () =>
        Array.from({ length: store.data.grid_rows.val() - 2 }).map((_, rowIndex) =>
          tag.div(
            trait.style("gridColumn", "2 / span 1"),
            trait.style("gridRow", () => `${rowIndex + 3} / span 1`, store.data.grid_rows),
            trait.style("fontSize", "10px"),
            trait.style("display", "flex"),
            trait.style("alignItems", "center"),
            trait.style("justifyContent", "center"),
            trait.style("padding", "5px"),
            trait.style("color", util.alpha(hex.white, 0.2)),
            `${rowIndex + 1}`
          )
        ),
      store.data.grid_rows
    )
  ),

  // Logo / Hamburger
  tag.div(
    trait.style("gridColumn", () => `1 / span 2`),
    trait.style("gridRow", "1 / span 1"),
    trait.style("padding", "0 10px"),
    trait.style("textAlign", "center"),
    trait.style("display", "flex"),
    trait.style("alignItems", "center"),
    trait.style("justifyContent", "center"),
    trait.style("backgroundColor", hex.black),
    trait.style("color", hex.brand),
    trait.style("margin", "1px"),
    trait.style("letterSpacing", "-1px"),
    "L",
    tag.span(trait.style("fontSize", "21px"), "∞"),
    "P"
  ),

  // Menu
  tag.div(
    trait.style("gridColumn", `1 / span 1`),
    trait.style("gridRow", `3 / -1`),
    trait.style("display", "grid"),
    trait.style("gridTemplateColumns", "subgrid"),
    trait.style("gridTemplateRows", "subgrid"),
    trait.html(
      store.data.menu.$call("map", (item) =>
        tag.div(
          trait.style("display", "flex"),
          trait.style("alignItems", "center"),
          trait.style("cursor", "pointer"),
          trait.style("justifyContent", "center"),
          trait.style("fontSize", "12px"),
          trait.style("padding", "10px"),
          trait.style("color", util.alpha(hex.white, 0.2), $test(!item.active)),
          trait.style("color", hex.brand, $test(item.active)),
          trait.styleOnEvt("mouseover", "color", util.alpha(hex.white, 0.5), $test(!item.active)),
          trait.styleOnEvt("mouseout", "color", util.alpha(hex.white, 0.2), $test(!item.active)),
          trait.event("click", $fsm("ACTIVE_MENU_ITEM", item.id)),
          icons[item.icon]()
        )
      ),
      store.data.menu
    )
  ),

  // Chat
  tag.div(
    trait.style("display", "flex"),
    trait.style("flexDirection", "row"),
    trait.style("justifyContent", "space-between"),
    trait.style("alignItems", "center"),
    trait.style("gridColumn", () => `3 / span ${store.data.grid_cols.val() - 1}`, store.data.grid_cols),
    trait.style("gridRow", "1 / span 1"),
    trait.style("margin", "1px"),
    trait.style("backgroundColor", hex.black),
    // Title
    tag.input(
      trait.attr("type", "text"),
      trait.attr("placeholder", "Chat..."),
      trait.attr("autofocus", "true"),
      trait.style("padding", "10px"),
      trait.style("border", "none"),
      trait.style("outline", "none"),
      trait.style("fontSize", "13px"),
      trait.style("fontFamily", "inherit"),
      trait.style("backgroundColor", "transparent"),
      trait.style("color", "inherit"),
      trait.style("width", "100%"),
      trait.style("height", "100%"),
      trait.input("input", store.data.chat.set),
      trait.value(store.data.chat.$val)
    )
  ),

  // Objects Grid
  tag.div(
    trait.style("gridColumn", () => `3 / span ${store.data.grid_cols.val() - 2}`, store.data.grid_cols),
    trait.style("gridRow", `3 / -1`, store.data.grid_rows),
    trait.style("overflowY", "auto"),
    trait.style("display", "grid"),
    trait.style("gridTemplateColumns", "subgrid"),
    trait.style("gridTemplateRows", "subgrid"),
    trait.html(
      store.data.objects.$call("map", (obj) =>
        tag.div(
          trait.style("borderRight", `2px solid ${util.alpha(hex.white, 0.2)}`, $test(!obj.selected)),
          trait.style("borderRight", `2px solid ${util.alpha(hex.brand, 0.5)}`, $test(!!obj.selected)),
          trait.style("borderBottom", `2px solid ${util.alpha(hex.white, 0.2)}`, $test(!obj.selected)),
          trait.style("borderBottom", `2px solid ${util.alpha(hex.brand, 0.5)}`, $test(!!obj.selected)),
          trait.style("borderRadius", "3px"),
          trait.style("margin", "3px"),
          trait.style("color", hex.brand, $test(!!obj.selected)),
          trait.style("color", util.alpha(hex.white, 0.3), $test(!obj.selected)),
          trait.style("backgroundColor", util.alpha(hex.white, 0.05), $test(!!obj.selected)),
          trait.style("backgroundColor", "transparent", $test(!obj.selected)),
          trait.styleOnEvt("mouseover", "backgroundColor", util.alpha(hex.white, 0.1), $test(!obj.selected)),
          trait.styleOnEvt("mouseout", "backgroundColor", "transparent", $test(!obj.selected)),
          trait.style("transition", "background-color 0.2s ease"),
          trait.style("cursor", "pointer"),
          trait.style("padding", "10px"),
          trait.style("display", "flex"),
          trait.style("flexDirection", "column"),
          trait.style("alignItems", "center"),
          trait.style("justifyContent", "center"),
          trait.style("textAlign", "center"),
          tag.div(obj.name)
        )
      )
    )
  )
);
