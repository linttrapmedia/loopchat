import type { Child } from "hono/jsx";

type ChipProps = {
  children: Child;
  variant?: "default" | "primary" | "secondary";
  removable?: boolean;
  class?: string;
};

export const Chip = ({ children, variant = "default", removable = false, class: className }: ChipProps) => {
  return (
    <mark data-chip data-variant={variant} class={className}>
      {children}
      {removable && (
        <button type="button" aria-label="Remove">
          ×
        </button>
      )}
    </mark>
  );
};
