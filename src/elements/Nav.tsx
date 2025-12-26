import type { Child } from "hono/jsx";

type NavProps = {
  children: Child;
  class?: string;
};

type NavBrandProps = {
  children: Child;
  href?: string;
  class?: string;
};

type NavLinksProps = {
  children: Child;
  class?: string;
};

type NavLinkProps = {
  children: Child;
  href: string;
  active?: boolean;
  class?: string;
};

export const Nav = ({ children, class: className }: NavProps) => {
  return (
    <nav class={className}>
      <ul>{children}</ul>
    </nav>
  );
};

export const NavBrand = ({ children, href = "/", class: className }: NavBrandProps) => {
  return (
    <li class={className}>
      <a href={href}>
        <strong>{children}</strong>
      </a>
    </li>
  );
};

export const NavLinks = ({ children, class: className }: NavLinksProps) => {
  return <li class={className}>{children}</li>;
};

export const NavLink = ({ children, href, active = false, class: className }: NavLinkProps) => {
  return (
    <a href={href} class={className} aria-current={active ? "page" : undefined}>
      {children}
    </a>
  );
};
