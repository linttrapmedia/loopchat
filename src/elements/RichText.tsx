import type { Child } from "hono/jsx";

type RichTextProps = {
  children: Child;
  class?: string;
};

export const RichText = ({ children, class: className }: RichTextProps) => {
  return <article class={className}>{children}</article>;
};
