import type { Child } from "hono/jsx";

type BadgeProps = {
  children: Child;
  variant?: "primary" | "secondary" | "contrast";
  class?: string;
};

export const Badge = ({ children, variant = "primary", class: className }: BadgeProps) => {
  return (
    <mark data-variant={variant} class={className}>
      {children}
    </mark>
  );
};
