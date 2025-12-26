import type { Child } from "hono/jsx";

type CardProps = {
  children: Child;
  class?: string;
};

type CardHeaderProps = {
  children: Child;
  class?: string;
};

type CardBodyProps = {
  children: Child;
  class?: string;
};

type CardFooterProps = {
  children: Child;
  class?: string;
};

export const Card = ({ children, class: className }: CardProps) => {
  return <article class={className}>{children}</article>;
};

export const CardHeader = ({ children, class: className }: CardHeaderProps) => {
  return <header class={className}>{children}</header>;
};

export const CardBody = ({ children, class: className }: CardBodyProps) => {
  return <div class={className}>{children}</div>;
};

export const CardFooter = ({ children, class: className }: CardFooterProps) => {
  return <footer class={className}>{children}</footer>;
};
