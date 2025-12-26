import type { Child } from "hono/jsx";

type ModalProps = {
  children: Child;
  open?: boolean;
  id: string;
  class?: string;
};

type ModalHeaderProps = {
  children: Child;
  class?: string;
};

type ModalBodyProps = {
  children: Child;
  class?: string;
};

type ModalFooterProps = {
  children: Child;
  class?: string;
};

export const Modal = ({ children, open = false, id, class: className }: ModalProps) => {
  return (
    <dialog id={id} open={open} class={className}>
      <article>{children}</article>
    </dialog>
  );
};

export const ModalHeader = ({ children, class: className }: ModalHeaderProps) => {
  return <header class={className}>{children}</header>;
};

export const ModalBody = ({ children, class: className }: ModalBodyProps) => {
  return <div class={className}>{children}</div>;
};

export const ModalFooter = ({ children, class: className }: ModalFooterProps) => {
  return <footer class={className}>{children}</footer>;
};
