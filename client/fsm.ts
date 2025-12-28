import { VIEWS } from "@/client/constants";
import { store } from "@/client/state";
import { type Actions } from "@/client/types";

function keyFsm(e: KeyboardEvent) {
  switch (e.type) {
    case "keydown":
      switch (store.data.mode.val()) {
        case "normal":
          if (e.key === "/") {
            e.preventDefault();
            fsm("SWITCH_MODE", "command");
          }
          if (e.key === "Escape") {
            e.preventDefault();
          }
          if (e.key === "ArrowDown" || e.key === "j") {
            const menuLabels = Object.keys(VIEWS);
            const currentIndex = menuLabels.indexOf(store.data.view.val());
            const nextIndex = (currentIndex + 1) % menuLabels.length;
            fsm("ACTIVE_MENU_ITEM", menuLabels[nextIndex] as any);
          }
          if (e.key === "ArrowUp" || e.key === "k") {
            const menuLabels = Object.keys(VIEWS);
            const currentIndex = menuLabels.indexOf(store.data.view.val());
            const nextIndex = (currentIndex - 1 + menuLabels.length) % menuLabels.length;
            fsm("ACTIVE_MENU_ITEM", menuLabels[nextIndex] as any);
          }
          if (e.key === "ArrowLeft" || e.key === "h") {
            // TODO
          }
          if (e.key === "ArrowRight" || e.key === "l") {
            // TODO
          }
          break;
        case "command":
          if (e.key === "Escape") fsm("SWITCH_MODE", "normal");
          if (e.key === "Tab") {
            e.preventDefault();
            console.log("asdf");
          }
          if (e.key === "ArrowDown") {
            fsm("NEXT_SUGGESTED_OBJECT_INDEX");
          }
          if (e.key === "ArrowUp") {
            fsm("PREV_SUGGESTED_OBJECT_INDEX");
          }
          break;
      }

      break;
    case "keyup":
      switch (store.data.mode.val()) {
        case "normal":
          break;
      }
      break;
  }
}

export function fsm<T extends Actions>(...args: T) {
  const [action, payload] = args;
  console.log(store.data.ui_state.val(), args);
  switch (store.data.ui_state.val()) {
    case "init":
      switch (action) {
        case "INIT":
          store.data.ui_state.set("ready");
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
        case "SWITCH_MODE_TO_NORMAL":
          store.data.mode.set("normal");
          break;
        case "SWITCH_MODE_TO_COMMAND":
          store.data.mode.set("command");
          console.log("SWITCH_MODE_TO_COMMAND");
          break;
        case "ON_CHAT_INPUT":
          store.data.chat.set(payload);
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
