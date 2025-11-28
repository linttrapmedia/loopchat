import { tag, trait } from "@/template";

function box(color: string) {
  return tag.svg(
    trait.attr("viewBox", "0 0 24 24"),
    trait.attr("width", "24"),
    trait.attr("height", "24"),
    trait.attr("xmlns", "http://www.w3.org/2000/svg"),
    tag.g(
      // Front face
      tag.rect(
        trait.attr("x", "4"),
        trait.attr("y", "8"),
        trait.attr("width", "12"),
        trait.attr("height", "12"),
        trait.attr("fill", color),
        trait.attr("stroke", "currentColor"),
        trait.attr("stroke-width", "1")
      ),
      // Top face
      tag.polygon(
        trait.attr("points", "4,8 8,4 20,4 16,8"),
        trait.attr("fill", color),
        trait.attr("opacity", "0.8"),
        trait.attr("stroke", "currentColor"),
        trait.attr("stroke-width", "1")
      ),
      // Right face
      tag.polygon(
        trait.attr("points", "16,8 20,4 20,16 16,20"),
        trait.attr("fill", color),
        trait.attr("opacity", "0.6"),
        trait.attr("stroke", "currentColor"),
        trait.attr("stroke-width", "1")
      )
    )
  );
}

export default { box };
