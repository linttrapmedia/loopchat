import { tag, trait } from "@/template";

function box(color?: string) {
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
        trait.attr("fill", "transparent"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      ),
      // Top face
      tag.polygon(
        trait.attr("points", "4,8 8,4 20,4 16,8"),
        trait.attr("fill", "transparent"),
        trait.attr("opacity", "0.8"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      ),
      // Right face
      tag.polygon(
        trait.attr("points", "16,8 20,4 20,16 16,20"),
        trait.attr("fill", "transparent"),
        trait.attr("opacity", "0.6"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      )
    )
  );
}

function clipboard(color?: string) {
  return tag.svg(
    trait.attr("viewBox", "0 0 24 24"),
    trait.attr("width", "24"),
    trait.attr("height", "24"),
    trait.attr("xmlns", "http://www.w3.org/2000/svg"),
    tag.g(
      // Clipboard base
      tag.rect(
        trait.attr("x", "6"),
        trait.attr("y", "4"),
        trait.attr("width", "12"),
        trait.attr("height", "16"),
        trait.attr("fill", "transparent"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      ),
      // Clipboard clip
      tag.rect(
        trait.attr("x", "9"),
        trait.attr("y", "2"),
        trait.attr("width", "6"),
        trait.attr("height", "4"),
        trait.attr("fill", "transparent"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      )
    )
  );
}

function envelope(color?: string) {
  return tag.svg(
    trait.attr("viewBox", "0 0 24 24"),
    trait.attr("width", "24"),
    trait.attr("height", "24"),
    trait.attr("xmlns", "http://www.w3.org/2000/svg"),
    tag.g(
      // Envelope body
      tag.rect(
        trait.attr("x", "2"),
        trait.attr("y", "6"),
        trait.attr("width", "20"),
        trait.attr("height", "12"),
        trait.attr("fill", "transparent"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      ),
      // Envelope flap
      tag.polygon(
        trait.attr("points", "2,6 12,13 22,6"),
        trait.attr("fill", "transparent"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      )
    )
  );
}

function gear(color?: string) {
  return tag.svg(
    trait.attr("viewBox", "0 0 24 24"),
    trait.attr("width", "24"),
    trait.attr("height", "24"),
    trait.attr("xmlns", "http://www.w3.org/2000/svg"),
    tag.g(
      // Gear body
      tag.circle(
        trait.attr("cx", "12"),
        trait.attr("cy", "12"),
        trait.attr("r", "5"),
        trait.attr("fill", "transparent"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      ),
      // Gear teeth
      ...Array.from({ length: 8 }).map((_, i) =>
        tag.line(
          trait.attr("x1", `${12 + 7 * Math.cos((i * Math.PI) / 4)}`),
          trait.attr("y1", `${12 + 7 * Math.sin((i * Math.PI) / 4)}`),
          trait.attr("x2", `${12 + 9 * Math.cos((i * Math.PI) / 4)}`),
          trait.attr("y2", `${12 + 9 * Math.sin((i * Math.PI) / 4)}`),
          trait.attr("stroke", color || "currentColor"),
          trait.attr("stroke-width", "1")
        )
      )
    )
  );
}

function list(color?: string) {
  return tag.svg(
    trait.attr("viewBox", "0 0 24 24"),
    trait.attr("width", "24"),
    trait.attr("height", "24"),
    trait.attr("xmlns", "http://www.w3.org/2000/svg"),
    tag.g(
      // Lines
      tag.line(
        trait.attr("x1", "4"),
        trait.attr("y1", "6"),
        trait.attr("x2", "20"),
        trait.attr("y2", "6"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "2")
      ),
      tag.line(
        trait.attr("x1", "4"),
        trait.attr("y1", "12"),
        trait.attr("x2", "20"),
        trait.attr("y2", "12"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "2")
      ),
      tag.line(
        trait.attr("x1", "4"),
        trait.attr("y1", "18"),
        trait.attr("x2", "20"),
        trait.attr("y2", "18"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "2")
      )
    )
  );
}

function robot(color?: string) {
  return tag.svg(
    trait.attr("viewBox", "0 0 24 24"),
    trait.attr("width", "24"),
    trait.attr("height", "24"),
    trait.attr("xmlns", "http://www.w3.org/2000/svg"),
    tag.g(
      // Head
      tag.rect(
        trait.attr("x", "2"),
        trait.attr("y", "5"),
        trait.attr("width", "20"),
        trait.attr("height", "12"),
        trait.attr("fill", "transparent"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      ),
      // Eyes
      tag.circle(
        trait.attr("cx", "8"),
        trait.attr("cy", "11"),
        trait.attr("r", "2"),
        trait.attr("fill", color || "currentColor")
      ),
      tag.circle(
        trait.attr("cx", "16"),
        trait.attr("cy", "11"),
        trait.attr("r", "2"),
        trait.attr("fill", color || "currentColor")
      ),
      // Antenna 1
      tag.line(
        trait.attr("x1", "5"),
        trait.attr("y1", "0"),
        trait.attr("x2", "12"),
        trait.attr("y2", "4"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      ),
      // Antenna 2
      tag.line(
        trait.attr("x1", "19"),
        trait.attr("y1", "0"),
        trait.attr("x2", "12"),
        trait.attr("y2", "4"),
        trait.attr("stroke", color || "currentColor"),
        trait.attr("stroke-width", "1")
      )
    )
  );
}

export const icons = {
  box,
  clipboard,
  envelope,
  gear,
  list,
  robot,
};
