import { UI } from "@/app";
import { fsm } from "@/fsm";

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  if (!root) return console.error("Root element not found");
  root.append(UI);
  fsm("INIT");
});
