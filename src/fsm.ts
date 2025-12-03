import { VIEWS } from "@/constants";
import { store } from "@/store";
import { type Actions } from "@/types";

function keyFsm(e: KeyboardEvent) {
  switch (e.type) {
    case "keydown":
      switch (store.data.mode.val()) {
        case "normal":
          if (e.ctrlKey) store.data.showCommands.set(true);
          if (e.altKey) store.data.showCommands.set(true);
          if (e.key === "/") {
            e.preventDefault();
            fsm("SWITCH_MODE", "command");
          }
          if (e.key === "Escape") {
            e.preventDefault();
            store.data.showCommands.set(false);
          }
          if (e.key === "ArrowDown") {
            const menuLabels = Object.keys(VIEWS);
            const currentIndex = menuLabels.indexOf(store.data.view.val());
            const nextIndex = (currentIndex + 1) % menuLabels.length;
            fsm("ACTIVE_MENU_ITEM", menuLabels[nextIndex] as any);
          }
          if (e.key === "ArrowUp") {
            const menuLabels = Object.keys(VIEWS);
            const currentIndex = menuLabels.indexOf(store.data.view.val());
            const nextIndex = (currentIndex - 1 + menuLabels.length) % menuLabels.length;
            fsm("ACTIVE_MENU_ITEM", menuLabels[nextIndex] as any);
          }
          break;
        case "command":
          if (e.key === "Escape") fsm("SWITCH_MODE", "normal");
          break;
      }

      break;
    case "keyup":
      switch (store.data.mode.val()) {
        case "normal":
          if (!e.ctrlKey) store.data.showCommands.set(false);
          if (!e.altKey) store.data.showCommands.set(false);
          break;
      }
      break;
  }
}

export function fsm<T extends Actions>(...args: T) {
  const [action, payload] = args;
  console.log(store.data.uiState.val(), args);
  switch (store.data.uiState.val()) {
    case "init":
      switch (action) {
        case "INIT":
          store.data.uiState.set("ready");
          document.addEventListener("keydown", keyFsm);
          document.addEventListener("keyup", keyFsm);
          break;
      }
      break;
    case "ready":
      switch (action) {
        case "ACTIVE_MENU_ITEM":
          store.data.view.set(payload);
          break;
        case "SWITCH_MODE":
          if (payload === "command") {
            // TBD: maybe do this in keyFsm if ctrl?
            // store.data.chat.set("");
          }
          store.data.mode.set(payload);
          break;
      }
      break;
    default:
    // noop
  }
}

// create a callback version of fsm
export const $fsm =
  <T extends Actions>(...args: T) =>
  () =>
    fsm(...args);
