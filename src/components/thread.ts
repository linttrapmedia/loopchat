import { tag, trait } from "@/template";

export const Thread = () =>
  tag.div(
    trait.style("padding", "20px"),
    trait.style("display", "flex"),
    trait.style("flexDirection", "column"),
    trait.style("gap", "20px"),
    "thread"
  );
