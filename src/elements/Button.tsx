import type { Child } from "hono/jsx";

type ButtonProps = {
  children: Child;
  variant?: "primary" | "secondary" | "contrast" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
  onclick?: string;
};

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  type = "button",
  class: className,
  onclick,
}: ButtonProps) => {
  return (
    <button type={type} disabled={disabled} data-variant={variant} data-size={size} class={className} onclick={onclick}>
      {children}
    </button>
  );
};
