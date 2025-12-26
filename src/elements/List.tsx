import type { Child } from "hono/jsx";

type ListProps = {
  children: Child;
  ordered?: boolean;
  class?: string;
};

type ListItemProps = {
  children: Child;
  class?: string;
};

export const List = ({ children, ordered = false, class: className }: ListProps) => {
  const Tag = ordered ? "ol" : "ul";
  return <Tag class={className}>{children}</Tag>;
};

export const ListItem = ({ children, class: className }: ListItemProps) => {
  return <li class={className}>{children}</li>;
};
