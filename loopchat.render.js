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

    toolbar.appendChild(title);

    // Spacer to push the dropdown to the right
    const spacer = document.createElement("div");
    spacer.style.flex = "1";
    toolbar.appendChild(spacer);

    // Window management dropdown container
    const dropdownContainer = document.createElement("div");
    dropdownContainer.style.position = "relative";

    // Dropdown toggle button with hamburger icon
    const dropdownToggle = document.createElement("button");
    dropdownToggle.innerHTML = "&#9776;"; // Hamburger menu icon
    dropdownToggle.style.padding = "2px 8px";
    dropdownToggle.style.backgroundColor = "transparent";
    dropdownToggle.style.color = "#ffffff";
    dropdownToggle.style.border = "0";
    dropdownToggle.style.borderRadius = "3px";
    dropdownToggle.style.cursor = "pointer";
    dropdownToggle.style.fontSize = "14px"; // Slightly larger font for the icon

    // Dropdown menu
    const dropdownMenu = document.createElement("div");
    dropdownMenu.style.position = "absolute";
    dropdownMenu.style.top = "100%";
    dropdownMenu.style.right = "0";
    dropdownMenu.style.backgroundColor = "#ffffff";
    dropdownMenu.style.border = "1px solid #000000";
    dropdownMenu.style.borderRadius = "3px";
    dropdownMenu.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    dropdownMenu.style.display = "none";
    dropdownMenu.style.zIndex = "9999";
    dropdownMenu.style.minWidth = "150px";

    // Show all windows option
    const showAllOption = document.createElement("div");
    showAllOption.innerText = "Show All Windows";
    showAllOption.style.padding = "6px 10px";
    showAllOption.style.cursor = "pointer";
    showAllOption.style.color = "#000000";
    showAllOption.style.fontSize = "11px";
    showAllOption.style.borderBottom = "1px solid #e0e0e0";

    showAllOption.addEventListener("mouseover", () => {
      showAllOption.style.backgroundColor = "#f0f0f0";
    });

    showAllOption.addEventListener("mouseout", () => {
      showAllOption.style.backgroundColor = "transparent";
    });

    showAllOption.addEventListener("click", () => {
      // Hide dropdown
      dropdownMenu.style.display = "none";

      // Find all minimized windows and restore them
      this.windows.forEach((window) => {
        if (window.minimized) {
          this.windowRestore(window.id);
        }
      });
    });

    // Cascade windows option
    const cascadeOption = document.createElement("div");
    cascadeOption.innerText = "Cascade Windows";
    cascadeOption.style.padding = "6px 10px";
    cascadeOption.style.cursor = "pointer";
    cascadeOption.style.color = "#000000";
    cascadeOption.style.fontSize = "11px";

    cascadeOption.addEventListener("mouseover", () => {
      cascadeOption.style.backgroundColor = "#f0f0f0";
    });

    cascadeOption.addEventListener("mouseout", () => {
      cascadeOption.style.backgroundColor = "transparent";
    });

    cascadeOption.addEventListener("click", () => {
      // Hide dropdown
      dropdownMenu.style.display = "none";

      // Arrange all visible windows in a cascade pattern
      let offsetX = 20;
      let offsetY = 40; // Below toolbar

      this.windows.forEach((window) => {
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

    // Minimize all windows option
    const minimizeAllOption = document.createElement("div");
    minimizeAllOption.innerText = "Minimize All Windows";
    minimizeAllOption.style.padding = "6px 10px";
    minimizeAllOption.style.cursor = "pointer";
    minimizeAllOption.style.color = "#000000";
    minimizeAllOption.style.fontSize = "11px";
    minimizeAllOption.style.borderBottom = "1px solid #e0e0e0";

    minimizeAllOption.addEventListener("mouseover", () => {
      minimizeAllOption.style.backgroundColor = "#f0f0f0";
    });

    minimizeAllOption.addEventListener("mouseout", () => {
      minimizeAllOption.style.backgroundColor = "transparent";
    });

    minimizeAllOption.addEventListener("click", () => {
      // Hide dropdown
      dropdownMenu.style.display = "none";

      // Minimize all non-minimized windows
      this.windows.forEach((window) => {
        if (!window.minimized) {
          this.windowMinimize(window.id);
        }
      });
    });

    // Add options to dropdown menu
    dropdownMenu.appendChild(showAllOption);
    dropdownMenu.appendChild(minimizeAllOption);
    dropdownMenu.appendChild(cascadeOption);

    // Toggle dropdown visibility
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click from reaching document
      if (dropdownMenu.style.display === "none") {
        dropdownMenu.style.display = "block";
      } else {
        dropdownMenu.style.display = "none";
      }
    });

    // Close dropdown when clicking elsewhere
    document.addEventListener("click", () => {
      dropdownMenu.style.display = "none";
    });

    // Add dropdown elements to container
    dropdownContainer.appendChild(dropdownToggle);
    dropdownContainer.appendChild(dropdownMenu);

    // Add dropdown to toolbar
    toolbar.appendChild(dropdownContainer);

    // Adjust desktop height to account for toolbar
    desktop.style.paddingTop = "30px";

    this.root.appendChild(toolbar);
    this.root.appendChild(desktop);

    return this;
  };

  /**
   * Renders the combined channels and agents panel as a window with accordions
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.renderChannelsWindow = function () {
    console.log("Rendering directory window with channels, agents, and users");
    console.log("Agents data:", this.agents);
    console.log("Users data:", this.users);
    // Create a window for the navigation sidebar
    const sidebarWindow = document.createElement("div");
    sidebarWindow.id = "window-sidebar";
    sidebarWindow.className = "window";
    sidebarWindow.style.position = "absolute";
    sidebarWindow.style.width = "250px";
    sidebarWindow.style.height = "500px";
    sidebarWindow.style.top = "40px";
    sidebarWindow.style.left = "20px";
    sidebarWindow.style.display = "flex";
    sidebarWindow.style.flexDirection = "column";
    sidebarWindow.style.overflow = "hidden";
    sidebarWindow.style.backgroundColor = "#ffffff";
    sidebarWindow.style.border = "1px solid #000000";
    sidebarWindow.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)";
    sidebarWindow.style.zIndex = "10";

    // Add click handler to focus this window when clicked anywhere
    sidebarWindow.addEventListener("mousedown", () => {
      this.windowFocus("window-sidebar");
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
    windowTitle.innerText = "Directory";
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
      this.windowMinimize("window-sidebar");
    });

    // Only add the minimize button (no close button)
    windowControls.appendChild(minimizeButton);

    windowHeader.appendChild(windowTitle);
    windowHeader.appendChild(windowControls);
    sidebarWindow.appendChild(windowHeader);

    // Window content
    const windowContent = document.createElement("div");
    windowContent.className = "window__content";
    windowContent.style.flex = "1";
    windowContent.style.overflow = "auto";
    windowContent.style.backgroundColor = "#f0f0f0";

    // Create accordion container
    const accordion = document.createElement("div");
    accordion.className = "accordion";
    accordion.style.display = "flex";
    accordion.style.flexDirection = "column";
    accordion.style.width = "100%";

    // ========== CHANNELS SECTION ==========
    // Channels accordion header
    const channelsHeader = document.createElement("div");
    channelsHeader.className = "accordion__header";
    channelsHeader.style.padding = "8px 10px";
    channelsHeader.style.backgroundColor = "#222222";
    channelsHeader.style.color = "#ffffff";
    channelsHeader.style.fontWeight = "bold";
    channelsHeader.style.fontSize = "12px";
    channelsHeader.style.cursor = "pointer";
    channelsHeader.style.display = "flex";
    channelsHeader.style.justifyContent = "space-between";
    channelsHeader.style.alignItems = "center";
    channelsHeader.style.userSelect = "none";
    channelsHeader.style.borderBottom = "1px solid #000000";

    const channelsTitle = document.createElement("span");
    channelsTitle.innerText = "Channels";

    const channelsToggle = document.createElement("span");
    channelsToggle.innerHTML = "&#9660;"; // Down arrow
    channelsToggle.style.fontSize = "10px";
    channelsToggle.style.transition = "transform 0.2s";

    channelsHeader.appendChild(channelsTitle);
    channelsHeader.appendChild(channelsToggle);

    // Channels content
    const channelsContent = document.createElement("div");
    channelsContent.className = "accordion__content";
    channelsContent.style.display = "flex";
    channelsContent.style.flexDirection = "column";
    channelsContent.style.overflow = "hidden";
    channelsContent.style.maxHeight = "1000px"; // Start expanded
    channelsContent.style.transition = "max-height 0.3s ease-in-out";
    channelsContent.style.backgroundColor = "#f0f0f0";

    // Channel tabs
    const channelTabs = document.createElement("div");
    channelTabs.id = "channels__tabs";
    channelTabs.style.display = "flex";
    channelTabs.style.flexDirection = "column";
    channelTabs.style.overflow = "auto";

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

    // Toggle channels section
    channelsHeader.addEventListener("click", () => {
      if (channelsContent.style.maxHeight !== "0px") {
        channelsContent.style.maxHeight = "0px";
        channelsToggle.innerHTML = "&#9654;"; // Right arrow
        channelsToggle.style.transform = "rotate(0deg)";
      } else {
        channelsContent.style.maxHeight = "1000px";
        channelsToggle.innerHTML = "&#9660;"; // Down arrow
        channelsToggle.style.transform = "rotate(0deg)";
      }
    });

    channelsContent.appendChild(channelTabs);

    // ========== AI AGENTS SECTION ==========
    // Agents accordion header
    const agentsHeader = document.createElement("div");
    agentsHeader.className = "accordion__header";
    agentsHeader.style.padding = "8px 10px";
    agentsHeader.style.backgroundColor = "#222222";
    agentsHeader.style.color = "#ffffff";
    agentsHeader.style.fontWeight = "bold";
    agentsHeader.style.fontSize = "12px";
    agentsHeader.style.cursor = "pointer";
    agentsHeader.style.display = "flex";
    agentsHeader.style.justifyContent = "space-between";
    agentsHeader.style.alignItems = "center";
    agentsHeader.style.userSelect = "none";
    agentsHeader.style.borderBottom = "1px solid #000000";

    const agentsTitle = document.createElement("span");
    agentsTitle.innerText = "Agents";

    const agentsToggle = document.createElement("span");
    agentsToggle.innerHTML = "&#9660;"; // Down arrow
    agentsToggle.style.fontSize = "10px";
    agentsToggle.style.transition = "transform 0.2s";

    agentsHeader.appendChild(agentsTitle);
    agentsHeader.appendChild(agentsToggle);

    // Agents content
    const agentsContent = document.createElement("div");
    agentsContent.className = "accordion__content";
    agentsContent.style.display = "flex";
    agentsContent.style.flexDirection = "column";
    agentsContent.style.overflow = "hidden";
    agentsContent.style.maxHeight = "1000px"; // Start expanded
    agentsContent.style.transition = "max-height 0.3s ease-in-out";
    agentsContent.style.backgroundColor = "#f0f0f0";

    // Render AI agents
    let hasAgents = false;
    if (this.agents && typeof this.agents === "object") {
      const agentKeys = Object.keys(this.agents);
      console.log("Rendering agent items, found keys:", agentKeys);

      if (agentKeys.length > 0) {
        agentKeys.forEach((agentId) => {
          const agent = this.agents[agentId];
          console.log("Rendering agent:", agent);
          const agentItem = this.renderAgentItem(agent, true);
          agentsContent.appendChild(agentItem);
          hasAgents = true;
        });
      }
    }

    // If no agents, show message
    if (!hasAgents) {
      const noAgents = document.createElement("div");
      noAgents.style.padding = "8px";
      noAgents.style.textAlign = "center";
      noAgents.style.color = "#808080";
      noAgents.style.fontSize = "11px";
      noAgents.innerText = "No AI agents available";
      agentsContent.appendChild(noAgents);
    }

    // Toggle AI agents section
    agentsHeader.addEventListener("click", () => {
      if (agentsContent.style.maxHeight !== "0px") {
        agentsContent.style.maxHeight = "0px";
        agentsToggle.innerHTML = "&#9654;"; // Right arrow
        agentsToggle.style.transform = "rotate(0deg)";
      } else {
        agentsContent.style.maxHeight = "1000px";
        agentsToggle.innerHTML = "&#9660;"; // Down arrow
        agentsToggle.style.transform = "rotate(0deg)";
      }
    });

    // ========== PEOPLE SECTION ==========
    // People accordion header
    const peopleHeader = document.createElement("div");
    peopleHeader.className = "accordion__header";
    peopleHeader.style.padding = "8px 10px";
    peopleHeader.style.backgroundColor = "#222222";
    peopleHeader.style.color = "#ffffff";
    peopleHeader.style.fontWeight = "bold";
    peopleHeader.style.fontSize = "12px";
    peopleHeader.style.cursor = "pointer";
    peopleHeader.style.display = "flex";
    peopleHeader.style.justifyContent = "space-between";
    peopleHeader.style.alignItems = "center";
    peopleHeader.style.userSelect = "none";
    peopleHeader.style.borderBottom = "1px solid #000000";

    const peopleTitle = document.createElement("span");
    peopleTitle.innerText = "People";

    const peopleToggle = document.createElement("span");
    peopleToggle.innerHTML = "&#9660;"; // Down arrow
    peopleToggle.style.fontSize = "10px";
    peopleToggle.style.transition = "transform 0.2s";

    peopleHeader.appendChild(peopleTitle);
    peopleHeader.appendChild(peopleToggle);

    // People content
    const peopleContent = document.createElement("div");
    peopleContent.className = "accordion__content";
    peopleContent.style.display = "flex";
    peopleContent.style.flexDirection = "column";
    peopleContent.style.overflow = "hidden";
    peopleContent.style.maxHeight = "1000px"; // Start expanded
    peopleContent.style.transition = "max-height 0.3s ease-in-out";
    peopleContent.style.backgroundColor = "#f0f0f0";

    // Render users
    let hasUsers = false;
    if (this.users && typeof this.users === "object") {
      const userKeys = Object.keys(this.users);
      console.log("Rendering user items, found keys:", userKeys);

      if (userKeys.length > 0) {
        userKeys.forEach((userId) => {
          const user = this.users[userId];
          console.log("Rendering user:", user);
          const userItem = this.renderAgentItem(user, false);
          peopleContent.appendChild(userItem);
          hasUsers = true;
        });
      }
    }

    // If no users, show message
    if (!hasUsers) {
      const noUsers = document.createElement("div");
      noUsers.style.padding = "8px";
      noUsers.style.textAlign = "center";
      noUsers.style.color = "#808080";
      noUsers.style.fontSize = "11px";
      noUsers.innerText = "No users available";
      peopleContent.appendChild(noUsers);
    }

    // Toggle people section
    peopleHeader.addEventListener("click", () => {
      if (peopleContent.style.maxHeight !== "0px") {
        peopleContent.style.maxHeight = "0px";
        peopleToggle.innerHTML = "&#9654;"; // Right arrow
        peopleToggle.style.transform = "rotate(0deg)";
      } else {
        peopleContent.style.maxHeight = "1000px";
        peopleToggle.innerHTML = "&#9660;"; // Down arrow
        peopleToggle.style.transform = "rotate(0deg)";
      }
    });

    // Assemble the accordion
    accordion.appendChild(channelsHeader);
    accordion.appendChild(channelsContent);
    accordion.appendChild(agentsHeader);
    accordion.appendChild(agentsContent);
    accordion.appendChild(peopleHeader);
    accordion.appendChild(peopleContent);

    windowContent.appendChild(accordion);
    sidebarWindow.appendChild(windowContent);

    // Make window draggable
    this.makeWindowDraggable(sidebarWindow, windowHeader);

    // Add to DOM
    document.getElementById("desktop").appendChild(sidebarWindow);

    // Add to windows array
    this.windows.push({
      id: "window-sidebar",
      type: "sidebar",
      minimized: false,
    });

    return this;
  };

  /**
   * Renders the agents panel as a window
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.renderAgentsWindow = function () {
    console.log("Rendering agents window with agents:", this.agents, "and users:", this.users);
    // Create a window for agents
    const agentsWindow = document.createElement("div");
    agentsWindow.id = "window-agents";
    agentsWindow.className = "window";
    agentsWindow.style.position = "absolute";
    agentsWindow.style.width = "220px";
    agentsWindow.style.height = "300px";
    agentsWindow.style.top = "40px";
    agentsWindow.style.right = "20px";
    agentsWindow.style.display = "flex";
    agentsWindow.style.flexDirection = "column";
    agentsWindow.style.overflow = "hidden";
    agentsWindow.style.backgroundColor = "#ffffff";
    agentsWindow.style.border = "1px solid #000000";
    agentsWindow.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)";
    agentsWindow.style.zIndex = "10";

    // Add click handler to focus this window when clicked anywhere
    agentsWindow.addEventListener("mousedown", () => {
      this.windowFocus("window-agents");
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
    windowTitle.innerText = "Agents & Users";
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
      this.windowMinimize("window-agents");
    });

    // Only add the minimize button (no close button)
    windowControls.appendChild(minimizeButton);

    windowHeader.appendChild(windowTitle);
    windowHeader.appendChild(windowControls);
    agentsWindow.appendChild(windowHeader);

    // Window content
    const windowContent = document.createElement("div");
    windowContent.className = "window__content";
    windowContent.style.flex = "1";
    windowContent.style.overflow = "auto";
    windowContent.style.backgroundColor = "#f0f0f0";

    // Agents list container
    const agentsList = document.createElement("div");
    agentsList.id = "agents__list";
    agentsList.style.display = "flex";
    agentsList.style.flexDirection = "column";
    agentsList.style.overflow = "hidden";
    agentsList.style.height = "100%";

    // Agents items
    const agentsItems = document.createElement("div");
    agentsItems.id = "agents__items";
    agentsItems.style.display = "flex";
    agentsItems.style.flexDirection = "column";
    agentsItems.style.overflow = "auto";
    agentsItems.style.flex = "1";

    // Section header for Agents
    const agentHeader = document.createElement("div");
    agentHeader.style.padding = "6px 8px";
    agentHeader.style.backgroundColor = "#e0e0e0";
    agentHeader.style.fontWeight = "bold";
    agentHeader.style.fontSize = "11px";
    agentHeader.style.borderBottom = "1px solid #c0c0c0";
    agentHeader.innerText = "Agents";
    agentsItems.appendChild(agentHeader);

    // Render AI agents first
    let hasAgents = false;
    if (this.agents && Object.keys(this.agents).length > 0) {
      console.log("Rendering agent items from data:", this.agents);
      Object.values(this.agents).forEach((agent) => {
        const agentItem = this.renderAgentItem(agent, true);
        agentsItems.appendChild(agentItem);
      });
      hasAgents = true;
    }

    // If no agents, show message in the agents section
    if (!hasAgents) {
      const noAgents = document.createElement("div");
      noAgents.style.padding = "8px";
      noAgents.style.textAlign = "center";
      noAgents.style.color = "#808080";
      noAgents.style.fontSize = "11px";
      noAgents.innerText = "No AI agents available";
      agentsItems.appendChild(noAgents);
    }

    // Section header for People/Users
    const userHeader = document.createElement("div");
    userHeader.style.padding = "6px 8px";
    userHeader.style.backgroundColor = "#e0e0e0";
    userHeader.style.fontWeight = "bold";
    userHeader.style.fontSize = "11px";
    userHeader.style.borderBottom = "1px solid #c0c0c0";
    userHeader.style.marginTop = "8px";
    userHeader.innerText = "People";
    agentsItems.appendChild(userHeader);

    // Render human users
    let hasUsers = false;
    if (this.users && Object.keys(this.users).length > 0) {
      console.log("Rendering user items from data:", this.users);
      Object.values(this.users).forEach((user) => {
        const userItem = this.renderAgentItem(user, false);
        agentsItems.appendChild(userItem);
      });
      hasUsers = true;
    }

    // If no users, show message in the users section
    if (!hasUsers) {
      const noUsers = document.createElement("div");
      noUsers.style.padding = "8px";
      noUsers.style.textAlign = "center";
      noUsers.style.color = "#808080";
      noUsers.style.fontSize = "11px";
      noUsers.innerText = "No users available";
      agentsItems.appendChild(noUsers);
    }

    agentsList.appendChild(agentsItems);
    windowContent.appendChild(agentsList);
    agentsWindow.appendChild(windowContent);

    // Make window draggable
    this.makeWindowDraggable(agentsWindow, windowHeader);

    // Add to DOM
    document.getElementById("desktop").appendChild(agentsWindow);

    // Add to windows array
    this.windows.push({
      id: "window-agents",
      type: "agents",
      minimized: false,
    });

    return this;
  };

  /**
   * Renders a single agent or user item in the agents panel
   * @param {Object} agent - Agent or user data
   * @param {string} agent.id - Agent/user ID
   * @param {string} agent.name - Agent/user name
   * @param {string} [agent.avatar] - Agent/user avatar
   * @param {string} [agent.description] - Agent description
   * @param {string} [agent.role] - User role
   * @param {boolean} isAgent - Whether this is an AI agent (true) or human user (false)
   * @returns {HTMLElement} The rendered agent/user item element
   */
  LOOPCHAT.prototype.renderAgentItem = function (agent, isAgent) {
    const item = document.createElement("div");
    item.id = `agent__item-${agent.id}`;
    item.className = "agent__item";
    item.style.padding = "8px";
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.borderBottom = "1px solid #e0e0e0";
    item.style.transition = "background-color 0.1s";
    item.style.cursor = "pointer";

    // Hover effect
    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "#e0e0e0";
    });

    item.addEventListener("mouseout", () => {
      item.style.backgroundColor = "transparent";
    });

    // Avatar element
    const avatarEl = document.createElement("div");
    avatarEl.className = "avatar";
    avatarEl.style.width = "24px";
    avatarEl.style.height = "24px";
    avatarEl.style.borderRadius = isAgent ? "2px" : "50%"; // Square for agents, circle for users
    avatarEl.style.backgroundColor = isAgent ? "#000000" : "#4A6DA7"; // Black for agents, blue for users
    avatarEl.style.color = "#ffffff";
    avatarEl.style.display = "flex";
    avatarEl.style.justifyContent = "center";
    avatarEl.style.alignItems = "center";
    avatarEl.style.marginRight = "8px";
    avatarEl.style.fontWeight = "bold";
    avatarEl.style.fontSize = "12px";
    avatarEl.style.overflow = "hidden";

    // Check if avatar is a URL or a character
    if (agent.avatar && agent.avatar.startsWith && agent.avatar.startsWith("http")) {
      avatarEl.style.backgroundImage = `url(${agent.avatar})`;
      avatarEl.style.backgroundSize = "cover";
      avatarEl.style.backgroundPosition = "center";
    } else {
      avatarEl.innerText = agent.avatar || agent.name.charAt(0).toUpperCase();
    }

    // Agent info container
    const agentInfo = document.createElement("div");
    agentInfo.style.flex = "1";

    // Agent name
    const agentName = document.createElement("div");
    agentName.style.fontWeight = "bold";
    agentName.style.fontSize = "12px";
    agentName.innerText = agent.name;
    agentInfo.appendChild(agentName);

    // Agent description or user role (if available)
    if (agent.description || agent.role) {
      const agentDesc = document.createElement("div");
      agentDesc.style.fontSize = "10px";
      agentDesc.style.color = "#808080";
      agentDesc.style.marginTop = "2px";
      agentDesc.innerText = isAgent ? agent.description : agent.role;
      agentInfo.appendChild(agentDesc);
    }

    item.appendChild(avatarEl);
    item.appendChild(agentInfo);

    return item;
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

    // When a channel tab is clicked, open its window
    tab.addEventListener("click", () => {
      console.log("Channel tab clicked:", channel.id);
      // Open or focus the channel's window
      this.openChannelWindow(channel.id);
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
   * Opens a window for a specific channel
   * @param {string} channelId - ID of the channel to open
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.openChannelWindow = function (channelId) {
    // Check if window for this channel already exists
    const channelWindowId = `window-channel-${channelId}`;
    let existingWindow = document.getElementById(channelWindowId);

    if (existingWindow) {
      // If the window exists but is minimized, restore it
      const windowIndex = this.windows.findIndex((w) => w.id === channelWindowId);
      if (windowIndex !== -1 && this.windows[windowIndex].minimized) {
        this.windowRestore(channelWindowId);
      }

      // Focus the existing window
      this.windowFocus(channelWindowId);
      return this;
    }

    // Find the channel data
    const channel = this.channels.find((c) => c.id === channelId);
    if (!channel) {
      console.error("Channel not found:", channelId);
      return this;
    }

    // Create a window for this channel
    const channelWindow = document.createElement("div");
    channelWindow.id = channelWindowId;
    channelWindow.className = "window";
    channelWindow.style.position = "absolute";
    channelWindow.style.width = "500px";
    channelWindow.style.height = "400px";

    // Calculate position (stagger windows)
    const openWindows = this.windows.filter((w) => w.id.startsWith("window-channel-") && !w.minimized).length;

    channelWindow.style.top = `${40 + openWindows * 20}px`;
    channelWindow.style.left = `${260 + openWindows * 20}px`;

    channelWindow.style.display = "flex";
    channelWindow.style.flexDirection = "column";
    channelWindow.style.overflow = "hidden";
    channelWindow.style.backgroundColor = "#ffffff";
    channelWindow.style.border = "1px solid #000000";
    channelWindow.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)";
    channelWindow.style.zIndex = "15"; // Higher than channels window by default

    // Add click handler to focus this window when clicked anywhere
    channelWindow.addEventListener("mousedown", () => {
      this.windowFocus(channelWindowId);
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
    windowTitle.innerText = `# ${channel.title || channel.id}`;
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
      this.windowMinimize(channelWindowId);
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
      this.windowClose(channelWindowId);
    });

    windowControls.appendChild(minimizeButton);
    windowControls.appendChild(closeButton);

    windowHeader.appendChild(windowTitle);
    windowHeader.appendChild(windowControls);
    channelWindow.appendChild(windowHeader);

    // Window content
    const windowContent = document.createElement("div");
    windowContent.className = "window__content";
    windowContent.style.flex = "1";
    windowContent.style.overflow = "auto";
    windowContent.style.padding = "8px";

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

    windowContent.appendChild(channelInfoBanner);

    // Messages container
    const messagesContainer = document.createElement("div");
    messagesContainer.id = `messages-${channelId}`;
    messagesContainer.style.display = "flex";
    messagesContainer.style.flexDirection = "column";

    // Render messages
    if (channel.posts && channel.posts.length > 0) {
      channel.posts.forEach((post) => {
        const envelope = this.renderEnvelope(post);
        messagesContainer.appendChild(envelope);
      });

      // Scroll to bottom to show latest messages
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 0);
    } else {
      const emptyMessage = document.createElement("div");
      emptyMessage.style.textAlign = "center";
      emptyMessage.style.padding = "12px";
      emptyMessage.style.color = "#808080";
      emptyMessage.innerText = "No messages yet";
      messagesContainer.appendChild(emptyMessage);
    }

    windowContent.appendChild(messagesContainer);
    channelWindow.appendChild(windowContent);

    // Make window draggable
    this.makeWindowDraggable(channelWindow, windowHeader);

    // Add to DOM
    document.getElementById("desktop").appendChild(channelWindow);

    // Add to windows array
    this.windows.push({
      id: channelWindowId,
      type: "channel",
      channelId: channelId,
      minimized: false,
    });

    // Update active channel
    this.activeChannel = channelId;

    // Update the channel tabs highlighting
    this.updateChannelTabs();

    return this;
  };

  /**
   * Updates the channel window content for a specific channel
   * @param {string} channelId - ID of the channel to update
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.updateChannelWindow = function (channelId) {
    const windowId = `window-channel-${channelId}`;
    const messagesContainer = document.getElementById(`messages-${channelId}`);

    if (!messagesContainer) {
      // Window doesn't exist, create it
      return this.openChannelWindow(channelId);
    }

    // Clear existing content
    messagesContainer.innerHTML = "";

    // Find the channel data
    const channel = this.channels.find((c) => c.id === channelId);
    if (!channel) {
      console.error("Channel not found:", channelId);
      messagesContainer.innerHTML = `<div style="padding: 10px;">Channel ID ${channelId} not found</div>`;
      return this;
    }

    // Render messages
    if (channel.posts && channel.posts.length > 0) {
      channel.posts.forEach((post) => {
        const envelope = this.renderEnvelope(post);
        messagesContainer.appendChild(envelope);
      });

      // Scroll to bottom to show latest messages
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 0);
    } else {
      const emptyMessage = document.createElement("div");
      emptyMessage.style.textAlign = "center";
      emptyMessage.style.padding = "12px";
      emptyMessage.style.color = "#808080";
      emptyMessage.innerText = "No messages yet";
      messagesContainer.appendChild(emptyMessage);
    }

    // Ensure the window is visible and in focus
    const windowEl = document.getElementById(windowId);
    if (windowEl) {
      const windowIndex = this.windows.findIndex((w) => w.id === windowId);
      if (windowIndex !== -1 && this.windows[windowIndex].minimized) {
        this.windowRestore(windowId);
      }
      this.windowFocus(windowId);
    }

    return this;
  };

  /**
   * Updates channel tabs to reflect the active channel
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.updateChannelTabs = function () {
    // Update UI to reflect the active channel in the channels window
    const tabs = document.querySelectorAll(".channel__tab");
    if (!tabs.length) return this;

    tabs.forEach((tab) => {
      const tabEl = /** @type {HTMLElement} */ (tab);
      const tabChannelId = tabEl.dataset.channelId;
      const tabId = tabEl.id;

      // Match by either the data attribute or by the ID with prefix
      if (tabChannelId === this.activeChannel || tabId === `channel__tab-${this.activeChannel}`) {
        tabEl.style.backgroundColor = "#e0e0e0";
        tabEl.style.borderLeft = "2px solid #000000";
      } else {
        tabEl.style.backgroundColor = "transparent";
        tabEl.style.borderLeft = "2px solid transparent";
      }
    });

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
   * @param {Object} post.envelope - Message envelope
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

    if (post.envelope) {
      if (post.envelope.message) {
        // Convert newlines to <br> tags
        messageContent.innerHTML = post.envelope.message.replace(/\n/g, "<br>");
      } else if (post.envelope.type === "call" && post.envelope.message) {
        messageContent.innerHTML = post.envelope.message.replace(/\n/g, "<br>");
      }
    }

    envelope.appendChild(messageContent);

    // Attachments
    if (post.envelope && post.envelope.attachments && post.envelope.attachments.length > 0) {
      const attachmentsContainer = document.createElement("div");
      attachmentsContainer.className = "envelope__attachments";
      attachmentsContainer.style.marginTop = "6px";

      post.envelope.attachments.forEach((attachment) => {
        const attachmentEl = this.renderAttachment(attachment);
        attachmentsContainer.appendChild(attachmentEl);
      });

      envelope.appendChild(attachmentsContainer);
    }

    // Action buttons
    if (post.envelope && post.envelope.type === "answer") {
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

    if (post.envelope && post.envelope.message) {
      messageContent.innerHTML = post.envelope.message.replace(/\n/g, "<br>");
    }

    windowContent.appendChild(messageContent);

    // Add attachments if any
    if (post.envelope && post.envelope.attachments && post.envelope.attachments.length > 0) {
      const attachmentsContainer = document.createElement("div");
      attachmentsContainer.style.marginTop = "8px";

      post.envelope.attachments.forEach((attachment) => {
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
