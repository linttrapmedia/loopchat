import type { Child } from "hono/jsx";

type LayoutProps = {
  title?: string;
  children: Child;
};

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <html>
      <head>
        <title>{title ?? ""}</title>
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
};
