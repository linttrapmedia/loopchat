import type { Child } from "hono/jsx";

type ButtonGroupProps = {
  children: Child;
  class?: string;
};

export const ButtonGroup = ({ children, class: className }: ButtonGroupProps) => {
  return (
    <div role="group" data-button-group class={className}>
      {children}
    </div>
  );
};
