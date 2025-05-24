function LoopChat(root) {
  this.root = root;
  this.state = "init";
  this.renderRoot().renderChannels().renderWorkflows();
}

LoopChat.prototype.renderDialog = function () {
  const el = document.createElement("div");
  el.id = "dialog";
  el.style.backgroundColor = "white";
  el.style.display = "flex";
  el.style.position = "fixed";
  el.style.top = "20px";
  el.style.left = "20px";
  el.style.height = "calc(100vh - 40px)";
  el.style.width = "calc(100vw - 40px)";
  el.style.overflowY = "auto";
  el.style.zIndex = "100";
  el.innerText = "Dialog";
  el.style.backgroundColor = "orange";
  this.root.appendChild(el);
  return this;
};

LoopChat.prototype.renderDrawer = function () {
  const el = document.createElement("div");
  el.id = "drawer";
  el.style.backgroundColor = "white";
  el.style.display = "flex";
  el.style.position = "fixed";
  el.style.top = "0";
  el.style.right = "0";
  el.style.height = "100%";
  el.style.maxHeight = "100%";
  el.style.overflowY = "auto";
  el.style.zIndex = "99";
  el.innerText = "Drawer";
  el.style.backgroundColor = "purple";
  this.root.appendChild(el);
  return this;
};

LoopChat.prototype.renderRoot = function () {
  this.root.style.width = "100%";
  this.root.style.height = "100%";
  this.root.style.position = "absolute";
  this.root.style.top = "0";
  this.root.style.backgroundColor = "white";
  this.root.style.display = "grid";
  this.root.style.gridTemplateColumns = "max-content 1fr";
  return this;
};

LoopChat.prototype.renderChannels = function () {
  const channels = document.createElement("div");
  channels.id = "channels";
  channels.style.backgroundColor = "white";
  channels.style.display = "grid";
  channels.style.gridColumn = "1 / 2";
  channels.style.gridRow = "1 / 2";

  const channel__tabs = document.createElement("div");
  channel__tabs.id = "channels__channel__tabs";
  channel__tabs.style.backgroundColor = "white";
  channel__tabs.style.display = "flex";

  function createTab(name) {
    const tab = document.createElement("button");
    tab.id = `channels__tab-${name}`;
    tab.style.backgroundColor = "white";
    tab.style.display = "flex";
    tab.style.justifyContent = "center";
    tab.style.alignItems = "center";
    tab.style.cursor = "pointer";
    tab.style.userSelect = "none";
    tab.style.fontWeight = "bold";
    tab.style.color = "black";
    tab.style.height = "max-content";
    tab.innerText = name;
    return tab;
  }

  channel__tabs.appendChild(createTab("channel-1"));
  channel__tabs.appendChild(createTab("channel-2"));
  channel__tabs.appendChild(createTab("channel-3"));
  channels.appendChild(channel__tabs);
  this.root.appendChild(channels);
  return this;
};

LoopChat.prototype.renderWorkflows = function () {
  const el = document.createElement("div");
  el.id = "results";
  el.style.backgroundColor = "white";
  el.style.display = "grid";
  el.style.gridColumn = "2 / 3";
  el.style.gridRow = "1 / 2";
  this.root.appendChild(el);
  el.innerText = "Workflows";
  el.style.backgroundColor = "yellow";
  return this;
};

// @ts-ignore
window.LoopChat = LoopChat;
