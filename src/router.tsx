import { DesignSystem } from "@/pages/design-system";
import { Top } from "@/pages/example";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("/public/*", serveStatic({ root: "./src" }));

app.get("/", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Top messages={messages} />);
});

app.get("/design-system", (c) => c.html(<DesignSystem />));

export default app;
