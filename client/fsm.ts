import { VIEWS } from "@/client/constants";
import { store } from "@/client/state";
import { type Actions, type Command } from "@/client/types";
import util from "@/client/util";

function keyFsm(e: KeyboardEvent) {
  switch (e.type) {
    case "keydown":
      switch (store.data.mode.val()) {
        case "normal":
          // if (e.ctrlKey) store.data.showCommands.set(true);
          // if (e.altKey) store.data.showCommands.set(true);
          if (e.key === "/") {
            e.preventDefault();
            fsm("SWITCH_MODE", "command");
          }
          if (e.key === "Escape") {
            e.preventDefault();
            // store.data.showCommands.set(false);
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
          if (e.key === "Backspace") {
            // XXX: not sure if this belongs in the main fsm CHAT_INPUT event but it seems to work here as an edge case. if the chat only had one character left, reset command mode
            const chatVal = store.data.chat.val();
            if (chatVal.length <= 1) {
              store.data.command_mode.set(null);
              store.data.commands_filter.set([]);
              store.data.chat.set("");
            }
          }
          if (e.key === "Escape") {
            // if cycling through commands, reset index
            store.data.mode.set("normal");
            store.data.command_mode.set(null);
            if (store.data.commands_filter_idx.val() > -1) {
              store.data.commands_filter_idx.set(-1);
              return;
            }
            //  fsm("SWITCH_MODE", "normal");
          }
          if (e.key === "Enter") {
            e.preventDefault();

            // if currently cycling through commands, auto-complete the selected one
            if (store.data.commands_filter_idx.val() > -1) {
              // current selected command
              const cmdIdx = store.data.commands_filter_idx.val();
              const command = store.data.commands_filter.val()[cmdIdx];
              if (command) {
                fsm("AUTO_COMPLETE_COMMAND", command.command);
              }
            }

            // now show which command needs to be executed
            const chatVal = store.data.chat.val();
            console.log("EXECUTE COMMAND FOR CHAT INPUT:", chatVal);
          }
          if (e.key === "Tab") {
            e.preventDefault();
            console.log("asdf");
          }
          if (e.key === "ArrowDown") {
            fsm("NEXT_CMD_INDEX");
          }
          if (e.key === "ArrowUp") {
            fsm("PREV_CMD_INDEX");
          }
          break;
      }

      break;
    case "keyup":
      switch (store.data.mode.val()) {
        case "normal":
          // if (!e.ctrlKey) store.data.showCommands.set(false);
          // if (!e.altKey) store.data.showCommands.set(false);
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
        case "AUTO_COMPLETE_COMMAND":
          (() => {
            // the current auto complete command string
            const commandStr = payload;
            // the current chat value
            const chatVal = store.data.chat.val();
            // the current caret position
            const caretPos = store.data.caret_pos.val();
            // get the beginning and ending caret position of the current command being typed
            const commandNameMatch = chatVal.slice(0, caretPos).match(/([/@#-][a-zA-Z0-9-_]*)$/);
            const commandName = commandNameMatch ? commandNameMatch[1] : "";
            if (!commandName) return;
            const commandStartIdx = caretPos - commandName.length;
            const commandEndIdx = commandStartIdx + commandName.length;
            // now replace that portion of the chat value with the full command
            const newChatVal = chatVal.slice(0, commandStartIdx) + commandStr + " " + chatVal.slice(commandEndIdx);
            store.data.chat.set(newChatVal);
            const newCaretPos = commandStartIdx + commandStr.length + 1;
            store.data.caret_pos.set(newCaretPos);
            store.data.command_curr.set(payload);
            store.data.commands_filter.set([]);
            store.data.commands_filter_idx.set(-1);
            store.data.chat_refresh.set(Date.now());
          })();
          return;
        case "NEXT_CMD_INDEX":
          const nextIdx = (store.data.commands_filter_idx.val() + 1) % store.data.commands_filter.val().length;
          store.data.commands_filter_idx.set(nextIdx);
          break;
        case "PREV_CMD_INDEX":
          const prevIdx =
            (store.data.commands_filter_idx.val() - 1 + store.data.commands_filter.val().length) %
            store.data.commands_filter.val().length;
          store.data.commands_filter_idx.set(prevIdx);
          break;
        case "SWITCH_MODE":
          if (payload === "command") {
            // TBD: maybe do this in keyFsm if ctrl?
          }
          store.data.mode.set(payload);
          break;
        case "SWITCH_MODE_TO_NORMAL":
          store.data.mode.set("normal");
          break;
        case "SWITCH_MODE_TO_COMMAND":
          store.data.mode.set("command");
          // make sure caret is at end of chat input
          const chatLen = store.data.chat.val().length;
          store.data.caret_pos.set(chatLen);
          break;
        case "ON_CHAT_INPUT":
          (() => {
            const rawInput = payload;
            const cleanInput = rawInput.replace(/[^a-zA-Z0-9 -/_]/g, "");
            const chatVal = store.data.chat.val();
            const caretPos = store.data.caret_pos.val();
            const isSlashCommand = util.isCommand("/", chatVal, caretPos);
            const isAtCommand = util.isCommand("@", chatVal, caretPos);
            const isHashCommand = util.isCommand("#", chatVal, caretPos);
            const isDashCommand = util.isCommand("-", chatVal, caretPos);
            if (isAtCommand) store.data.command_mode.set("at");
            if (isSlashCommand) store.data.command_mode.set("slash");
            if (isHashCommand) store.data.command_mode.set("hash");
            if (isDashCommand) store.data.command_mode.set("dash");

            // get the current command name being typed
            const commandNameMatch = cleanInput.slice(0, caretPos).match(/([/@#-][a-zA-Z0-9-_]*)$/);
            const commandName = commandNameMatch ? commandNameMatch[1] : "";

            // if command name matches a known command, set it
            const knownCommand = store.data.commands.val().find((c: Command) => c.command === commandName);
            if (knownCommand && commandName) {
              store.data.command_curr.set(commandName);
              // store.data.commands_filter.set([]);
            } else {
              store.data.command_curr.set(null);
            }
            console.log("COMMAND NAME:", commandName);

            store.data.chat.set(cleanInput);

            console.log("isSlashCommand", isSlashCommand, "Filtering commands for:", commandName);
            if (isSlashCommand) {
              // filter commands based on current command name
              store.data.commands_filter.set(
                store.data.commands
                  .val()
                  .filter((c: Command) => `${c.command}`.toUpperCase().startsWith((commandName ?? "").toUpperCase()))
              );
            }
          })();
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
