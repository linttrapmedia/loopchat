import { CommandLine } from "@/components/cli";
import { Help } from "@/components/help";
import { Thread } from "@/components/thread";
import { colors, store } from "@/store";
import { tag, trait } from "@/template";

export const UI = tag.div(
  trait.style("fontFamily", "courier, monospace"),
  trait.style("display", "flex"),
  trait.style("flexDirection", "column"),
  trait.style("width", "100%"),
  trait.style("height", "100%"),
  trait.style("backgroundColor", colors.black, store.data.theme.$test("dark")),
  trait.style("color", colors.white_alpha_50, store.data.theme.$test("dark")),
  trait.style("backgroundColor", colors.white, store.data.theme.$test("light")),
  trait.style("color", colors.black, store.data.theme.$test("light")),
  trait.style("fontSize", "13px"),
  trait.style("lineHeight", "1"),
  trait.style("overflowY", "auto"),
  trait.style("scrollbarWidth", "thin"),
  trait.style("scrollbarColor", `${colors.white_alpha_10} transparent`),
  // Header
  tag.div(
    trait.style("display", "flex"),
    trait.style("flexDirection", "row"),
    trait.style("justifyContent", "space-between"),
    trait.style("alignItems", "center"),
    trait.style("padding", "10px"),
    trait.style("borderBottom", `1px solid ${colors.white_alpha_10}`),
    CommandLine
  ),
  // Body
  tag.div(trait.html(Help, store.data.ui.$test("clean")), trait.html(Thread, store.data.ui.$test("dirty")))
);
