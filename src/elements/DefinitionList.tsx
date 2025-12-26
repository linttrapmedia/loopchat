import type { Child } from "hono/jsx";

type DefinitionListProps = {
  children: Child;
  class?: string;
};

type DefinitionTermProps = {
  children: Child;
  class?: string;
};

type DefinitionDescriptionProps = {
  children: Child;
  class?: string;
};

export const DefinitionList = ({ children, class: className }: DefinitionListProps) => {
  return <dl class={className}>{children}</dl>;
};

export const DefinitionTerm = ({ children, class: className }: DefinitionTermProps) => {
  return <dt class={className}>{children}</dt>;
};

export const DefinitionDescription = ({ children, class: className }: DefinitionDescriptionProps) => {
  return <dd class={className}>{children}</dd>;
};
