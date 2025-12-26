import type { Child } from "hono/jsx";

type IconButtonProps = {
  children: Child;
  label: string;
  variant?: "default" | "primary" | "secondary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
};

export const IconButton = ({
  children,
  label,
  variant = "default",
  size = "medium",
  disabled = false,
  type = "button",
  class: className,
}: IconButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      data-icon-button
      data-variant={variant}
      data-size={size}
      aria-label={label}
      class={className}
    >
      {children}
    </button>
  );
};
