import type { Child } from "hono/jsx";

type DialogProps = {
  children: Child;
  open?: boolean;
  id: string;
  class?: string;
};

type DialogHeaderProps = {
  children: Child;
  class?: string;
};

type DialogBodyProps = {
  children: Child;
  class?: string;
};

type DialogFooterProps = {
  children: Child;
  class?: string;
};

export const Dialog = ({ children, open = false, id, class: className }: DialogProps) => {
  return (
    <dialog id={id} open={open} class={className}>
      <article>{children}</article>
    </dialog>
  );
};

export const DialogHeader = ({ children, class: className }: DialogHeaderProps) => {
  return <header class={className}>{children}</header>;
};

export const DialogBody = ({ children, class: className }: DialogBodyProps) => {
  return <section class={className}>{children}</section>;
};

export const DialogFooter = ({ children, class: className }: DialogFooterProps) => {
  return <footer class={className}>{children}</footer>;
};
