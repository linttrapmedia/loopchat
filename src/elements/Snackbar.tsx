import type { Child } from "hono/jsx";

type SnackbarProps = {
  children: Child;
  variant?: "info" | "success" | "warning" | "error";
  open?: boolean;
  class?: string;
};

export const Snackbar = ({ children, variant = "info", open = false, class: className }: SnackbarProps) => {
  return (
    <output role="status" data-variant={variant} hidden={!open} class={className}>
      {children}
    </output>
  );
};
