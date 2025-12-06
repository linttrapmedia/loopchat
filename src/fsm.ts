import { VIEWS } from "@/constants";
import { store } from "@/store";
import { type Actions, type ObjectType } from "@/types";

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
          // TODO: use idb to persist large sets of objects
          // idb.addItem("objects", { id: "1", name: "Kevin", noun: "person" });
          // idb.addItem("objects", { id: "2", name: "LintTrap", noun: "thing" });
          // idb.addItem("objects", { id: "3", name: "LoopChat", noun: "thing" });
          // idb.addItem("objects", { id: "4", name: "OpenAI", noun: "thing" });
          // idb.addItem("objects", { id: "5", name: "ChatGPT", noun: "thing" });
          // idb.addItem("objects", { id: "6", name: "JavaScript", noun: "thing" });
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
        case "NEXT_SUGGESTED_OBJECT_INDEX":
          const currentIndex = store.data.filteredObjectIdx.val();
          const totalObjects = store.data.filteredObjects.val().length;
          const nextIndex = (currentIndex + 1) % totalObjects;
          if (nextIndex < totalObjects) store.data.filteredObjectIdx.set(nextIndex);
          break;
        case "PREV_SUGGESTED_OBJECT_INDEX":
          const currIndex = store.data.filteredObjectIdx.val();
          const totalObjs = store.data.filteredObjects.val().length;
          const prevIndex = (currIndex - 1 + totalObjs) % totalObjs;
          if (prevIndex >= 0) store.data.filteredObjectIdx.set(prevIndex);
          break;
        case "ON_CHAT_INPUT":
          store.data.chat.set(payload);
          store.data.filteredObjects.set(
            store.data.cachedObjects
              .val()
              .filter(
                (o: ObjectType) =>
                  `@${o.name}`.toUpperCase().startsWith(store.data.chat.val().toUpperCase()) ||
                  store.data.chat.val() === "@"
              )
          );
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
