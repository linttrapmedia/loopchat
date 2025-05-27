((LOOPCHAT) => {
  /**
   * Renders the root element of the application
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.renderRoot = function () {
    this.root.style.width = "100%";
    this.root.style.height = "100%";
    this.root.style.position = "absolute";
    this.root.style.top = "0";
    this.root.style.fontFamily = "monospace";
    this.root.style.fontSize = "12px";
    this.root.style.backgroundColor = "#f5f6fa";
    this.root.style.color = "#000000";
    
    // Create a desktop container for all windows
    const desktop = document.createElement("div");
    desktop.id = "desktop";
    desktop.style.position = "relative";
    desktop.style.width = "100%";
    desktop.style.height = "100%";
    desktop.style.overflow = "hidden";
    
    // Create a toolbar at the top
    const toolbar = document.createElement("div");
    toolbar.id = "desktop__toolbar";
    toolbar.style.position = "fixed";
    toolbar.style.top = "0";
    toolbar.style.left = "0";
    toolbar.style.right = "0";
    toolbar.style.height = "30px";
    toolbar.style.backgroundColor = "#000000";
    toolbar.style.color = "#ffffff";
    toolbar.style.display = "flex";
    toolbar.style.alignItems = "center";
    toolbar.style.padding = "0 10px";
    toolbar.style.zIndex = "50";
    
    // App title
    const title = document.createElement("div");
    title.innerText = "LOOPCHAT";
    title.style.fontWeight = "bold";
    title.style.fontSize = "12px";
    title.style.marginRight = "20px";
    
    // Window management buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "10px";
    
    // Restore all windows button
    const restoreAllButton = document.createElement("button");
    restoreAllButton.innerText = "Show All Windows";
    restoreAllButton.style.padding = "2px 6px";
    restoreAllButton.style.backgroundColor = "transparent";
    restoreAllButton.style.color = "#ffffff";
    restoreAllButton.style.border = "1px solid #ffffff";
    restoreAllButton.style.borderRadius = "3px";
    restoreAllButton.style.cursor = "pointer";
    restoreAllButton.style.fontSize = "11px";
    
    restoreAllButton.addEventListener("click", () => {
      // Find all minimized windows and restore them
      this.windows.forEach(window => {
        if (window.minimized) {
          this.windowRestore(window.id);
        }
      });
    });
    
    // Cascade windows button
    const cascadeButton = document.createElement("button");
    cascadeButton.innerText = "Cascade Windows";
    cascadeButton.style.padding = "2px 6px";
    cascadeButton.style.backgroundColor = "transparent";
    cascadeButton.style.color = "#ffffff";
    cascadeButton.style.border = "1px solid #ffffff";
    cascadeButton.style.borderRadius = "3px";
    cascadeButton.style.cursor = "pointer";
    cascadeButton.style.fontSize = "11px";
    
    cascadeButton.addEventListener("click", () => {
      // Arrange all visible windows in a cascade pattern
      let offsetX = 20;
      let offsetY = 40; // Below toolbar
      
      this.windows.forEach(window => {
        if (!window.minimized) {
          const windowEl = document.getElementById(window.id);
          if (windowEl) {
            windowEl.style.top = `${offsetY}px`;
            windowEl.style.left = `${offsetX}px`;
            offsetX += 30;
            offsetY += 30;
          }
        }
      });
    });
    
    buttonContainer.appendChild(restoreAllButton);
    buttonContainer.appendChild(cascadeButton);
    
    toolbar.appendChild(title);
    toolbar.appendChild(buttonContainer);
    
    // Adjust desktop height to account for toolbar
    desktop.style.paddingTop = "30px";
    
    this.root.appendChild(toolbar);
    this.root.appendChild(desktop);

    return this;
  };

  /**
   * Renders the channels panel as a window
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.renderChannelsWindow = function () {
    // Create a window for channels
    const channelsWindow = document.createElement("div");
    channelsWindow.id = "window-channels";
    channelsWindow.className = "window";
    channelsWindow.style.position = "absolute";
    channelsWindow.style.width = "220px";
    channelsWindow.style.height = "400px";
    channelsWindow.style.top = "40px";
    channelsWindow.style.left = "20px";
    channelsWindow.style.display = "flex";
    channelsWindow.style.flexDirection = "column";
    channelsWindow.style.overflow = "hidden";
    channelsWindow.style.backgroundColor = "#ffffff";
    channelsWindow.style.border = "1px solid #000000";
    channelsWindow.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)";
    channelsWindow.style.zIndex = "10";
    
    // Add click handler to focus this window when clicked anywhere
    channelsWindow.addEventListener("mousedown", () => {
      this.windowFocus("window-channels");
    });

    // Window header
    const windowHeader = document.createElement("div");
    windowHeader.className = "window__header";
    windowHeader.style.display = "flex";
    windowHeader.style.justifyContent = "space-between";
    windowHeader.style.alignItems = "center";
    windowHeader.style.padding = "4px 6px";
    windowHeader.style.backgroundColor = "#000000";
    windowHeader.style.color = "#ffffff";
    windowHeader.style.cursor = "move";
    windowHeader.style.userSelect = "none";

    const windowTitle = document.createElement("div");
    windowTitle.innerText = "Channels";
    windowTitle.style.fontSize = "11px";
    windowTitle.style.fontWeight = "bold";

    const windowControls = document.createElement("div");
    windowControls.style.display = "flex";
    windowControls.style.gap = "6px";

    const minimizeButton = document.createElement("button");
    minimizeButton.innerHTML = "&#8211;";
    minimizeButton.style.background = "none";
    minimizeButton.style.border = "none";
    minimizeButton.style.color = "#ffffff";
    minimizeButton.style.cursor = "pointer";
    minimizeButton.style.fontSize = "12px";
    minimizeButton.style.padding = "0 4px";
    minimizeButton.addEventListener("click", () => {
      this.windowMinimize("window-channels");
    });

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&#10005;";
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.color = "#ffffff";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "12px";
    closeButton.style.padding = "0 4px";
    closeButton.addEventListener("click", () => {
      this.windowClose("window-channels");
    });

    windowControls.appendChild(minimizeButton);
    windowControls.appendChild(closeButton);

    windowHeader.appendChild(windowTitle);
    windowHeader.appendChild(windowControls);
    channelsWindow.appendChild(windowHeader);

    // Window content
    const windowContent = document.createElement("div");
    windowContent.className = "window__content";
    windowContent.style.flex = "1";
    windowContent.style.overflow = "auto";
    windowContent.style.backgroundColor = "#f0f0f0";

    // Channel tabs container
    const channelsList = document.createElement("div");
    channelsList.id = "channels__list";
    channelsList.style.display = "flex";
    channelsList.style.flexDirection = "column";
    channelsList.style.overflow = "hidden";
    channelsList.style.height = "100%";

    // Channel tabs
    const channelTabs = document.createElement("div");
    channelTabs.id = "channels__tabs";
    channelTabs.style.display = "flex";
    channelTabs.style.flexDirection = "column";
    channelTabs.style.overflow = "auto";
    channelTabs.style.flex = "1";

    // Render tabs from test data if available
    if (this.channels && this.channels.length > 0) {
      console.log("Rendering channel tabs from data:", this.channels);
      this.channels.forEach((channel) => {
        const tab = this.renderChannelTab(channel);
        channelTabs.appendChild(tab);
      });
    } else {
      // Default tabs - use the same IDs as in the test data
      console.log("Rendering default channel tabs");
      channelTabs.appendChild(this.renderChannelTab({ id: "general", title: "General" }));
      channelTabs.appendChild(this.renderChannelTab({ id: "support", title: "Support" }));
      channelTabs.appendChild(this.renderChannelTab({ id: "development", title: "Development" }));
    }

    channelsList.appendChild(channelTabs);
    windowContent.appendChild(channelsList);
    channelsWindow.appendChild(windowContent);

    // Make window draggable
    this.makeWindowDraggable(channelsWindow, windowHeader);

    // Add to DOM
    document.getElementById("desktop").appendChild(channelsWindow);
    
    // Add to windows array
    this.windows.push({
      id: "window-channels",
      type: "channels",
      minimized: false,
    });

    return this;
  };

  /**
   * Renders a single channel tab in the channels panel
   * @param {Object} channel - Channel data
   * @param {string} channel.id - Channel ID
   * @param {string} [channel.title] - Channel title
   * @param {string} [channel.description] - Channel description
   * @returns {HTMLElement} The rendered channel tab element
   */
  LOOPCHAT.prototype.renderChannelTab = function (channel) {
    const tab = document.createElement("div");
    tab.id = `channel__tab-${channel.id}`;
    tab.className = "channel__tab";
    tab.style.padding = "6px 8px";
    tab.style.cursor = "pointer";
    tab.style.borderBottom = "1px solid #e0e0e0";
    tab.style.transition = "background-color 0.1s";

    // Store the channel ID as a data attribute for direct access
    tab.dataset.channelId = channel.id;

    if (this.activeChannel === channel.id) {
      tab.style.backgroundColor = "#e0e0e0";
      tab.style.borderLeft = "2px solid #000000";
    } else {
      tab.style.borderLeft = "2px solid transparent";
    }

    tab.innerHTML = `<span># ${channel.title || channel.id}</span>`;

    // Add description as tooltip if available
    if (channel.description) {
      tab.title = channel.description;
    }

    tab.addEventListener("click", () => {
      console.log("Channel tab clicked:", channel.id);
      this.activateChannel(channel.id);
    });

    return tab;
  };

  /**
   * Renders a message input window
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.renderMessageInputWindow = function () {
    // Create a window for message input
    const inputWindow = document.createElement("div");
    inputWindow.id = "window-message-input";
    inputWindow.className = "window";
    inputWindow.style.position = "absolute";
    inputWindow.style.width = "500px";
    inputWindow.style.height = "150px";
    inputWindow.style.bottom = "20px";
    inputWindow.style.left = "260px";
    inputWindow.style.display = "flex";
    inputWindow.style.flexDirection = "column";
    inputWindow.style.overflow = "hidden";
    inputWindow.style.backgroundColor = "#ffffff";
    inputWindow.style.border = "1px solid #000000";
    inputWindow.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)";
    inputWindow.style.zIndex = "20"; // Higher than messages window by default
    
    // Add click handler to focus this window when clicked anywhere
    inputWindow.addEventListener("mousedown", () => {
      this.windowFocus("window-message-input");
    });

    // Window header
    const windowHeader = document.createElement("div");
    windowHeader.className = "window__header";
    windowHeader.style.display = "flex";
    windowHeader.style.justifyContent = "space-between";
    windowHeader.style.alignItems = "center";
    windowHeader.style.padding = "4px 6px";
    windowHeader.style.backgroundColor = "#000000";
    windowHeader.style.color = "#ffffff";
    windowHeader.style.cursor = "move";
    windowHeader.style.userSelect = "none";

    const windowTitle = document.createElement("div");
    windowTitle.innerText = "Message Input";
    windowTitle.style.fontSize = "11px";
    windowTitle.style.fontWeight = "bold";

    const windowControls = document.createElement("div");
    windowControls.style.display = "flex";
    windowControls.style.gap = "6px";

    const minimizeButton = document.createElement("button");
    minimizeButton.innerHTML = "&#8211;";
    minimizeButton.style.background = "none";
    minimizeButton.style.border = "none";
    minimizeButton.style.color = "#ffffff";
    minimizeButton.style.cursor = "pointer";
    minimizeButton.style.fontSize = "12px";
    minimizeButton.style.padding = "0 4px";
    minimizeButton.addEventListener("click", () => {
      this.windowMinimize("window-message-input");
    });

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&#10005;";
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.color = "#ffffff";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "12px";
    closeButton.style.padding = "0 4px";
    closeButton.addEventListener("click", () => {
      this.windowClose("window-message-input");
    });

    windowControls.appendChild(minimizeButton);
    windowControls.appendChild(closeButton);

    windowHeader.appendChild(windowTitle);
    windowHeader.appendChild(windowControls);
    inputWindow.appendChild(windowHeader);

    // Window content
    const windowContent = document.createElement("div");
    windowContent.className = "window__content";
    windowContent.style.flex = "1";
    windowContent.style.padding = "8px";
    windowContent.style.display = "flex";
    windowContent.style.flexDirection = "column";
    
    // Input container
    const inputContainer = document.createElement("div");
    inputContainer.style.position = "relative";
    inputContainer.style.display = "flex";
    inputContainer.style.flexDirection = "column";
    inputContainer.style.width = "100%";
    inputContainer.style.height = "100%";
    
    // Textarea for multi-line input
    const messageTextarea = document.createElement("textarea");
    messageTextarea.id = "message__input_field";
    messageTextarea.placeholder = "Type a message...";
    messageTextarea.style.width = "100%";
    messageTextarea.style.height = "100%";
    messageTextarea.style.resize = "none";
    messageTextarea.style.padding = "8px";
    messageTextarea.style.paddingBottom = "30px"; // Space for buttons
    messageTextarea.style.border = "1px solid #e0e0e0";
    messageTextarea.style.borderRadius = "4px";
    messageTextarea.style.fontFamily = "monospace";
    messageTextarea.style.fontSize = "12px";
    messageTextarea.style.outline = "none";
    messageTextarea.style.boxSizing = "border-box";

    messageTextarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const message = messageTextarea.value.trim();
        if (message) {
          this.sendMessage(message);
          messageTextarea.value = "";
        }
      }
    });
    
    // Button container (positioned at bottom right of textarea)
    const buttonContainer = document.createElement("div");
    buttonContainer.style.position = "absolute";
    buttonContainer.style.bottom = "12px";
    buttonContainer.style.right = "12px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "4px";
    
    // Send button
    const sendButton = document.createElement("button");
    sendButton.innerText = "Send";
    sendButton.style.padding = "2px 6px";
    sendButton.style.backgroundColor = "#000000";
    sendButton.style.color = "#ffffff";
    sendButton.style.border = "none";
    sendButton.style.borderRadius = "3px";
    sendButton.style.cursor = "pointer";
    sendButton.style.fontFamily = "monospace";
    sendButton.style.fontSize = "11px";
    sendButton.style.fontWeight = "bold";

    sendButton.addEventListener("click", () => {
      const message = messageTextarea.value.trim();
      if (message) {
        this.sendMessage(message);
        messageTextarea.value = "";
      }
    });

    buttonContainer.appendChild(sendButton);
    
    inputContainer.appendChild(messageTextarea);
    inputContainer.appendChild(buttonContainer);
    windowContent.appendChild(inputContainer);
    inputWindow.appendChild(windowContent);

    // Make window draggable
    this.makeWindowDraggable(inputWindow, windowHeader);

    // Add to DOM
    document.getElementById("desktop").appendChild(inputWindow);
    
    // Add to windows array
    this.windows.push({
      id: "window-message-input",
      type: "input",
      minimized: false,
    });

    return this;
  };

  /**
   * Renders the messages window
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.renderMessagesWindow = function () {
    // Create a window for messages
    const messagesWindow = document.createElement("div");
    messagesWindow.id = "window-messages";
    messagesWindow.className = "window";
    messagesWindow.style.position = "absolute";
    messagesWindow.style.width = "500px";
    messagesWindow.style.height = "400px";
    messagesWindow.style.top = "40px";
    messagesWindow.style.left = "260px";
    messagesWindow.style.display = "flex";
    messagesWindow.style.flexDirection = "column";
    messagesWindow.style.overflow = "hidden";
    messagesWindow.style.backgroundColor = "#ffffff";
    messagesWindow.style.border = "1px solid #000000";
    messagesWindow.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)";
    messagesWindow.style.zIndex = "15"; // Higher than channels window by default
    
    // Add click handler to focus this window when clicked anywhere
    messagesWindow.addEventListener("mousedown", () => {
      this.windowFocus("window-messages");
    });

    // Window header
    const windowHeader = document.createElement("div");
    windowHeader.className = "window__header";
    windowHeader.style.display = "flex";
    windowHeader.style.justifyContent = "space-between";
    windowHeader.style.alignItems = "center";
    windowHeader.style.padding = "4px 6px";
    windowHeader.style.backgroundColor = "#000000";
    windowHeader.style.color = "#ffffff";
    windowHeader.style.cursor = "move";
    windowHeader.style.userSelect = "none";

    const windowTitle = document.createElement("div");
    windowTitle.id = "messages__window_title";
    windowTitle.innerText = "Messages";
    windowTitle.style.fontSize = "11px";
    windowTitle.style.fontWeight = "bold";

    const windowControls = document.createElement("div");
    windowControls.style.display = "flex";
    windowControls.style.gap = "6px";

    const minimizeButton = document.createElement("button");
    minimizeButton.innerHTML = "&#8211;";
    minimizeButton.style.background = "none";
    minimizeButton.style.border = "none";
    minimizeButton.style.color = "#ffffff";
    minimizeButton.style.cursor = "pointer";
    minimizeButton.style.fontSize = "12px";
    minimizeButton.style.padding = "0 4px";
    minimizeButton.addEventListener("click", () => {
      this.windowMinimize("window-messages");
    });

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&#10005;";
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.color = "#ffffff";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "12px";
    closeButton.style.padding = "0 4px";
    closeButton.addEventListener("click", () => {
      this.windowClose("window-messages");
    });

    windowControls.appendChild(minimizeButton);
    windowControls.appendChild(closeButton);

    windowHeader.appendChild(windowTitle);
    windowHeader.appendChild(windowControls);
    messagesWindow.appendChild(windowHeader);

    // Window content
    const windowContent = document.createElement("div");
    windowContent.className = "window__content";
    windowContent.id = "messages__content";
    windowContent.style.flex = "1";
    windowContent.style.overflow = "auto";
    windowContent.style.padding = "8px";
    messagesWindow.appendChild(windowContent);

    // Make window draggable
    this.makeWindowDraggable(messagesWindow, windowHeader);

    // Add to DOM
    document.getElementById("desktop").appendChild(messagesWindow);
    
    // Add to windows array
    this.windows.push({
      id: "window-messages",
      type: "messages",
      minimized: false,
    });

    return this;
  };

  /**
   * Updates the content of the messages window for a specific channel
   * @param {string} channelId - ID of the channel to render
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.updateMessagesWindowContent = function (channelId) {
    const messagesContent = document.getElementById("messages__content");
    if (!messagesContent) return this;

    // Clear existing content
    messagesContent.innerHTML = "";

    // Find the channel data - log for debugging
    console.log("Looking for channel ID:", channelId);
    console.log("Available channels:", this.channels);

    // Find the channel data
    const channel = this.channels.find((c) => c.id === channelId);
    if (!channel) {
      console.error("Channel not found:", channelId);
      // Add fallback content for debugging
      messagesContent.innerHTML = `<div style="padding: 10px;">Channel ID ${channelId} not found</div>`;
      return this;
    }

    // Update window title
    const windowTitle = document.getElementById("messages__window_title");
    if (windowTitle) {
      windowTitle.innerText = `Messages - ${channel.title || channel.id}`;
    }

    // Channel info banner
    const channelInfoBanner = document.createElement("div");
    channelInfoBanner.className = "channel__info_banner";
    channelInfoBanner.style.marginBottom = "12px";
    channelInfoBanner.style.paddingBottom = "8px";
    channelInfoBanner.style.borderBottom = "1px solid #e0e0e0";
    channelInfoBanner.style.backgroundColor = "#f9f9f9";
    channelInfoBanner.style.padding = "8px";
    channelInfoBanner.style.borderRadius = "4px";

    // Add channel title and description
    const channelTitle = document.createElement("div");
    channelTitle.style.margin = "0";
    channelTitle.style.fontSize = "12px";
    channelTitle.style.fontWeight = "bold";
    channelTitle.innerHTML = `# ${channel.title || channel.id}`;
    channelInfoBanner.appendChild(channelTitle);

    if (channel.description) {
      const channelDesc = document.createElement("div");
      channelDesc.style.fontSize = "12px";
      channelDesc.style.color = "#808080";
      channelDesc.style.marginTop = "4px";
      channelDesc.innerText = channel.description;
      channelInfoBanner.appendChild(channelDesc);
    }

    messagesContent.appendChild(channelInfoBanner);

    // render messages
    if (channel.posts && channel.posts.length > 0) {
      channel.posts.forEach((post) => {
        const envelope = this.renderEnvelope(post);
        messagesContent.appendChild(envelope);
      });

      // Scroll to bottom to show latest messages
      setTimeout(() => {
        messagesContent.scrollTop = messagesContent.scrollHeight;
      }, 0);
    } else {
      const emptyMessage = document.createElement("div");
      emptyMessage.style.textAlign = "center";
      emptyMessage.style.padding = "12px";
      emptyMessage.style.color = "#808080";
      emptyMessage.innerText = "No messages yet";
      messagesContent.appendChild(emptyMessage);
    }

    return this;
  };

  /**
   * Renders a modal dialog over the main UI
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.renderDialog = function () {
    const el = document.createElement("div");
    el.id = "dialog";
    el.style.display = "flex";
    el.style.position = "fixed";
    el.style.top = "20px";
    el.style.left = "20px";
    el.style.height = "calc(100vh - 40px)";
    el.style.width = "calc(100vw - 40px)";
    el.style.overflowY = "auto";
    el.style.zIndex = "100";
    el.style.backgroundColor = "#ffffff";
    el.style.border = "1px solid #000000";
    el.innerText = "Dialog";
    this.root.appendChild(el);
    return this;
  };

  /**
   * Renders a side drawer on the right side of the UI
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.renderDrawer = function () {
    const el = document.createElement("div");
    el.id = "drawer";
    el.style.display = "flex";
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.right = "0";
    el.style.height = "100%";
    el.style.maxHeight = "100%";
    el.style.width = "250px";
    el.style.overflowY = "auto";
    el.style.zIndex = "99";
    el.style.backgroundColor = "#f0f0f0";
    el.style.borderLeft = "1px solid #000000";
    el.innerText = "Drawer";
    this.root.appendChild(el);
    return this;
  };

  /**
   * Renders a message envelope in a channel
   * @param {Object} post - Post data to render
   * @param {string} post.id - Post ID
   * @param {string} post.author - Author ID
   * @param {string} post.timestamp - ISO timestamp
   * @param {Object} post.payload - Message payload
   * @returns {HTMLElement} The rendered envelope element
   */
  LOOPCHAT.prototype.renderEnvelope = function (post) {
    const envelope = document.createElement("div");
    envelope.id = `envelope-${post.id}`;
    envelope.className = "envelope";
    envelope.style.marginBottom = "8px";
    envelope.style.padding = "6px";
    envelope.style.border = "1px solid #e0e0e0";

    // Author info
    const authorInfo = document.createElement("div");
    authorInfo.className = "envelope__author";
    authorInfo.style.display = "flex";
    authorInfo.style.alignItems = "center";
    authorInfo.style.marginBottom = "4px";

    // Get author details
    let authorName = post.author;
    let authorAvatar = post.author.charAt(0).toUpperCase();
    let isAgent = false;

    // Check if author is a user
    if (this.users && this.users[post.author]) {
      authorName = this.users[post.author].name;
      if (this.users[post.author].avatar) {
        authorAvatar = this.users[post.author].avatar;
      }
    }
    // Check if author is an agent
    else if (this.agents && this.agents[post.author]) {
      authorName = this.agents[post.author].name;
      if (this.agents[post.author].avatar) {
        authorAvatar = this.agents[post.author].avatar;
      }
      isAgent = true;
    }

    // render avatar element
    const avatarEl = document.createElement("div");
    avatarEl.className = "avatar";
    avatarEl.style.width = "20px";
    avatarEl.style.height = "20px";
    avatarEl.style.borderRadius = "2px";
    avatarEl.style.backgroundColor = isAgent ? "#000000" : "#808080";
    avatarEl.style.color = "#ffffff";
    avatarEl.style.display = "flex";
    avatarEl.style.justifyContent = "center";
    avatarEl.style.alignItems = "center";
    avatarEl.style.marginRight = "6px";
    avatarEl.style.fontWeight = "bold";
    avatarEl.style.fontSize = "12px";
    avatarEl.style.overflow = "hidden";

    // Check if avatar is a URL or a character
    if (authorAvatar.startsWith("http")) {
      avatarEl.style.backgroundImage = `url(${authorAvatar})`;
      avatarEl.style.backgroundSize = "cover";
      avatarEl.style.backgroundPosition = "center";
    } else {
      avatarEl.innerText = authorAvatar;
    }

    const authorNameEl = document.createElement("span");
    authorNameEl.style.fontWeight = "bold";
    authorNameEl.innerText = authorName;

    const timestamp = document.createElement("span");
    timestamp.style.marginLeft = "6px";
    timestamp.style.fontSize = "12px";
    timestamp.style.color = "#808080";
    timestamp.innerText = new Date(post.timestamp).toLocaleTimeString();

    authorInfo.appendChild(avatarEl);
    authorInfo.appendChild(authorNameEl);
    authorInfo.appendChild(timestamp);
    envelope.appendChild(authorInfo);

    // Message content
    const messageContent = document.createElement("div");
    messageContent.className = "envelope__message";
    messageContent.style.padding = "4px 0";

    if (post.payload) {
      if (post.payload.message) {
        // Convert newlines to <br> tags
        messageContent.innerHTML = post.payload.message.replace(/\n/g, "<br>");
      } else if (post.payload.type === "call" && post.payload.message) {
        messageContent.innerHTML = post.payload.message.replace(/\n/g, "<br>");
      }
    }

    envelope.appendChild(messageContent);

    // Attachments
    if (post.payload && post.payload.attachments && post.payload.attachments.length > 0) {
      const attachmentsContainer = document.createElement("div");
      attachmentsContainer.className = "envelope__attachments";
      attachmentsContainer.style.marginTop = "6px";

      post.payload.attachments.forEach((attachment) => {
        const attachmentEl = this.renderAttachment(attachment);
        attachmentsContainer.appendChild(attachmentEl);
      });

      envelope.appendChild(attachmentsContainer);
    }

    // Action buttons
    if (post.payload && post.payload.type === "answer") {
      const actionsContainer = document.createElement("div");
      actionsContainer.className = "envelope__actions";
      actionsContainer.style.marginTop = "6px";
      actionsContainer.style.display = "flex";
      actionsContainer.style.gap = "6px";

      const replyButton = document.createElement("button");
      replyButton.innerText = "Reply";
      replyButton.style.padding = "2px 6px";
      replyButton.style.backgroundColor = "transparent";
      replyButton.style.border = "1px solid #808080";
      replyButton.style.cursor = "pointer";
      replyButton.style.fontSize = "12px";

      const openButton = document.createElement("button");
      openButton.innerText = "Open in Window";
      openButton.style.padding = "2px 6px";
      openButton.style.backgroundColor = "#000000";
      openButton.style.color = "#ffffff";
      openButton.style.border = "none";
      openButton.style.cursor = "pointer";
      openButton.style.fontSize = "12px";

      openButton.addEventListener("click", () => {
        this.openInWindow(post);
      });

      actionsContainer.appendChild(replyButton);
      actionsContainer.appendChild(openButton);
      envelope.appendChild(actionsContainer);
    }

    return envelope;
  };

  /**
   * Renders an attachment in a message envelope
   * @param {Object} attachment - Attachment data
   * @param {string} attachment.type - Attachment type (image, file, code, chart, etc.)
   * @param {string} [attachment.url] - URL for the attachment content
   * @param {string} [attachment.content] - Text content for code attachments
   * @param {string} [attachment.caption] - Caption text
   * @param {string} [attachment.language] - Language for code attachments
   * @returns {HTMLElement} The rendered attachment element
   */
  LOOPCHAT.prototype.renderAttachment = function (attachment) {
    const attachmentEl = document.createElement("div");
    attachmentEl.className = "attachment";
    attachmentEl.style.marginTop = "4px";
    attachmentEl.style.padding = "6px";
    attachmentEl.style.border = "1px solid #e0e0e0";
    attachmentEl.style.backgroundColor = "#f8f8f8";

    // Attachment header with type indicator
    const attachmentHeader = document.createElement("div");
    attachmentHeader.style.display = "flex";
    attachmentHeader.style.alignItems = "center";
    attachmentHeader.style.marginBottom = "4px";

    // Attachment type icon
    const typeIcon = document.createElement("span");
    typeIcon.style.marginRight = "6px";
    typeIcon.style.fontWeight = "bold";

    // Set icon based on type
    switch (attachment.type) {
      case "image":
        typeIcon.innerText = "📷";
        break;
      case "file":
        typeIcon.innerText = "📄";
        break;
      case "code":
        typeIcon.innerText = "💻";
        break;
      case "chart":
        typeIcon.innerText = "📊";
        break;
      case "video":
        typeIcon.innerText = "🎬";
        break;
      case "audio":
        typeIcon.innerText = "🔊";
        break;
      default:
        typeIcon.innerText = "📎";
    }

    attachmentHeader.appendChild(typeIcon);

    // render attachment content based on type
    switch (attachment.type) {
      case "image":
        // Caption for image (if available)
        if (attachment.caption) {
          const captionEl = document.createElement("span");
          captionEl.style.fontSize = "12px";
          captionEl.innerText = attachment.caption;
          attachmentHeader.appendChild(captionEl);
        }

        attachmentEl.appendChild(attachmentHeader);

        const img = document.createElement("img");
        img.src = attachment.url;
        img.alt = attachment.caption || "Image attachment";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "150px";
        img.style.display = "block";

        attachmentEl.appendChild(img);
        break;

      case "code":
        // Language indicator
        if (attachment.language) {
          const langEl = document.createElement("span");
          langEl.style.fontSize = "12px";
          langEl.innerText = attachment.language;
          attachmentHeader.appendChild(langEl);
        }

        attachmentEl.appendChild(attachmentHeader);

        // Code content
        const codeEl = document.createElement("pre");
        codeEl.style.margin = "0";
        codeEl.style.padding = "6px";
        codeEl.style.backgroundColor = "#f0f0f0";
        codeEl.style.borderRadius = "2px";
        codeEl.style.overflow = "auto";
        codeEl.style.fontSize = "12px";
        codeEl.style.fontFamily = "monospace";
        codeEl.style.whiteSpace = "pre-wrap";
        codeEl.innerText = attachment.content || "";

        attachmentEl.appendChild(codeEl);

        // Caption
        if (attachment.caption) {
          const captionEl = document.createElement("div");
          captionEl.style.fontSize = "12px";
          captionEl.style.marginTop = "4px";
          captionEl.style.color = "#808080";
          captionEl.innerText = attachment.caption;
          attachmentEl.appendChild(captionEl);
        }
        break;

      case "file":
      case "chart":
        // Add caption to header
        if (attachment.caption) {
          const captionEl = document.createElement("span");
          captionEl.style.fontSize = "12px";
          captionEl.innerText = attachment.caption;
          attachmentHeader.appendChild(captionEl);
        }

        attachmentEl.appendChild(attachmentHeader);

        // Add link to file or chart
        if (attachment.url) {
          const linkEl = document.createElement("a");
          linkEl.href = attachment.url;
          linkEl.target = "_blank";
          linkEl.style.display = "block";
          linkEl.style.marginTop = "2px";
          linkEl.style.fontSize = "12px";
          linkEl.style.color = "#0066cc";
          linkEl.innerText = "View " + (attachment.type === "file" ? "file" : "chart");

          attachmentEl.appendChild(linkEl);

          // If it's a chart, try to display preview
          if (attachment.type === "chart" && attachment.url.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
            const imgEl = document.createElement("img");
            imgEl.src = attachment.url;
            imgEl.alt = attachment.caption || "Chart";
            imgEl.style.maxWidth = "100%";
            imgEl.style.maxHeight = "150px";
            imgEl.style.marginTop = "4px";

            attachmentEl.appendChild(imgEl);
          }
        }
        break;

      default:
        // Generic attachment display
        const typeEl = document.createElement("span");
        typeEl.style.fontSize = "12px";
        typeEl.innerText = `${attachment.type} attachment`;
        attachmentHeader.appendChild(typeEl);

        attachmentEl.appendChild(attachmentHeader);

        if (attachment.caption) {
          const captionEl = document.createElement("div");
          captionEl.style.fontSize = "12px";
          captionEl.style.marginTop = "4px";
          captionEl.innerText = attachment.caption;
          attachmentEl.appendChild(captionEl);
        }
    }

    return attachmentEl;
  };

  /**
   * Opens a message in a floating window on the desktop
   * @param {Object} post - Post data to display in the window
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.openInWindow = function (post) {
    const windowId = `window-${post.id}`;

    // Check if window already exists
    if (document.getElementById(windowId)) {
      this.windowFocus(windowId);
      return;
    }

    // render window
    const windowEl = document.createElement("div");
    windowEl.id = windowId;
    windowEl.className = "window";
    windowEl.style.position = "absolute";
    windowEl.style.width = "400px";
    windowEl.style.height = "300px";
    windowEl.style.top = `${40 + this.windows.length * 20}px`;
    windowEl.style.left = `${40 + this.windows.length * 20}px`;
    windowEl.style.display = "flex";
    windowEl.style.flexDirection = "column";
    windowEl.style.overflow = "hidden";
    windowEl.style.backgroundColor = "#ffffff";
    windowEl.style.border = "1px solid #000000";
    windowEl.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)";

    // Window header
    const windowHeader = document.createElement("div");
    windowHeader.className = "window__header";
    windowHeader.style.display = "flex";
    windowHeader.style.justifyContent = "space-between";
    windowHeader.style.alignItems = "center";
    windowHeader.style.padding = "4px 6px";
    windowHeader.style.backgroundColor = "#000000";
    windowHeader.style.color = "#ffffff";
    windowHeader.style.cursor = "move";
    windowHeader.style.userSelect = "none";

    // Get author name for window title
    let authorName = post.author;
    if (this.users && this.users[post.author]) {
      authorName = this.users[post.author].name;
    } else if (this.agents && this.agents[post.author]) {
      authorName = this.agents[post.author].name;
    }

    const windowTitle = document.createElement("div");
    windowTitle.innerText = `Message from ${authorName}`;
    windowTitle.style.fontSize = "11px";
    windowTitle.style.fontWeight = "bold";

    const windowControls = document.createElement("div");
    windowControls.style.display = "flex";
    windowControls.style.gap = "6px";

    const minimizeButton = document.createElement("button");
    minimizeButton.innerHTML = "&#8211;";
    minimizeButton.style.background = "none";
    minimizeButton.style.border = "none";
    minimizeButton.style.color = "#ffffff";
    minimizeButton.style.cursor = "pointer";
    minimizeButton.style.fontSize = "12px";
    minimizeButton.style.padding = "0 4px";
    minimizeButton.addEventListener("click", () => {
      this.windowMinimize(windowId);
    });

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&#10005;";
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.color = "#ffffff";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "12px";
    closeButton.style.padding = "0 4px";
    closeButton.addEventListener("click", () => {
      this.windowClose(windowId);
    });

    windowControls.appendChild(minimizeButton);
    windowControls.appendChild(closeButton);

    windowHeader.appendChild(windowTitle);
    windowHeader.appendChild(windowControls);
    windowEl.appendChild(windowHeader);

    // Window content
    const windowContent = document.createElement("div");
    windowContent.className = "window__content";
    windowContent.style.flex = "1";
    windowContent.style.padding = "8px";
    windowContent.style.overflow = "auto";

    // Add message content
    const messageContent = document.createElement("div");
    messageContent.style.marginBottom = "8px";

    if (post.payload && post.payload.message) {
      messageContent.innerHTML = post.payload.message.replace(/\n/g, "<br>");
    }

    windowContent.appendChild(messageContent);

    // Add attachments if any
    if (post.payload && post.payload.attachments && post.payload.attachments.length > 0) {
      const attachmentsContainer = document.createElement("div");
      attachmentsContainer.style.marginTop = "8px";

      post.payload.attachments.forEach((attachment) => {
        const attachmentEl = this.renderAttachment(attachment);
        attachmentsContainer.appendChild(attachmentEl);
      });

      windowContent.appendChild(attachmentsContainer);
    }

    windowEl.appendChild(windowContent);

    // Make window draggable
    this.makeWindowDraggable(windowEl, windowHeader);

    // Add to DOM
    document.getElementById("windows__container").appendChild(windowEl);

    // Add to windows array
    this.windows.push({
      id: windowId,
      post: post,
      minimized: false,
    });

    return this;
  };
})(window.LoopChat);
