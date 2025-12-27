import type { Child } from "hono/jsx";

export type FieldsetProps = {
  children: Child;
  class?: string;
  disabled?: boolean;
  legend?: string;
};

export const Fieldset = ({ children, class: className, disabled, legend }: FieldsetProps) => (
  <fieldset class={className} disabled={disabled}>
    {legend && <legend>{legend}</legend>}
    {children}
  </fieldset>
);

export type LegendProps = {
  children: Child;
  class?: string;
};

export const Legend = ({ children, class: className }: LegendProps) => <legend class={className}>{children}</legend>;
