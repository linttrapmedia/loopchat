import { serve } from "bun";
import homepage from "./server.html";

serve({
  development: {
    // New: enable console log streaming
    console: true,
    // Enable hot module reloading
    hmr: true,
  },
  routes: {
    "/": homepage,
  },
});

console.log("Server is running on http://localhost:3000");
console.log("Press Ctrl+C to stop the server.");
console.log("Bun version:", Bun.version);
console.log("Environment:", process.env.NODE_ENV || "development");
console.log("Server started at:", new Date().toLocaleString());
