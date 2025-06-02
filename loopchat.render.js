((LOOPCHAT) => {
  /**
   * Renders the root element of the application
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.renderRoot = function () {
    // Define applyStyles helper if it doesn't exist
    if (typeof this.applyStyles !== "function") {
      this.applyStyles = function (element, styles) {
        if (!element || !styles) return element;

        Object.keys(styles).forEach((key) => {
          element.style[key] = styles[key];
        });

        return element;
      };
    }

    // Ensure design is loaded, if not, use fallback values
    if (!this.design) {
      console.warn("Design system not loaded, using fallback values");
      this.design = {
        typography: {
          fontFamily: { primary: "monospace" },
          fontSize: { base: "12px" },
        },
        colors: {
          ui: { background: "#f5f6fa" },
          text: { primary: "#000000", inverted: "#ffffff" },
          primary: { main: "#000000", light: "#222222" },
        },
        spacing: {
          xxs: "2px",
          xs: "4px",
          sm: "6px",
          md: "8px",
          lg: "12px",
          xl: "16px",
          xxl: "20px",
          xxxl: "24px",
        },
        borders: { radius: { sm: "3px" }, width: { thin: "1px" } },
        shadows: { md: "0 2px 5px rgba(0,0,0,0.2)" },
        zIndex: { toolbar: "50", dropdown: "9999" },
        components: {
          toolbar: { height: "30px", background: "#000000", color: "#ffffff" },
        },
      };
    }

    // Apply design tokens to root element
    this.applyStyles(this.root, {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      fontFamily: this.design.typography.fontFamily.primary,
      fontSize: this.design.typography.fontSize.base,
      backgroundColor: this.design.colors.ui.background,
      color: this.design.colors.text.primary,
    });

    // Create a desktop container for all windows
    const desktop = document.createElement("div");
    desktop.id = "desktop";
    this.applyStyles(desktop, {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    });

    // Create a toolbar at the top
    const toolbar = document.createElement("div");
    toolbar.id = "desktop__toolbar";
    this.applyStyles(toolbar, {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      height: this.design.components.toolbar.height,
      backgroundColor: this.design.components.toolbar.background,
      color: this.design.components.toolbar.color,
      display: "flex",
      alignItems: "center",
      padding: `0 ${this.design.spacing.lg}`,
      zIndex: this.design.zIndex.toolbar,
    });

    // App title
    const title = document.createElement("div");
    title.innerText = "LOOPCHAT";
    this.applyStyles(title, {
      fontWeight: this.design.typography.fontWeight.bold,
      fontSize: this.design.typography.fontSize.base,
      marginRight: this.design.spacing.xxl,
    });

    toolbar.appendChild(title);

    // Spacer to push the dropdown to the right
    const spacer = document.createElement("div");
    spacer.style.flex = "1";
    toolbar.appendChild(spacer);

    // Combined window management dropdown container
    const dropdownContainer = document.createElement("div");
    dropdownContainer.id = "main-menu-dropdown";
    dropdownContainer.style.position = "relative";

    // Dropdown toggle button with hamburger icon
    const dropdownToggle = document.createElement("button");
    dropdownToggle.id = "main-menu-toggle";
    dropdownToggle.innerHTML = "&#9776;"; // Hamburger menu icon
    this.applyStyles(dropdownToggle, {
      padding: `${this.design.spacing.xxs} ${this.design.spacing.md}`,
      backgroundColor: "transparent",
      color: this.design.colors.text.inverted,
      border: "0",
      borderRadius: this.design.borders.radius.sm,
      cursor: "pointer",
      fontSize: this.design.typography.fontSize.md,
    });

    // Dropdown menu
    const dropdownMenu = document.createElement("div");
    dropdownMenu.id = "main-menu-content";
    this.applyStyles(dropdownMenu, {
      position: "absolute",
      top: "100%",
      right: "0",
      backgroundColor: this.design.colors.ui.surface,
      border: `${this.design.borders.width.thin} solid ${this.design.colors.primary.main}`,
      borderRadius: this.design.borders.radius.sm,
      boxShadow: this.design.shadows.md,
      display: "none",
      zIndex: this.getZIndex("dropdown"),
      minWidth: "200px",
      maxHeight: "400px",
      overflow: "auto",
    });

    // Window Management section header
    const windowManagementHeader = document.createElement("div");
    windowManagementHeader.innerText = "WINDOW MANAGEMENT";
    this.applyStyles(windowManagementHeader, {
      padding: `${this.design.spacing.xs} ${this.design.spacing.md}`,
      backgroundColor: this.design.colors.ui.hover,
      color: this.design.colors.text.secondary,
      fontSize: this.design.typography.fontSize.xs,
      fontWeight: this.design.typography.fontWeight.bold,
      textTransform: "uppercase",
      borderBottom: `${this.design.borders.width.thin} solid ${this.design.colors.ui.divider}`,
    });

    dropdownMenu.appendChild(windowManagementHeader);

    // Show all windows option
    const showAllOption = document.createElement("div");
    showAllOption.innerText = "Show All Windows";
    this.applyStyles(showAllOption, {
      padding: `${this.design.spacing.sm} ${this.design.spacing.lg}`,
      cursor: "pointer",
      color: this.design.colors.text.primary,
      fontSize: this.design.typography.fontSize.sm,
      borderBottom: `${this.design.borders.width.thin} solid ${this.design.colors.ui.divider}`,
    });

    showAllOption.addEventListener("mouseover", () => {
      showAllOption.style.backgroundColor = this.design.colors.ui.hover;
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
    let cascadeOption = document.createElement("div");
    cascadeOption.innerText = "Cascade Windows";
    this.applyStyles(cascadeOption, {
      padding: `${this.design.spacing.sm} ${this.design.spacing.lg}`,
      cursor: "pointer",
      color: this.design.colors.text.primary,
      fontSize: this.design.typography.fontSize.sm,
    });

    cascadeOption.addEventListener("mouseover", () => {
      cascadeOption.style.backgroundColor = this.design.colors.ui.hover;
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
    let minimizeAllOption = document.createElement("div");
    minimizeAllOption.innerText = "Minimize All Windows";
    this.applyStyles(minimizeAllOption, {
      padding: `${this.design.spacing.sm} ${this.design.spacing.lg}`,
      cursor: "pointer",
      color: this.design.colors.text.primary,
      fontSize: this.design.typography.fontSize.sm,
      borderBottom: `${this.design.borders.width.thin} solid ${this.design.colors.ui.divider}`,
    });

    minimizeAllOption.addEventListener("mouseover", () => {
      minimizeAllOption.style.backgroundColor = this.design.colors.ui.hover;
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

    // Tile windows option
    let tileOption = document.createElement("div");
    tileOption.innerText = "Tile Windows";
    this.applyStyles(tileOption, {
      padding: `${this.design.spacing.sm} ${this.design.spacing.lg}`,
      cursor: "pointer",
      color: this.design.colors.text.primary,
      fontSize: this.design.typography.fontSize.sm,
    });

    tileOption.addEventListener("mouseover", () => {
      tileOption.style.backgroundColor = this.design.colors.ui.hover;
    });

    tileOption.addEventListener("mouseout", () => {
      tileOption.style.backgroundColor = "transparent";
    });

    tileOption.addEventListener("click", () => {
      // Hide dropdown
      dropdownMenu.style.display = "none";

      // Tile all visible windows
      this.tileWindows();
    });

    // Auto-tile toggle option
    const autoTileToggle = document.createElement("div");
    autoTileToggle.id = "auto-tile-toggle";
    autoTileToggle.style.display = "flex";
    autoTileToggle.style.alignItems = "center";
    autoTileToggle.style.justifyContent = "space-between";
    autoTileToggle.style.padding = `${this.design.spacing.sm} ${this.design.spacing.lg}`;
    autoTileToggle.style.borderBottom = `${this.design.borders.width.thin} solid ${this.design.colors.ui.divider}`;

    const autoTileLabel = document.createElement("span");
    autoTileLabel.innerText = "Auto-tile Windows";
    autoTileLabel.style.fontSize = this.design.typography.fontSize.sm;
    autoTileLabel.style.color = this.design.colors.text.primary;

    const toggleSwitch = document.createElement("div");
    toggleSwitch.className = "toggle-switch";
    toggleSwitch.style.position = "relative";
    toggleSwitch.style.display = "inline-block";
    toggleSwitch.style.width = "36px";
    toggleSwitch.style.height = "20px";

    const toggleInput = document.createElement("input");
    toggleInput.type = "checkbox";
    toggleInput.id = "auto-tile-checkbox";
    toggleInput.checked = this.autoTileWindows;
    toggleInput.style.opacity = "0";
    toggleInput.style.width = "0";
    toggleInput.style.height = "0";

    const toggleSlider = document.createElement("span");
    toggleSlider.className = "toggle-slider";
    toggleSlider.style.position = "absolute";
    toggleSlider.style.cursor = "pointer";
    toggleSlider.style.top = "0";
    toggleSlider.style.left = "0";
    toggleSlider.style.right = "0";
    toggleSlider.style.bottom = "0";
    toggleSlider.style.backgroundColor = this.autoTileWindows ? this.design.colors.primary.accent : "#ccc";
    toggleSlider.style.borderRadius = "10px";
    toggleSlider.style.transition = "all 0.2s ease";

    // Toggle indicator
    const toggleIndicator = document.createElement("span");
    toggleIndicator.style.position = "absolute";
    toggleIndicator.style.content = "''";
    toggleIndicator.style.height = "16px";
    toggleIndicator.style.width = "16px";
    toggleIndicator.style.left = this.autoTileWindows ? "18px" : "2px";
    toggleIndicator.style.bottom = "2px";
    toggleIndicator.style.backgroundColor = "#fff";
    toggleIndicator.style.borderRadius = "50%";
    toggleIndicator.style.transition = "all 0.2s ease";

    // We'll handle the toggle events through the container click handler only
    // to avoid event propagation issues and ensure consistent behavior

    // Assemble toggle switch
    toggleSlider.appendChild(toggleIndicator);
    toggleSwitch.appendChild(toggleInput);
    toggleSwitch.appendChild(toggleSlider);

    autoTileToggle.appendChild(autoTileLabel);
    autoTileToggle.appendChild(toggleSwitch);

    // Create a function to update window arrangement options based on auto-tile state
    const updateWindowArrangementOptions = (isEnabled) => {
      console.log(`Updating cascade and tile options. Auto-tile is: ${isEnabled ? "ON" : "OFF"}`);
      // Only disable cascade and tile options, not minimizeAllOption
      const buttons = [cascadeOption, tileOption];

      // First ensure all buttons have the _disabled property defined
      buttons.forEach((button) => {
        if (button._disabled === undefined) {
          button._disabled = false;
        }
      });

      if (isEnabled) {
        // Disable all buttons
        buttons.forEach((button) => {
          // Visual disabling
          button.style.opacity = "0.5";
          button.style.color = this.design.colors.text.tertiary;
          button.style.cursor = "not-allowed";
          button.title = "Disabled when auto-tile is on";

          // Functional disabling - clone the node to remove all event listeners
          if (!button._disabled) {
            console.log(`Disabling button: ${button.innerText}`);
            const clone = button.cloneNode(true);

            // Make sure the button has a parent before replacing it
            if (button.parentNode) {
              button.parentNode.replaceChild(clone, button);
            } else {
              console.warn(`Button ${button.innerText} has no parent node, cannot replace`);
            }

            // Store reference to original button
            clone._originalButton = button;
            clone._disabled = true;

            // Add a click handler that does nothing but prevent event propagation
            // Store button text before adding event listener to avoid scope issues
            const buttonText = clone.innerText;
            const self = this; // Store reference to 'this' for use in event handler

            clone.addEventListener("click", function (e) {
              e.stopPropagation();
              e.preventDefault();
              console.log(`Button ${buttonText} disabled - auto-tile is on`);
              // Add visual feedback to show that event was properly intercepted
              this.style.backgroundColor = self.design.colors.ui.focus;
              const btn = this; // Store reference to 'this' for the setTimeout
              setTimeout(() => {
                btn.style.backgroundColor = "transparent";
              }, 300);
              return false;
            });

            // Replace the reference in our local scope
            if (button === cascadeOption) cascadeOption = clone;
            if (button === tileOption) tileOption = clone;
          }
        });
      } else {
        // Re-enable all buttons by restoring originals if they were disabled
        buttons.forEach((button) => {
          // Get the button text for logging
          const buttonText = button.innerText || "unknown";
          console.log(`Re-enabling button: ${buttonText}`);

          if (button._disabled && button._originalButton) {
            // We have the original button, so restore it with all event handlers
            if (button.parentNode) {
              // Before replacement, ensure original button has correct visual state
              button._originalButton.style.opacity = "1";
              button._originalButton.style.color = this.design.colors.text.primary;
              button._originalButton.style.cursor = "pointer";
              button._originalButton.style.backgroundColor = "transparent";
              button._originalButton.title = "";

              // Now replace the node
              button.parentNode.replaceChild(button._originalButton, button);

              // Update our references
              if (button === cascadeOption) cascadeOption = button._originalButton;
              if (button === tileOption) tileOption = button._originalButton;
            } else {
              console.warn(`Button ${buttonText} has no parent node, cannot replace`);
            }
          } else {
            // Just restore visual state if we don't have the original or it's not disabled
            button.style.opacity = "1";
            button.style.color = this.design.colors.text.primary;
            button.style.cursor = "pointer";
            button.style.backgroundColor = "transparent";
            button.title = "";
            if (button._disabled) button._disabled = false;
          }
        });
      }
    };

    // Set initial state of window arrangement options
    updateWindowArrangementOptions(this.autoTileWindows);

    // Add click handler to the entire toggle container
    autoTileToggle.addEventListener("click", (e) => {
      // Prevent the event from closing the dropdown
      e.stopPropagation();

      // Toggle the state directly with immediate UI update
      this.autoTileWindows = !this.autoTileWindows;
      console.log("Auto-tile toggled to:", this.autoTileWindows);

      // Force immediate UI update
      const isOn = this.autoTileWindows;

      // Set background color of slider
      toggleSlider.style.backgroundColor = isOn ? this.design.colors.primary.accent : "#ccc";

      // Set position of indicator
      toggleIndicator.style.left = isOn ? "18px" : "2px";

      // Update checkbox state
      toggleInput.checked = isOn;

      // Update window arrangement options
      updateWindowArrangementOptions(isOn);

      // If enabled, tile windows immediately
      if (isOn) {
        setTimeout(() => this.tileWindows(), 50);
      }

      // Don't hide dropdown - let user see the effect
      return false;
    });

    // Add window management options to dropdown menu
    dropdownMenu.appendChild(showAllOption);
    dropdownMenu.appendChild(minimizeAllOption);
    dropdownMenu.appendChild(cascadeOption);
    dropdownMenu.appendChild(tileOption);
    dropdownMenu.appendChild(autoTileToggle);

    // Add minimized windows section
    const minimizedWindowsHeader = document.createElement("div");
    minimizedWindowsHeader.id = "minimized-windows-header";
    minimizedWindowsHeader.innerText = "MINIMIZED WINDOWS";
    this.applyStyles(minimizedWindowsHeader, {
      padding: `${this.design.spacing.xs} ${this.design.spacing.md}`,
      backgroundColor: this.design.colors.ui.hover,
      color: this.design.colors.text.secondary,
      fontSize: this.design.typography.fontSize.xs,
      fontWeight: this.design.typography.fontWeight.bold,
      textTransform: "uppercase",
      borderBottom: `${this.design.borders.width.thin} solid ${this.design.colors.ui.divider}`,
      marginTop: this.design.spacing.sm,
    });

    dropdownMenu.appendChild(minimizedWindowsHeader);

    // Container for minimized windows
    const minimizedWindowsContainer = document.createElement("div");
    minimizedWindowsContainer.id = "minimized-windows-container";

    // No windows message (shown when empty)
    const noWindowsMessage = document.createElement("div");
    noWindowsMessage.id = "no-minimized-windows-message";
    noWindowsMessage.innerText = "No minimized windows";
    this.applyStyles(noWindowsMessage, {
      padding: `${this.design.spacing.sm} ${this.design.spacing.md}`,
      color: this.design.colors.text.tertiary,
      fontStyle: "italic",
      fontSize: this.design.typography.fontSize.sm,
      textAlign: "center",
    });

    minimizedWindowsContainer.appendChild(noWindowsMessage);
    dropdownMenu.appendChild(minimizedWindowsContainer);

    // Toggle dropdown visibility
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click from reaching document

      // Update the minimized windows section
      this.updateMainMenuMinimizedWindows();

      // Update toggle state to reflect current setting
      const toggleInput = document.getElementById("auto-tile-checkbox");
      const toggleSlider = document.querySelector(".toggle-slider");
      const toggleIndicator = toggleSlider?.querySelector("span");

      if (toggleInput && toggleSlider && toggleIndicator) {
        toggleInput.checked = this.autoTileWindows;
        toggleSlider.style.backgroundColor = this.autoTileWindows ? this.design.colors.primary.accent : "#ccc";
        toggleIndicator.style.left = this.autoTileWindows ? "18px" : "2px";

        // Force an update of all button states whenever dropdown is opened
        // This ensures visual state is consistent with functionality
        console.log("Dropdown opened, refreshing window arrangement options");
        updateWindowArrangementOptions(this.autoTileWindows);
      }

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
    desktop.style.paddingTop = this.design.components.toolbar.height;

    this.root.appendChild(toolbar);
    this.root.appendChild(desktop);

    return this;
  };

  /**
   * Updates the minimized windows section in the main menu dropdown
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.updateMainMenuMinimizedWindows = function () {
    const container = document.getElementById("minimized-windows-container");
    const noWindowsMessage = document.getElementById("no-minimized-windows-message");

    if (!container) return this;

    // Clear existing window items (except the no windows message)
    Array.from(container.children).forEach((child) => {
      if (child.id !== "no-minimized-windows-message") {
        child.remove();
      }
    });

    // Get all minimized windows
    const minimizedWindows = this.windows.filter((window) => window.minimized);

    // Show/hide no windows message
    if (noWindowsMessage) {
      noWindowsMessage.style.display = minimizedWindows.length > 0 ? "none" : "block";
    }

    // Add items for each minimized window
    minimizedWindows.forEach((window) => {
      // Get appropriate label based on window type
      let windowLabel = "Window";

      if (window.type === "channels") {
        windowLabel = "Channels";
      } else if (window.type === "agents") {
        windowLabel = "Agents";
      } else if (window.type === "sidebar") {
        windowLabel = "Directory";
      } else if (window.type === "input") {
        windowLabel = "Messenger";
      } else if (window.type === "tasks") {
        windowLabel = "Tasks";
      } else if (window.type === "task_details" && window.taskId) {
        const task = this.getTask(window.taskId);
        if (task) {
          windowLabel = `Task: ${task.title.substring(0, 15)}${task.title.length > 15 ? "..." : ""}`;
        } else {
          windowLabel = "Task Details";
        }
      } else if (window.type === "channel" && window.channelId) {
        // For channel windows, use the channel name
        const channel = this.channels.find((c) => c.id === window.channelId);
        if (channel) {
          windowLabel = `# ${channel.title || channel.id}`;
        }
      } else if (window.post) {
        // For message windows from the original implementation
        const post = window.post;

        // Get author name if available
        if (post.author) {
          let authorName = post.author;
          if (this.users && this.users[post.author]) {
            authorName = this.users[post.author].name;
          } else if (this.agents && this.agents[post.author]) {
            authorName = this.agents[post.author].name;
          }
          windowLabel = authorName;
        }
      }

      // Create window item
      const windowItem = document.createElement("div");
      windowItem.id = `menu-window-item-${window.id}`;
      windowItem.innerText = windowLabel;

      this.applyStyles(windowItem, {
        padding: `${this.design.spacing.sm} ${this.design.spacing.lg}`,
        cursor: "pointer",
        color: this.design.colors.text.primary,
        fontSize: this.design.typography.fontSize.sm,
        borderBottom: `${this.design.borders.width.thin} solid ${this.design.colors.ui.divider}`,
      });

      windowItem.addEventListener("mouseover", () => {
        windowItem.style.backgroundColor = this.design.colors.ui.hover;
      });

      windowItem.addEventListener("mouseout", () => {
        windowItem.style.backgroundColor = "transparent";
      });

      windowItem.addEventListener("click", () => {
        // Hide dropdown
        document.getElementById("main-menu-content").style.display = "none";

        // Restore window
        this.windowRestore(window.id);
      });

      // Add item to container
      container.appendChild(windowItem);
    });

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
    windowTitle.innerText = "Messenger";
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

    windowControls.appendChild(minimizeButton);
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
   * Renders the tasks window - uncloseable, displays all tasks
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.renderTasksWindow = function () {
    // Create a window for tasks
    const tasksWindow = document.createElement("div");
    tasksWindow.id = "window-tasks";
    tasksWindow.className = "window";
    this.applyStyles(tasksWindow, {
      position: "absolute",
      width: this.design.windows.defaultWidth.large,
      height: this.design.windows.defaultHeight.medium,
      top: "100px",
      left: "300px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      backgroundColor: this.design.colors.ui.surface,
      border: `${this.design.borders.width.thin} solid ${this.design.colors.primary.main}`,
      boxShadow: this.design.shadows.md,
      zIndex: this.design.zIndex.windowFocus, // Higher than other windows by default
    });

    // Add click handler to focus this window when clicked anywhere
    tasksWindow.addEventListener("mousedown", () => {
      this.windowFocus("window-tasks");
    });

    // Window header
    const windowHeader = document.createElement("div");
    windowHeader.className = "window__header";
    this.applyStyles(windowHeader, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: `${this.design.components.window.header.paddingY} ${this.design.components.window.header.paddingX}`,
      backgroundColor: this.design.components.window.header.background,
      color: this.design.components.window.header.color,
      cursor: "move",
      userSelect: "none",
    });

    const windowTitle = document.createElement("div");
    windowTitle.innerText = "Tasks";
    this.applyStyles(windowTitle, {
      fontSize: this.design.components.window.header.fontSize,
      fontWeight: this.design.typography.fontWeight.bold,
    });

    const windowControls = document.createElement("div");
    this.applyStyles(windowControls, {
      display: "flex",
      gap: this.design.spacing.sm,
    });

    const minimizeButton = document.createElement("button");
    minimizeButton.innerHTML = "&#8211;";
    this.applyStyles(minimizeButton, {
      background: "none",
      border: "none",
      color: this.design.colors.text.inverted,
      cursor: "pointer",
      fontSize: this.design.typography.fontSize.base,
      padding: `0 ${this.design.spacing.xs}`,
    });
    minimizeButton.addEventListener("click", () => {
      this.windowMinimize("window-tasks");
    });

    // No close button for tasks window - it's uncloseable
    windowControls.appendChild(minimizeButton);

    windowHeader.appendChild(windowTitle);
    windowHeader.appendChild(windowControls);
    tasksWindow.appendChild(windowHeader);

    // Window content
    const windowContent = document.createElement("div");
    windowContent.className = "window__content";
    this.applyStyles(windowContent, {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      backgroundColor: this.design.colors.ui.background,
    });

    // Tasks toolbar (filters, search, actions)
    const toolbarEl = document.createElement("div");
    toolbarEl.className = "tasks__toolbar";
    this.applyStyles(toolbarEl, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: this.design.spacing.md,
      borderBottom: `${this.design.borders.width.thin} solid ${this.design.colors.ui.divider}`,
      backgroundColor: this.design.colors.ui.hover,
    });

    // Left side - filters
    const filtersContainer = document.createElement("div");
    this.applyStyles(filtersContainer, {
      display: "flex",
      gap: this.design.spacing.md,
      alignItems: "center",
    });

    // Filter label
    const filterLabel = document.createElement("span");
    filterLabel.innerText = "Filter:";
    this.applyStyles(filterLabel, {
      fontSize: this.design.typography.fontSize.base,
    });
    filtersContainer.appendChild(filterLabel);

    // Status filter
    const statusSelect = document.createElement("select");
    this.applyStyles(statusSelect, {
      padding: `${this.design.spacing.xxs} ${this.design.spacing.xs}`,
      fontSize: this.design.typography.fontSize.base,
      border: `${this.design.borders.width.thin} solid ${this.design.colors.ui.border}`,
      borderRadius: this.design.borders.radius.sm,
    });

    const statusOptions = [
      { value: "", text: "All Statuses" },
      { value: "pending", text: "Pending" },
      { value: "in_progress", text: "In Progress" },
      { value: "completed", text: "Completed" },
      { value: "cancelled", text: "Cancelled" },
    ];

    statusOptions.forEach((option) => {
      const optionEl = document.createElement("option");
      optionEl.value = option.value;
      optionEl.text = option.text;
      statusSelect.appendChild(optionEl);
    });

    statusSelect.addEventListener("change", () => {
      this.updateTasksWindow();
    });

    filtersContainer.appendChild(statusSelect);

    // Priority filter
    const prioritySelect = document.createElement("select");
    this.applyStyles(prioritySelect, {
      padding: `${this.design.spacing.xxs} ${this.design.spacing.xs}`,
      fontSize: this.design.typography.fontSize.base,
      border: `${this.design.borders.width.thin} solid ${this.design.colors.ui.border}`,
      borderRadius: this.design.borders.radius.sm,
    });

    const priorityOptions = [
      { value: "", text: "All Priorities" },
      { value: "high", text: "High" },
      { value: "medium", text: "Medium" },
      { value: "low", text: "Low" },
    ];

    priorityOptions.forEach((option) => {
      const optionEl = document.createElement("option");
      optionEl.value = option.value;
      optionEl.text = option.text;
      prioritySelect.appendChild(optionEl);
    });

    prioritySelect.addEventListener("change", () => {
      this.updateTasksWindow();
    });

    filtersContainer.appendChild(prioritySelect);

    // Right side - actions
    const actionsContainer = document.createElement("div");
    this.applyStyles(actionsContainer, {
      display: "flex",
      gap: this.design.spacing.md,
      alignItems: "center",
    });

    // Use the createButton helper instead of manual styling
    const newTaskButton = this.createButton("New Task", "primary", {
      onClick: () => {
        this.showNewTaskDialog();
      },
    });
    actionsContainer.appendChild(newTaskButton);

    // Use the createButton helper for refresh button
    const refreshButton = this.createButton("Refresh", "secondary", {
      onClick: () => {
        this.updateTasksWindow();
      },
    });
    actionsContainer.appendChild(refreshButton);

    // Add filter and action containers to toolbar
    toolbarEl.appendChild(filtersContainer);
    toolbarEl.appendChild(actionsContainer);
    windowContent.appendChild(toolbarEl);

    // Tasks list container
    const tasksListContainer = document.createElement("div");
    tasksListContainer.id = "tasks__list";
    this.applyStyles(tasksListContainer, {
      flex: "1",
      overflow: "auto",
      padding: "0",
    });

    // Tasks table
    const tasksTable = document.createElement("table");
    tasksTable.id = "tasks__table";
    this.applyStyles(tasksTable, {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: this.design.typography.fontSize.base,
      tableLayout: "fixed",
    });

    // Table header
    const tableHeader = document.createElement("thead");
    this.applyStyles(tableHeader, {
      position: "sticky",
      top: "0",
      backgroundColor: this.design.components.table.headerBackground,
      zIndex: "1",
    });

    const headerRow = document.createElement("tr");

    const columns = [
      { id: "status", label: "Status", width: "10%" },
      { id: "title", label: "Title", width: "30%" },
      { id: "agent", label: "Agent", width: "15%" },
      { id: "priority", label: "Priority", width: "10%" },
      { id: "created", label: "Created", width: "15%" },
      { id: "actions", label: "Actions", width: "20%" },
    ];

    columns.forEach((column) => {
      const th = document.createElement("th");
      th.innerText = column.label;
      this.applyStyles(th, {
        padding: this.design.spacing.md,
        textAlign: "left",
        fontWeight: this.design.typography.fontWeight.bold,
        borderBottom: `${this.design.borders.width.thin} solid ${this.design.components.table.borderColor}`,
        width: column.width,
      });
      headerRow.appendChild(th);
    });

    tableHeader.appendChild(headerRow);
    tasksTable.appendChild(tableHeader);

    // Table body - will be populated in updateTasksWindow
    const tableBody = document.createElement("tbody");
    tableBody.id = "tasks__table-body";
    tasksTable.appendChild(tableBody);

    tasksListContainer.appendChild(tasksTable);
    windowContent.appendChild(tasksListContainer);

    // Add content to window
    tasksWindow.appendChild(windowContent);

    // Make window draggable
    this.makeWindowDraggable(tasksWindow, windowHeader);

    // Add to DOM
    document.getElementById("desktop").appendChild(tasksWindow);

    // Add to windows array
    this.windows.push({
      id: "window-tasks",
      type: "tasks",
      minimized: false,
      uncloseable: true,
    });

    // Populate with initial tasks
    this.updateTasksWindow();

    return this;
  };

  /**
   * Updates the tasks window with current tasks
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.updateTasksWindow = function () {
    const tableBody = document.getElementById("tasks__table-body");
    if (!tableBody) return this;

    // Clear current content
    tableBody.innerHTML = "";

    // Get filters
    const statusFilter = document.querySelector("#window-tasks select:first-of-type")?.value || "";
    const priorityFilter = document.querySelector("#window-tasks select:last-of-type")?.value || "";

    // Get filtered tasks
    const filters = {};
    if (statusFilter) filters.status = statusFilter;
    if (priorityFilter) filters.priority = priorityFilter;

    const tasks = this.getTasks(filters);

    if (tasks.length === 0) {
      // No tasks message
      const noTasksRow = document.createElement("tr");
      const noTasksCell = document.createElement("td");
      noTasksCell.colSpan = 6;
      this.applyStyles(noTasksCell, {
        padding: this.design.spacing.xxl,
        textAlign: "center",
        color: this.design.colors.text.tertiary,
      });
      noTasksCell.innerText = "No tasks found";
      noTasksRow.appendChild(noTasksCell);
      tableBody.appendChild(noTasksRow);
    } else {
      // Render each task
      tasks.forEach((task) => {
        const taskRow = document.createElement("tr");
        taskRow.id = `task-row-${task.id}`;
        this.applyStyles(taskRow, {
          borderBottom: `${this.design.borders.width.thin} solid ${this.design.components.table.borderColor}`,
        });

        // Alternate row background
        if (tasks.indexOf(task) % 2 === 0) {
          taskRow.style.backgroundColor = this.design.components.table.rowEvenBackground;
        } else {
          taskRow.style.backgroundColor = this.design.components.table.rowOddBackground;
        }

        // Hover effect
        taskRow.addEventListener("mouseover", () => {
          taskRow.style.backgroundColor = this.design.components.table.rowHoverBackground;
        });

        taskRow.addEventListener("mouseout", () => {
          taskRow.style.backgroundColor =
            tasks.indexOf(task) % 2 === 0
              ? this.design.components.table.rowEvenBackground
              : this.design.components.table.rowOddBackground;
        });

        // Status cell
        const statusCell = document.createElement("td");
        this.applyStyles(statusCell, {
          padding: this.design.spacing.md,
        });

        // Use the createStatusBadge helper function
        const statusBadge = this.createStatusBadge(task.status);

        statusCell.appendChild(statusBadge);
        taskRow.appendChild(statusCell);

        // Title cell
        const titleCell = document.createElement("td");
        titleCell.style.padding = "8px";
        titleCell.style.fontWeight = "bold";
        titleCell.innerText = task.title;

        // Add description as tooltip if available
        if (task.description) {
          titleCell.title = task.description;
        }

        taskRow.appendChild(titleCell);

        // Agent cell
        const agentCell = document.createElement("td");
        agentCell.style.padding = "8px";

        // Get agent name if available
        let agentName = task.agentId || "Unassigned";
        if (task.agentId && this.agents && this.agents[task.agentId]) {
          agentName = this.agents[task.agentId].name;
        } else if (task.agentId && this.users && this.users[task.agentId]) {
          agentName = this.users[task.agentId].name;
        }

        agentCell.innerText = agentName;
        taskRow.appendChild(agentCell);

        // Priority cell
        const priorityCell = document.createElement("td");
        priorityCell.style.padding = "8px";

        const priorityBadge = document.createElement("span");
        priorityBadge.innerText = task.priority;
        priorityBadge.style.padding = "2px 6px";
        priorityBadge.style.borderRadius = "12px";
        priorityBadge.style.fontSize = "10px";
        priorityBadge.style.textTransform = "uppercase";

        // Priority color
        switch (task.priority) {
          case "high":
            priorityBadge.style.backgroundColor = "#ffcccc";
            priorityBadge.style.color = "#c62828";
            break;
          case "medium":
            priorityBadge.style.backgroundColor = "#fff0b3";
            priorityBadge.style.color = "#a67c00";
            break;
          case "low":
            priorityBadge.style.backgroundColor = "#e0e0e0";
            priorityBadge.style.color = "#606060";
            break;
        }

        priorityCell.appendChild(priorityBadge);
        taskRow.appendChild(priorityCell);

        // Created date cell
        const createdCell = document.createElement("td");
        createdCell.style.padding = "8px";
        createdCell.innerText = new Date(task.createdAt).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        taskRow.appendChild(createdCell);

        // Actions cell
        const actionsCell = document.createElement("td");
        actionsCell.style.padding = "8px";
        actionsCell.style.display = "flex";
        actionsCell.style.gap = "4px";

        // Actions based on current status
        if (task.status === "pending" || task.status === "in_progress") {
          // Complete button
          const completeBtn = document.createElement("button");
          completeBtn.innerText = "Complete";
          completeBtn.style.padding = "2px 6px";
          completeBtn.style.backgroundColor = "#c6f0c6";
          completeBtn.style.color = "#2e7d32";
          completeBtn.style.border = "none";
          completeBtn.style.borderRadius = "3px";
          completeBtn.style.cursor = "pointer";
          completeBtn.style.fontSize = "11px";

          completeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.updateTask(task.id, {
              status: "completed",
              updatedBy: "user1", // Default to first user for now
            });
          });

          actionsCell.appendChild(completeBtn);

          // Cancel button
          const cancelBtn = document.createElement("button");
          cancelBtn.innerText = "Cancel";
          cancelBtn.style.padding = "2px 6px";
          cancelBtn.style.backgroundColor = "#ffcccc";
          cancelBtn.style.color = "#c62828";
          cancelBtn.style.border = "none";
          cancelBtn.style.borderRadius = "3px";
          cancelBtn.style.cursor = "pointer";
          cancelBtn.style.fontSize = "11px";

          cancelBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.cancelTask(task.id, "user1");
          });

          actionsCell.appendChild(cancelBtn);
        } else if (task.status === "completed" || task.status === "cancelled") {
          // Rerun button
          const rerunBtn = document.createElement("button");
          rerunBtn.innerText = "Rerun";
          rerunBtn.style.padding = "2px 6px";
          rerunBtn.style.backgroundColor = "#b3e0ff";
          rerunBtn.style.color = "#0066cc";
          rerunBtn.style.border = "none";
          rerunBtn.style.borderRadius = "3px";
          rerunBtn.style.cursor = "pointer";
          rerunBtn.style.fontSize = "11px";

          rerunBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.rerunTask(task.id, "user1");
          });

          actionsCell.appendChild(rerunBtn);
        }

        // View details button (always available)
        const viewBtn = document.createElement("button");
        viewBtn.innerText = "Details";
        viewBtn.style.padding = "2px 6px";
        viewBtn.style.backgroundColor = "transparent";
        viewBtn.style.color = "#000000";
        viewBtn.style.border = "1px solid #ccc";
        viewBtn.style.borderRadius = "3px";
        viewBtn.style.cursor = "pointer";
        viewBtn.style.fontSize = "11px";

        viewBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.showTaskDetailsWindow(task.id);
        });

        actionsCell.appendChild(viewBtn);
        taskRow.appendChild(actionsCell);

        // Add row to table body
        tableBody.appendChild(taskRow);
      });
    }

    return this;
  };

  /**
   * Shows a dialog to create a new task
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.showNewTaskDialog = function () {
    // Create a modal dialog
    const modalOverlay = document.createElement("div");
    modalOverlay.id = "modal-overlay";
    modalOverlay.style.position = "fixed";
    modalOverlay.style.top = "0";
    modalOverlay.style.left = "0";
    modalOverlay.style.width = "100%";
    modalOverlay.style.height = "100%";
    modalOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modalOverlay.style.zIndex = "1000";
    modalOverlay.style.display = "flex";
    modalOverlay.style.justifyContent = "center";
    modalOverlay.style.alignItems = "center";

    // Modal container
    const modalContainer = document.createElement("div");
    modalContainer.style.backgroundColor = "#ffffff";
    modalContainer.style.borderRadius = "5px";
    modalContainer.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    modalContainer.style.width = "400px";
    modalContainer.style.maxWidth = "90%";
    modalContainer.style.maxHeight = "90%";
    modalContainer.style.overflow = "auto";
    modalContainer.style.display = "flex";
    modalContainer.style.flexDirection = "column";

    // Modal header
    const modalHeader = document.createElement("div");
    modalHeader.style.padding = "12px 16px";
    modalHeader.style.borderBottom = "1px solid #e0e0e0";
    modalHeader.style.display = "flex";
    modalHeader.style.justifyContent = "space-between";
    modalHeader.style.alignItems = "center";

    const modalTitle = document.createElement("h3");
    modalTitle.innerText = "Create New Task";
    modalTitle.style.margin = "0";
    modalTitle.style.fontSize = "16px";
    modalTitle.style.fontWeight = "bold";

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&#10005;";
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "16px";
    closeButton.style.padding = "0";

    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalOverlay);
    });

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    modalContainer.appendChild(modalHeader);

    // Modal content
    const modalContent = document.createElement("div");
    modalContent.style.padding = "16px";

    // Form
    const form = document.createElement("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "12px";

    // Title field
    const titleGroup = document.createElement("div");

    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Title:";
    titleLabel.style.display = "block";
    titleLabel.style.marginBottom = "4px";
    titleLabel.style.fontSize = "12px";
    titleLabel.style.fontWeight = "bold";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Enter task title";
    titleInput.style.width = "100%";
    titleInput.style.padding = "6px";
    titleInput.style.boxSizing = "border-box";
    titleInput.style.border = "1px solid #ccc";
    titleInput.style.borderRadius = "3px";
    titleInput.style.fontSize = "12px";

    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleInput);
    form.appendChild(titleGroup);

    // Description field
    const descGroup = document.createElement("div");

    const descLabel = document.createElement("label");
    descLabel.innerText = "Description:";
    descLabel.style.display = "block";
    descLabel.style.marginBottom = "4px";
    descLabel.style.fontSize = "12px";
    descLabel.style.fontWeight = "bold";

    const descInput = document.createElement("textarea");
    descInput.placeholder = "Enter task description";
    descInput.style.width = "100%";
    descInput.style.padding = "6px";
    descInput.style.boxSizing = "border-box";
    descInput.style.border = "1px solid #ccc";
    descInput.style.borderRadius = "3px";
    descInput.style.fontSize = "12px";
    descInput.style.minHeight = "80px";
    descInput.style.resize = "vertical";

    descGroup.appendChild(descLabel);
    descGroup.appendChild(descInput);
    form.appendChild(descGroup);

    // Priority field
    const priorityGroup = document.createElement("div");

    const priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Priority:";
    priorityLabel.style.display = "block";
    priorityLabel.style.marginBottom = "4px";
    priorityLabel.style.fontSize = "12px";
    priorityLabel.style.fontWeight = "bold";

    const prioritySelect = document.createElement("select");
    prioritySelect.style.width = "100%";
    prioritySelect.style.padding = "6px";
    prioritySelect.style.boxSizing = "border-box";
    prioritySelect.style.border = "1px solid #ccc";
    prioritySelect.style.borderRadius = "3px";
    prioritySelect.style.fontSize = "12px";

    const priorityOptions = [
      { value: "high", text: "High" },
      { value: "medium", text: "Medium" },
      { value: "low", text: "Low" },
    ];

    priorityOptions.forEach((option) => {
      const optionEl = document.createElement("option");
      optionEl.value = option.value;
      optionEl.text = option.text;
      prioritySelect.appendChild(optionEl);
    });

    priorityGroup.appendChild(priorityLabel);
    priorityGroup.appendChild(prioritySelect);
    form.appendChild(priorityGroup);

    // Agent field
    const agentGroup = document.createElement("div");

    const agentLabel = document.createElement("label");
    agentLabel.innerText = "Assigned Agent:";
    agentLabel.style.display = "block";
    agentLabel.style.marginBottom = "4px";
    agentLabel.style.fontSize = "12px";
    agentLabel.style.fontWeight = "bold";

    const agentSelect = document.createElement("select");
    agentSelect.style.width = "100%";
    agentSelect.style.padding = "6px";
    agentSelect.style.boxSizing = "border-box";
    agentSelect.style.border = "1px solid #ccc";
    agentSelect.style.borderRadius = "3px";
    agentSelect.style.fontSize = "12px";

    // Add unassigned option
    const unassignedOption = document.createElement("option");
    unassignedOption.value = "";
    unassignedOption.text = "Unassigned";
    agentSelect.appendChild(unassignedOption);

    // Add agents
    if (this.agents && typeof this.agents === "object") {
      Object.values(this.agents).forEach((agent) => {
        const option = document.createElement("option");
        option.value = agent.id;
        option.text = agent.name;
        agentSelect.appendChild(option);
      });
    }

    agentGroup.appendChild(agentLabel);
    agentGroup.appendChild(agentSelect);
    form.appendChild(agentGroup);

    // Form actions
    const formActions = document.createElement("div");
    formActions.style.display = "flex";
    formActions.style.justifyContent = "flex-end";
    formActions.style.gap = "8px";
    formActions.style.marginTop = "16px";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.innerText = "Cancel";
    cancelBtn.style.padding = "6px 12px";
    cancelBtn.style.backgroundColor = "#f0f0f0";
    cancelBtn.style.color = "#000000";
    cancelBtn.style.border = "1px solid #ccc";
    cancelBtn.style.borderRadius = "3px";
    cancelBtn.style.cursor = "pointer";
    cancelBtn.style.fontSize = "12px";

    cancelBtn.addEventListener("click", () => {
      document.body.removeChild(modalOverlay);
    });

    const createBtn = document.createElement("button");
    createBtn.type = "button";
    createBtn.innerText = "Create Task";
    createBtn.style.padding = "6px 12px";
    createBtn.style.backgroundColor = "#000000";
    createBtn.style.color = "#ffffff";
    createBtn.style.border = "none";
    createBtn.style.borderRadius = "3px";
    createBtn.style.cursor = "pointer";
    createBtn.style.fontSize = "12px";

    createBtn.addEventListener("click", () => {
      // Get form values
      const title = titleInput.value.trim();
      if (!title) {
        alert("Task title is required");
        return;
      }

      const taskData = {
        title: title,
        description: descInput.value.trim(),
        priority: prioritySelect.value,
        agentId: agentSelect.value || null,
        createdBy: "user1", // Default to first user for now
        status: "pending",
      };

      // Create task
      this.createTask(taskData);

      // Close dialog
      document.body.removeChild(modalOverlay);
    });

    formActions.appendChild(cancelBtn);
    formActions.appendChild(createBtn);
    form.appendChild(formActions);

    modalContent.appendChild(form);
    modalContainer.appendChild(modalContent);
    modalOverlay.appendChild(modalContainer);

    document.body.appendChild(modalOverlay);

    // Focus title input
    setTimeout(() => {
      titleInput.focus();
    }, 0);

    return this;
  };

  /**
   * Shows a task details window
   * @param {string} taskId - ID of the task to show details for
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.showTaskDetailsWindow = function (taskId) {
    // Get the task
    const task = this.getTask(taskId);
    if (!task) {
      console.error("Task not found:", taskId);
      return this;
    }

    // Check if window already exists
    const windowId = `window-task-${taskId}`;
    let taskWindow = document.getElementById(windowId);

    if (taskWindow) {
      // Focus existing window
      this.windowFocus(windowId);
      return this;
    }

    // Create a new window
    taskWindow = document.createElement("div");
    taskWindow.id = windowId;
    taskWindow.className = "window";
    taskWindow.style.position = "absolute";
    taskWindow.style.width = "500px";
    taskWindow.style.height = "400px";
    taskWindow.style.top = "100px";
    taskWindow.style.right = "100px";
    taskWindow.style.display = "flex";
    taskWindow.style.flexDirection = "column";
    taskWindow.style.overflow = "hidden";
    taskWindow.style.backgroundColor = "#ffffff";
    taskWindow.style.border = "1px solid #000000";
    taskWindow.style.boxShadow = this.design.shadows.md;
    taskWindow.style.zIndex = this.getZIndex("window.default"); // Default window z-index

    // Add click handler to focus this window
    taskWindow.addEventListener("mousedown", () => {
      this.windowFocus(windowId);
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
    windowTitle.innerText = `Task: ${task.title}`;
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
    taskWindow.appendChild(windowHeader);

    // Window content
    const windowContent = document.createElement("div");
    windowContent.className = "window__content";
    windowContent.style.flex = "1";
    windowContent.style.display = "flex";
    windowContent.style.flexDirection = "column";
    windowContent.style.padding = "16px";
    windowContent.style.overflow = "auto";

    // Task details
    const detailsContainer = document.createElement("div");
    detailsContainer.style.marginBottom = "16px";

    // Task title
    const titleEl = document.createElement("h2");
    titleEl.innerText = task.title;
    titleEl.style.margin = "0 0 8px 0";
    titleEl.style.fontSize = "16px";
    titleEl.style.fontWeight = "bold";
    detailsContainer.appendChild(titleEl);

    // Status and priority badges
    const badgesContainer = document.createElement("div");
    badgesContainer.style.display = "flex";
    badgesContainer.style.gap = "8px";
    badgesContainer.style.marginBottom = "12px";

    // Fallback implementation for createStatusBadge if it's not available
    if (typeof this.createStatusBadge !== "function") {
      this.createStatusBadge = function (status) {
        const badge = document.createElement("span");
        badge.innerText = status;

        // Apply styles based on status
        badge.style.padding = "2px 6px";
        badge.style.borderRadius = "12px";
        badge.style.fontSize = "10px";
        badge.style.fontWeight = "bold";
        badge.style.textTransform = "uppercase";

        switch (status) {
          case "pending":
            badge.style.backgroundColor = "#e0e0e0";
            badge.style.color = "#606060";
            break;
          case "in_progress":
            badge.style.backgroundColor = "#b3e0ff";
            badge.style.color = "#0066cc";
            break;
          case "completed":
            badge.style.backgroundColor = "#c6f0c6";
            badge.style.color = "#2e7d32";
            break;
          case "cancelled":
            badge.style.backgroundColor = "#ffcccc";
            badge.style.color = "#c62828";
            break;
          default:
            badge.style.backgroundColor = "#e0e0e0";
            badge.style.color = "#606060";
        }

        return badge;
      };
    }

    // Fallback implementation for createPriorityBadge if it's not available
    if (typeof this.createPriorityBadge !== "function") {
      this.createPriorityBadge = function (priority) {
        const badge = document.createElement("span");
        badge.innerText = priority;

        // Apply styles based on priority
        badge.style.padding = "2px 6px";
        badge.style.borderRadius = "12px";
        badge.style.fontSize = "10px";
        badge.style.fontWeight = "bold";
        badge.style.textTransform = "uppercase";

        switch (priority) {
          case "high":
            badge.style.backgroundColor = "#ffcccc";
            badge.style.color = "#c62828";
            break;
          case "medium":
            badge.style.backgroundColor = "#fff0b3";
            badge.style.color = "#a67c00";
            break;
          case "low":
            badge.style.backgroundColor = "#e0e0e0";
            badge.style.color = "#606060";
            break;
          default:
            badge.style.backgroundColor = "#fff0b3";
            badge.style.color = "#a67c00";
        }

        return badge;
      };
    }

    // Status badge - using the design system helper
    const statusBadge = this.createStatusBadge(task.status);
    badgesContainer.appendChild(statusBadge);

    // Priority badge - using the design system helper
    const priorityBadge = this.createPriorityBadge(task.priority);
    // Add "Priority: " prefix to the text
    priorityBadge.innerText = `Priority: ${task.priority}`;

    badgesContainer.appendChild(priorityBadge);
    detailsContainer.appendChild(badgesContainer);

    // Task description
    if (task.description) {
      const descContainer = document.createElement("div");
      descContainer.style.marginBottom = "16px";

      const descLabel = document.createElement("div");
      descLabel.innerText = "Description";
      descLabel.style.fontWeight = "bold";
      descLabel.style.fontSize = "12px";
      descLabel.style.marginBottom = "4px";
      descContainer.appendChild(descLabel);

      const descText = document.createElement("div");
      descText.style.whiteSpace = "pre-wrap";
      descText.style.fontSize = "12px";
      descText.style.lineHeight = "1.4";
      descText.style.backgroundColor = "#f5f5f5";
      descText.style.padding = "8px";
      descText.style.borderRadius = "3px";
      descText.innerText = task.description;
      descContainer.appendChild(descText);

      detailsContainer.appendChild(descContainer);
    }

    // Meta info
    const metaContainer = document.createElement("div");
    metaContainer.style.display = "grid";
    metaContainer.style.gridTemplateColumns = "1fr 1fr";
    metaContainer.style.gap = "8px";
    metaContainer.style.marginBottom = "16px";
    metaContainer.style.fontSize = "12px";

    // Created by
    let createdByName = task.createdBy || "Unknown";
    if (task.createdBy && this.users && this.users[task.createdBy]) {
      createdByName = this.users[task.createdBy].name;
    } else if (task.createdBy && this.agents && this.agents[task.createdBy]) {
      createdByName = this.agents[task.createdBy].name;
    }

    const createdByEl = document.createElement("div");
    createdByEl.innerHTML = `<strong>Created by:</strong> ${createdByName}`;
    metaContainer.appendChild(createdByEl);

    // Created at
    const createdAtEl = document.createElement("div");
    createdAtEl.innerHTML = `<strong>Created:</strong> ${new Date(task.createdAt).toLocaleString()}`;
    metaContainer.appendChild(createdAtEl);

    // Assigned to
    let assignedToName = task.agentId ? "Unassigned" : "Unassigned";
    if (task.agentId && this.agents && this.agents[task.agentId]) {
      assignedToName = this.agents[task.agentId].name;
    } else if (task.agentId && this.users && this.users[task.agentId]) {
      assignedToName = this.users[task.agentId].name;
    }

    const assignedToEl = document.createElement("div");
    assignedToEl.innerHTML = `<strong>Assigned to:</strong> ${assignedToName}`;
    metaContainer.appendChild(assignedToEl);

    // Completed at (if applicable)
    if (task.completedAt) {
      const completedAtEl = document.createElement("div");
      completedAtEl.innerHTML = `<strong>Completed:</strong> ${new Date(task.completedAt).toLocaleString()}`;
      metaContainer.appendChild(completedAtEl);
    }

    detailsContainer.appendChild(metaContainer);

    // Actions buttons
    const actionsContainer = document.createElement("div");
    this.applyStyles(actionsContainer, {
      display: "flex",
      gap: this.design.spacing.md,
      marginBottom: this.design.spacing.xxxl,
    });

    // Actions based on current status
    if (task.status === "pending" || task.status === "in_progress") {
      // Fallback implementation for createButton if it's not available
      if (typeof this.createButton !== "function") {
        this.createButton = function (text, type = "primary", options = {}) {
          const button = document.createElement("button");
          button.innerText = text;

          // Apply base styles based on button type
          switch (type) {
            case "primary":
              button.style.backgroundColor = "#000000";
              button.style.color = "#ffffff";
              button.style.border = "none";
              break;
            case "secondary":
              button.style.backgroundColor = "transparent";
              button.style.color = "#000000";
              button.style.border = "1px solid #000000";
              break;
            case "success":
              button.style.backgroundColor = "#c6f0c6";
              button.style.color = "#2e7d32";
              button.style.border = "none";
              break;
            case "danger":
              button.style.backgroundColor = "#ffcccc";
              button.style.color = "#c62828";
              button.style.border = "none";
              break;
            case "info":
              button.style.backgroundColor = "#b3e0ff";
              button.style.color = "#0066cc";
              button.style.border = "none";
              break;
            default:
              button.style.backgroundColor = "#000000";
              button.style.color = "#ffffff";
              button.style.border = "none";
          }

          // Common styles
          button.style.padding = "6px 12px";
          button.style.borderRadius = "3px";
          button.style.cursor = "pointer";
          button.style.fontSize = "12px";

          // Add click handler if provided
          if (options.onClick) {
            button.addEventListener("click", options.onClick);
          }

          return button;
        };
      }

      // Complete button using design system helper
      const completeBtn = this.createButton("Complete Task", "success", {
        onClick: () => {
          this.updateTask(task.id, {
            status: "completed",
            updatedBy: "user1", // Default to first user for now
          });

          // Update window title and status badge
          windowTitle.innerText = `Task: ${task.title} (Completed)`;

          // Replace the status badge
          const newStatusBadge = this.createStatusBadge("completed");
          badgesContainer.replaceChild(newStatusBadge, statusBadge);

          // Remove action buttons
          actionsContainer.innerHTML = "";

          // Add rerun button
          const rerunBtn = this.createButton("Rerun Task", "info", {
            onClick: () => {
              this.rerunTask(task.id, "user1");
              // Close this window
              this.windowClose(windowId);
            },
          });

          actionsContainer.appendChild(rerunBtn);
        },
      });

      actionsContainer.appendChild(completeBtn);

      // Cancel button using design system helper
      const cancelBtn = this.createButton("Cancel Task", "danger", {
        onClick: () => {
          this.cancelTask(task.id, "user1");

          // Update window title and status badge
          windowTitle.innerText = `Task: ${task.title} (Cancelled)`;

          // Replace the status badge
          const newStatusBadge = this.createStatusBadge("cancelled");
          badgesContainer.replaceChild(newStatusBadge, statusBadge);

          // Remove action buttons
          actionsContainer.innerHTML = "";

          // Add rerun button
          const rerunBtn = this.createButton("Rerun Task", "info", {
            onClick: () => {
              this.rerunTask(task.id, "user1");
              // Close this window
              this.windowClose(windowId);
            },
          });

          actionsContainer.appendChild(rerunBtn);
        },
      });

      actionsContainer.appendChild(cancelBtn);
    } else if (task.status === "completed" || task.status === "cancelled") {
      // Rerun button using design system helper
      const rerunBtn = this.createButton("Rerun Task", "info", {
        onClick: () => {
          this.rerunTask(task.id, "user1");
          // Close this window
          this.windowClose(windowId);
        },
      });

      actionsContainer.appendChild(rerunBtn);
    }

    detailsContainer.appendChild(actionsContainer);
    windowContent.appendChild(detailsContainer);

    // Task history
    const historyContainer = document.createElement("div");

    const historyTitle = document.createElement("h3");
    historyTitle.innerText = "Task History";
    historyTitle.style.margin = "0 0 8px 0";
    historyTitle.style.fontSize = "14px";
    historyTitle.style.fontWeight = "bold";
    historyContainer.appendChild(historyTitle);

    const historyList = document.createElement("div");
    historyList.style.fontSize = "12px";
    historyList.style.border = "1px solid #e0e0e0";
    historyList.style.borderRadius = "3px";

    if (task.history && task.history.length > 0) {
      task.history.forEach((entry, index) => {
        const entryEl = document.createElement("div");
        entryEl.style.padding = "8px";
        entryEl.style.borderBottom = index < task.history.length - 1 ? "1px solid #e0e0e0" : "none";

        // Alternate background colors
        if (index % 2 === 0) {
          entryEl.style.backgroundColor = "#f9f9f9";
        }

        // Entry time
        const timeEl = document.createElement("div");
        timeEl.style.color = "#808080";
        timeEl.style.marginBottom = "4px";
        timeEl.innerText = new Date(entry.timestamp).toLocaleString();
        entryEl.appendChild(timeEl);

        // Entry action and details
        const actionEl = document.createElement("div");

        // Format the action
        let actionText = entry.action;
        if (entry.action === "created") {
          actionText = "Task created";
        } else if (entry.action === "updated") {
          actionText = "Task updated";
        } else if (entry.action === "cancelled") {
          actionText = "Task cancelled";
        } else if (entry.action.startsWith("status_changed_to_")) {
          const newStatus = entry.action.replace("status_changed_to_", "");
          actionText = `Status changed to ${newStatus}`;
        }

        // Add agent name if available
        let agentName = entry.agentId || "system";
        if (entry.agentId && this.users && this.users[entry.agentId]) {
          agentName = this.users[entry.agentId].name;
        } else if (entry.agentId && this.agents && this.agents[entry.agentId]) {
          agentName = this.agents[entry.agentId].name;
        }

        actionEl.innerHTML = `<strong>${actionText}</strong> by ${agentName}`;

        // Add details if available
        if (entry.details && entry.details !== actionText) {
          const detailsEl = document.createElement("div");
          detailsEl.style.marginTop = "4px";
          detailsEl.innerText = entry.details;
          actionEl.appendChild(detailsEl);
        }

        entryEl.appendChild(actionEl);
        historyList.appendChild(entryEl);
      });
    } else {
      const noHistoryEl = document.createElement("div");
      noHistoryEl.style.padding = "12px";
      noHistoryEl.style.textAlign = "center";
      noHistoryEl.style.color = "#808080";
      noHistoryEl.innerText = "No history available";
      historyList.appendChild(noHistoryEl);
    }

    historyContainer.appendChild(historyList);
    windowContent.appendChild(historyContainer);

    taskWindow.appendChild(windowContent);

    // Make window draggable
    this.makeWindowDraggable(taskWindow, windowHeader);

    // Add to DOM
    document.getElementById("desktop").appendChild(taskWindow);

    // Add to windows array
    this.windows.push({
      id: windowId,
      type: "task_details",
      taskId: taskId,
      minimized: false,
    });

    // Focus the newly created window to bring it to the top of the z-index stack
    this.windowFocus(windowId);

    // Auto-tile windows if enabled
    if (this.autoTileWindows) {
      this.tileWindows();
    }

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
    channelWindow.style.boxShadow = this.design.shadows.md;
    channelWindow.style.zIndex = this.getZIndex("window.default"); // Default window z-index

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

    // Focus the newly created window to bring it to the top of the z-index stack
    this.windowFocus(channelWindowId);

    // Auto-tile windows if enabled
    if (this.autoTileWindows) {
      this.tileWindows();
    }

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

      // Create task button
      const createTaskButton = document.createElement("button");
      createTaskButton.innerText = "Create Task";
      createTaskButton.style.padding = "2px 6px";
      createTaskButton.style.backgroundColor = "#4A6DA7";
      createTaskButton.style.color = "#ffffff";
      createTaskButton.style.border = "none";
      createTaskButton.style.cursor = "pointer";
      createTaskButton.style.fontSize = "12px";

      createTaskButton.addEventListener("click", () => {
        // Extract channel info
        const channelId =
          this.channels.find((c) => c.posts && c.posts.some((p) => p.id === post.id))?.id || this.activeChannel;

        // Create a new task for this post
        const taskData = {
          title: `Follow up on message from ${post.author}`,
          description: post.envelope.message,
          status: "pending",
          priority: "medium",
          agentId: null, // Unassigned initially
          createdBy: "user1", // Default to first user
          channelId: channelId,
          postId: post.id,
        };

        // Create the task
        const task = this.createTask(taskData);

        // Show the task details window
        this.showTaskDetailsWindow(task.id);
      });

      actionsContainer.appendChild(replyButton);
      actionsContainer.appendChild(openButton);
      actionsContainer.appendChild(createTaskButton);
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
