import type { Child } from "hono/jsx";

type TabButtonsProps = {
  children: Child;
  class?: string;
};

type TabButtonProps = {
  children: Child;
  active?: boolean;
  disabled?: boolean;
  class?: string;
};

export const TabButtons = ({ children, class: className }: TabButtonsProps) => {
  return (
    <nav role="tablist" class={className}>
      {children}
    </nav>
  );
};

export const TabButton = ({ children, active = false, disabled = false, class: className }: TabButtonProps) => {
  return (
    <button type="button" role="tab" disabled={disabled} aria-selected={active} class={className}>
      {children}
    </button>
  );
};
