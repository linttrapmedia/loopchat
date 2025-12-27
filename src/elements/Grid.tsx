import type { Child } from "hono/jsx";

type GroupProps = {
  children: Child;
  class?: string;
};

export const Group = ({ children, class: className }: GroupProps) => {
  return (
    <div role="group" class={className}>
      {children}
    </div>
  );
};

type GridProps = {
  children: Child;
  class?: string;
};

export const Grid = ({ children, class: className }: GridProps) => {
  return (
    <div data-grid class={className}>
      {children}
    </div>
  );
};

type ContainerProps = {
  children: Child;
  class?: string;
};

export const Container = ({ children, class: className }: ContainerProps) => {
  return (
    <main data-container class={className}>
      {children}
    </main>
  );
};

type StackProps = {
  children: Child;
  gap?: "sm" | "md" | "lg";
  class?: string;
};

export const Stack = ({ children, gap, class: className }: StackProps) => {
  return (
    <div data-stack={gap || true} class={className}>
      {children}
    </div>
  );
};
