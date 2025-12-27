import type { Child } from "hono/jsx";
import type { JSX } from "hono/jsx/dom/jsx-dev-runtime";

type TypographyProps = {
  children: Child;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption" | "overline";
  as?: keyof JSX.IntrinsicElements;
  class?: string;
};

export const Typography = ({ children, variant = "body1", as, class: className }: TypographyProps) => {
  const defaultTags: Record<string, keyof JSX.IntrinsicElements> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body1: "p",
    body2: "p",
    caption: "small",
    overline: "small",
  };

  const Tag = as ?? (defaultTags[variant] as any);

  return (
    <Tag data-variant={variant !== defaultTags[variant] ? variant : undefined} class={className}>
      {children}
    </Tag>
  );
};
