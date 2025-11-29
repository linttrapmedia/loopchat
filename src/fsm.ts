import { store } from "@/data";
import type { Actions } from "@/types";

export function fsm<T extends Actions>(...args: T) {
  const [action, payload] = args;
  console.log(store.data.uiState.val(), args);
  switch (store.data.uiState.val()) {
    case "init":
      switch (action) {
        case "INIT":
          store.data.uiState.set("ready");
      }
      break;
    case "ready":
      switch (action) {
        case "ACTIVE_MENU_ITEM":
          const newMenu = store.data.menu.val().map((i) => {
            if (i.id === payload) {
              i.active = true;
            } else {
              i.active = false;
            }
            return i;
          });
          store.data.menu.set(newMenu);
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
