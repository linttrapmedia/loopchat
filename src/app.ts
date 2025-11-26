import { tag, trait } from "@/template";
import { colors, store } from "./data";

export const UI = tag.div(
  trait.style("fontFamily", "courier, monospace"),
  trait.style("width", "100vw"),
  trait.style("height", "100vh"),
  trait.style("backgroundColor", colors.black, store.data.theme.$test("dark")),
  trait.style("backgroundColor", colors.white, store.data.theme.$test("light")),
  trait.style("color", colors.white_alpha_50, store.data.theme.$test("dark")),
  trait.style("color", colors.black, store.data.theme.$test("light")),
  trait.style("display", "grid"),
  trait.style("gridTemplateColumns", () => `repeat(${store.data.grid_cols.val()}, 1fr)`, store.data.grid_cols),
  trait.style("gridTemplateRows", () => `repeat(${store.data.grid_rows.val()}, 1fr)`, store.data.grid_rows),

  // Grid Overlay
  tag.div(
    trait.style("display", "grid"),
    trait.style("gridTemplateColumns", "subgrid"),
    trait.style("gridTemplateRows", "subgrid"),
    trait.style("pointerEvents", "none"),
    trait.style("fontFamily", "courier, monospace"),
    trait.style("gridColumn", () => `1 / -1`, store.data.grid_cols),
    trait.style("gridRow", () => `1 / -1`, store.data.grid_rows),
    trait.html(
      () => {
        return Array.from({ length: store.data.grid_rows.val() * store.data.grid_cols.val() }, (_, i) =>
          tag.div(
            trait.style("borderTop", `1px solid ${colors.white_alpha_10}`),
            trait.style("borderLeft", `1px solid ${colors.white_alpha_10}`),
            `${i + 1} - (${(i % store.data.grid_cols.val()) + 1}, ${Math.floor(i / store.data.grid_cols.val()) + 1})`
          )
        );
      },
      store.data.grid_rows,
      store.data.grid_cols
    )
  ),

  // Header
  tag.div(
    trait.style("display", "flex"),
    trait.style("flexDirection", "row"),
    trait.style("justifyContent", "space-between"),
    trait.style("alignItems", "center"),
    trait.style("padding", "10px"),
    trait.style("gridColumn", `1 / -1`, store.data.grid_cols),
    trait.style("gridRow", "1 / span 1"),
    // Title
    tag.input(
      trait.attr("type", "text"),
      trait.attr("placeholder", "Chat..."),
      trait.style("padding", "10px"),
      trait.style("borderRadius", "4px"),
      trait.style("border", "none"),
      trait.style("outline", "none"),
      trait.style("fontSize", "13px"),
      trait.style("fontFamily", "inherit"),
      trait.style("backgroundColor", colors.white_alpha_10),
      trait.style("color", "inherit"),
      trait.style("width", "100%"),
      trait.style("height", "100%")
    )
  ),
  // Body
  tag.div(
    trait.style("padding", "20px"),
    trait.style("gridColumn", `1 / -1`, store.data.grid_cols),
    trait.style("gridRow", `2 / -1`, store.data.grid_rows),
    trait.style("overflowY", "auto"),
    trait.style("backgroundColor", colors.white_alpha_10, store.data.theme.$test("dark")),
    "body"
  )
);
