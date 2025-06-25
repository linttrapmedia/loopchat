import { UI } from "./components/ui";

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  if (!root) return console.error("Root element not found");
  root.append(UI);
});
