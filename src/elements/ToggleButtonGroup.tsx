import type { Child } from "hono/jsx";

type ToggleButtonGroupProps = {
  children: Child;
  class?: string;
};

type ToggleButtonProps = {
  children: Child;
  selected?: boolean;
  disabled?: boolean;
  value: string;
  class?: string;
};

export const ToggleButtonGroup = ({ children, class: className }: ToggleButtonGroupProps) => {
  return (
    <div role="group" data-toggle-group class={className}>
      {children}
    </div>
  );
};

export const ToggleButton = ({
  children,
  selected = false,
  disabled = false,
  value,
  class: className,
}: ToggleButtonProps) => {
  return (
    <button type="button" disabled={disabled} aria-pressed={selected} data-value={value} class={className}>
      {children}
    </button>
  );
};
