import type { Child } from "hono/jsx";

type AccordionProps = {
  children: Child;
  class?: string;
};

type AccordionItemProps = {
  summary: string;
  children: Child;
  open?: boolean;
  class?: string;
};

export const Accordion = ({ children, class: className }: AccordionProps) => {
  return <div class={className}>{children}</div>;
};

export const AccordionItem = ({ summary, children, open = false, class: className }: AccordionItemProps) => {
  return (
    <details open={open} class={className}>
      <summary>{summary}</summary>
      {children}
    </details>
  );
};
