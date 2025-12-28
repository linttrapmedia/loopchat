import { UI } from "@/client/app";
import { fsm } from "@/client/fsm";

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  if (!root) return console.error("Root element not found");
  root.append(UI);
  fsm("INIT");
});
