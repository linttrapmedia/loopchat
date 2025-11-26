import { UI } from "@/app";
import { store } from "@/data";
import type { Actions } from "@/types";

export const fsm = (evt: Actions) => {
  const [action] = evt;
  switch (store.data.uiState.val()) {
    case "init":
      switch (action) {
        case "INIT":
          const root = document.getElementById("root");
          if (!root) return console.error("Root element not found");
          root.append(UI);
      }
      break;
    default:
    // noop
  }
};
