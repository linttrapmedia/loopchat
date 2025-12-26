import type { Child } from "hono/jsx";

type AlertProps = {
  children: Child;
  variant?: "info" | "success" | "warning" | "error";
  class?: string;
};

export const Alert = ({ children, variant = "info", class: className }: AlertProps) => {
  const roleMap = {
    info: "status",
    success: "status",
    warning: "alert",
    error: "alert",
  };

  return (
    <aside role={roleMap[variant]} data-variant={variant} class={className}>
      {children}
    </aside>
  );
};
