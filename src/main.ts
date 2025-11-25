import { colors, store } from "@/data";
import { tag, trait } from "@/template";

export const UI = tag.div(
  trait.style("fontFamily", "courier, monospace"),
  trait.style("width", "100vw"),
  trait.style("height", "100vh"),
  trait.style("backgroundColor", colors.black, store.data.theme.$test("dark")),
  trait.style("backgroundColor", colors.white, store.data.theme.$test("light")),
  trait.style("color", colors.white_alpha_50, store.data.theme.$test("dark")),
  trait.style("color", colors.black, store.data.theme.$test("light")),
  trait.style("display", "grid"),
  trait.style("gridTemplateColumns", `repeat(${store.data.baseGrid.val()}, 1fr)`),
  trait.style("gridTemplateRows", `repeat(${store.data.baseGrid.val()}, 1fr)`),

  // Header
  tag.div(
    trait.style("display", "flex"),
    trait.style("flexDirection", "row"),
    trait.style("justifyContent", "space-between"),
    trait.style("alignItems", "center"),
    trait.style("padding", "10px"),
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
      trait.style("width", "100%")
    )
  ),
  // Body
  tag.div(trait.style("padding", "20px"), "body"),

  // Grid Overlay
  ...Array.from({ length: Math.pow(store.data.baseGrid.val(), 2) }, (_, i) =>
    tag.div(
      trait.style("borderTop", `1px solid ${colors.white_alpha_10}`),
      trait.style("borderLeft", `1px solid ${colors.white_alpha_10}`)
    )
  )
);

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  if (!root) return console.error("Root element not found");
  root.append(UI);
});
