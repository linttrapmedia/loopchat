((LOOPCHAT) => {
  /**
   * Makes a window element draggable by its header and resizable
   * @param {HTMLElement} windowEl - The window element to make draggable
   * @param {HTMLElement} handle - The element to use as a drag handle (typically the header)
   */
  LOOPCHAT.prototype.makeWindowDraggable = function (windowEl, handle) {
    // Dragging functionality
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    handle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // Get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // Call a function whenever the cursor moves
      document.onmousemove = elementDrag;

      // Bring window to front
      windowEl.style.zIndex = "1000";
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Set the element's new position
      windowEl.style.top = windowEl.offsetTop - pos2 + "px";
      windowEl.style.left = windowEl.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
    }

    // Add resizing functionality with a resize handle
    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    resizeHandle.style.position = "absolute";
    resizeHandle.style.width = "14px";
    resizeHandle.style.height = "14px";
    resizeHandle.style.bottom = "0";
    resizeHandle.style.right = "0";
    resizeHandle.style.cursor = "nwse-resize";
    resizeHandle.style.background = "transparent";

    // Create small visual indicator in the corner
    const resizeIndicator = document.createElement("div");
    resizeIndicator.style.position = "absolute";
    resizeIndicator.style.width = "8px";
    resizeIndicator.style.height = "8px";
    resizeIndicator.style.bottom = "3px";
    resizeIndicator.style.right = "3px";
    resizeIndicator.style.borderRight = "2px solid #888";
    resizeIndicator.style.borderBottom = "2px solid #888";
    resizeHandle.appendChild(resizeIndicator);

    windowEl.appendChild(resizeHandle);

    // Resizing logic
    resizeHandle.onmousedown = resizeMouseDown;

    let startWidth, startHeight, startX, startY;

    function resizeMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      e.stopPropagation();

      // Get initial positions
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(windowEl).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(windowEl).height, 10);

      document.addEventListener("mousemove", resizeMouseMove);
      document.addEventListener("mouseup", resizeMouseUp);

      // Bring window to front
      windowEl.style.zIndex = "1000";
    }

    function resizeMouseMove(e) {
      e = e || window.event;
      e.preventDefault();

      // Calculate new size
      const newWidth = Math.max(200, startWidth + e.clientX - startX);
      const newHeight = Math.max(150, startHeight + e.clientY - startY);

      // Apply new size
      windowEl.style.width = newWidth + "px";
      windowEl.style.height = newHeight + "px";
    }

    function resizeMouseUp() {
      document.removeEventListener("mousemove", resizeMouseMove);
      document.removeEventListener("mouseup", resizeMouseUp);
    }
  };

  /**
   * Minimizes a window to the header dropdown
   * @param {string} windowId - ID of the window to minimize
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.windowMinimize = function (windowId) {
    const windowEl = document.getElementById(windowId);
    if (!windowEl) return;

    // Find the window in our array
    const windowIndex = this.windows.findIndex((w) => w.id === windowId);
    if (windowIndex === -1) return;

    // Update window state
    this.windows[windowIndex].minimized = true;

    // Hide the window
    windowEl.style.display = "none";

    // Get appropriate label based on window type
    const windowData = this.windows[windowIndex];
    let buttonLabel = "Window";

    if (windowData.type === "channels") {
      buttonLabel = "Channels";
    } else if (windowData.type === "agents") {
      buttonLabel = "Agents";
    } else if (windowData.type === "sidebar") {
      buttonLabel = "Directory";
    } else if (windowData.type === "input") {
      buttonLabel = "Message Input";
    } else if (windowData.type === "tasks") {
      buttonLabel = "Tasks";
    } else if (windowData.type === "task_details" && windowData.taskId) {
      const task = this.getTask(windowData.taskId);
      if (task) {
        buttonLabel = `Task: ${task.title.substring(0, 15)}${task.title.length > 15 ? "..." : ""}`;
      } else {
        buttonLabel = "Task Details";
      }
    } else if (windowData.type === "channel" && windowData.channelId) {
      // For channel windows, use the channel name
      const channel = this.channels.find((c) => c.id === windowData.channelId);
      if (channel) {
        buttonLabel = `# ${channel.title || channel.id}`;
      }
    } else if (windowData.post) {
      // For message windows from the original implementation
      const post = windowData.post;

      // Get author name if available
      if (post.author) {
        let authorName = post.author;
        if (this.users && this.users[post.author]) {
          authorName = this.users[post.author].name;
        } else if (this.agents && this.agents[post.author]) {
          authorName = this.agents[post.author].name;
        }
        buttonLabel = authorName;
      }
    }

    // Create or update the header windows dropdown
    this.updateHeaderWindowsDropdown();

    // Add this window to the dropdown
    const windowsDropdown = document.getElementById("header__windows-dropdown-menu");
    if (windowsDropdown) {
      // Check if window is already in dropdown
      let windowItem = document.getElementById(`header-window-item-${windowId}`);

      if (!windowItem) {
        // Create new window item in dropdown
        windowItem = document.createElement("div");
        windowItem.id = `header-window-item-${windowId}`;
        windowItem.innerText = buttonLabel;
        windowItem.style.padding = "6px 10px";
        windowItem.style.cursor = "pointer";
        windowItem.style.color = "#000000";
        windowItem.style.fontSize = "11px";
        windowItem.style.borderBottom = "1px solid #e0e0e0";

        windowItem.addEventListener("mouseover", () => {
          windowItem.style.backgroundColor = "#f0f0f0";
        });

        windowItem.addEventListener("mouseout", () => {
          windowItem.style.backgroundColor = "transparent";
        });

        windowItem.addEventListener("click", () => {
          // Hide dropdown
          windowsDropdown.style.display = "none";

          // Restore window
          this.windowRestore(windowId);
        });

        windowsDropdown.appendChild(windowItem);
      }
    }

    return this;
  };

  /**
   * Creates or updates the Windows dropdown menu in the header
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.updateHeaderWindowsDropdown = function () {
    // Get the toolbar
    const toolbar = document.getElementById("desktop__toolbar");
    if (!toolbar) return this;

    // Check if windows dropdown already exists
    let windowsDropdownContainer = document.getElementById("header__windows-dropdown");

    if (!windowsDropdownContainer) {
      // Create the dropdown container
      windowsDropdownContainer = document.createElement("div");
      windowsDropdownContainer.id = "header__windows-dropdown";
      windowsDropdownContainer.style.position = "relative";
      windowsDropdownContainer.style.marginRight = "10px";

      // Windows dropdown toggle button with windows icon
      const dropdownToggle = document.createElement("button");
      dropdownToggle.id = "header__windows-dropdown-toggle";
      dropdownToggle.innerHTML = "⊞"; // Windows icon
      dropdownToggle.style.padding = "2px 8px";
      dropdownToggle.style.backgroundColor = "transparent";
      dropdownToggle.style.color = "#ffffff";
      dropdownToggle.style.border = "0";
      dropdownToggle.style.borderRadius = "3px";
      dropdownToggle.style.cursor = "pointer";
      dropdownToggle.style.fontSize = "14px";

      // Windows dropdown menu
      const dropdownMenu = document.createElement("div");
      dropdownMenu.id = "header__windows-dropdown-menu";
      dropdownMenu.style.position = "absolute";
      dropdownMenu.style.top = "100%";
      dropdownMenu.style.right = "0";
      dropdownMenu.style.backgroundColor = "#ffffff";
      dropdownMenu.style.border = "1px solid #000000";
      dropdownMenu.style.borderRadius = "3px";
      dropdownMenu.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
      dropdownMenu.style.display = "none";
      dropdownMenu.style.zIndex = "9999";
      dropdownMenu.style.minWidth = "180px";
      dropdownMenu.style.maxHeight = "300px";
      dropdownMenu.style.overflowY = "auto";

      // No windows message (shown when empty)
      const noWindowsMessage = document.createElement("div");
      noWindowsMessage.id = "header__no-windows-message";
      noWindowsMessage.innerText = "No minimized windows";
      noWindowsMessage.style.padding = "8px 10px";
      noWindowsMessage.style.color = "#808080";
      noWindowsMessage.style.fontStyle = "italic";
      noWindowsMessage.style.fontSize = "11px";
      noWindowsMessage.style.textAlign = "center";

      dropdownMenu.appendChild(noWindowsMessage);

      // Toggle dropdown visibility
      dropdownToggle.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent click from reaching document
        const hasMinimizedWindows = this.windows.some((w) => w.minimized);

        // Update the no windows message visibility
        const noWindowsMsg = document.getElementById("header__no-windows-message");
        if (noWindowsMsg) {
          noWindowsMsg.style.display = hasMinimizedWindows ? "none" : "block";
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
      windowsDropdownContainer.appendChild(dropdownToggle);
      windowsDropdownContainer.appendChild(dropdownMenu);

      // Insert before the hamburger menu (which should be the last item)
      const hamburgerContainer = toolbar.querySelector("div:last-child");
      toolbar.insertBefore(windowsDropdownContainer, hamburgerContainer);
    }

    // Check if any windows are minimized and update the dropdown toggle style
    const hasMinimizedWindows = this.windows.some((w) => w.minimized);
    const dropdownToggle = document.getElementById("header__windows-dropdown-toggle");

    if (dropdownToggle) {
      if (hasMinimizedWindows) {
        dropdownToggle.style.backgroundColor = "#1a1a1a"; // Highlight when windows are minimized
      } else {
        dropdownToggle.style.backgroundColor = "transparent";
      }
    }

    return this;
  };

  /**
   * Restores a minimized window from the header dropdown
   * @param {string} windowId - ID of the window to restore
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.windowRestore = function (windowId) {
    const windowEl = document.getElementById(windowId);
    if (!windowEl) return;

    // Find the window in our array
    const windowIndex = this.windows.findIndex((w) => w.id === windowId);
    if (windowIndex === -1) return;

    // Update window state
    this.windows[windowIndex].minimized = false;

    // Show the window
    windowEl.style.display = "flex";

    // Focus the window
    this.windowFocus(windowId);

    // Remove the window item from the dropdown
    const windowItem = document.getElementById(`header-window-item-${windowId}`);
    if (windowItem) {
      windowItem.remove();
    }

    // Check if any windows are still minimized and update the dropdown
    const hasMinimizedWindows = this.windows.some((w) => w.minimized);

    // Update the no windows message visibility
    const noWindowsMsg = document.getElementById("header__no-windows-message");
    if (noWindowsMsg) {
      noWindowsMsg.style.display = hasMinimizedWindows ? "none" : "block";
    }

    // Update dropdown toggle style
    const dropdownToggle = document.getElementById("header__windows-dropdown-toggle");
    if (dropdownToggle) {
      if (hasMinimizedWindows) {
        dropdownToggle.style.backgroundColor = "#4A6DA7";
      } else {
        dropdownToggle.style.backgroundColor = "transparent";
      }
    }

    return this;
  };

  /**
   * Closes a window and removes it from the DOM and state
   * @param {string} windowId - ID of the window to close
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.windowClose = function (windowId) {
    // Check if this window is uncloseable
    const windowData = this.windows.find((w) => w.id === windowId);

    // Prevent uncloseable windows from being closed (sidebar, tasks)
    if (windowId === "window-sidebar" || windowId === "window-tasks" || (windowData && windowData.uncloseable)) {
      // Just minimize it instead
      this.windowMinimize(windowId);
      return this;
    }

    const windowEl = document.getElementById(windowId);
    if (!windowEl) return this;

    // Remove from DOM
    windowEl.remove();

    // Remove from our array
    const windowIndex = this.windows.findIndex((w) => w.id === windowId);
    if (windowIndex !== -1) {
      this.windows.splice(windowIndex, 1);
    }

    // Remove from header dropdown if it was minimized
    const windowItem = document.getElementById(`header-window-item-${windowId}`);
    if (windowItem) {
      windowItem.remove();
    }

    // Check if any windows are still minimized and update the dropdown
    const hasMinimizedWindows = this.windows.some((w) => w.minimized);

    // Update the no windows message visibility
    const noWindowsMsg = document.getElementById("header__no-windows-message");
    if (noWindowsMsg) {
      noWindowsMsg.style.display = hasMinimizedWindows ? "none" : "block";
    }

    // Update dropdown toggle style
    const dropdownToggle = document.getElementById("header__windows-dropdown-toggle");
    if (dropdownToggle) {
      if (hasMinimizedWindows) {
        dropdownToggle.style.backgroundColor = "#4A6DA7";
      } else {
        dropdownToggle.style.backgroundColor = "transparent";
      }
    }

    // Remove old taskbar button if exists (from previous implementation)
    const taskbarButton = document.getElementById(`taskbar-button-${windowId}`);
    if (taskbarButton) {
      taskbarButton.remove();
    }

    return this;
  };

  /**
   * Brings a window to the front (focuses it)
   * @param {string} windowId - ID of the window to focus
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.windowFocus = function (windowId) {
    const windowEl = document.getElementById(windowId);
    if (!windowEl) return this;

    // Bring to front by setting highest z-index
    const windows = document.querySelectorAll(".window");
    windows.forEach((win) => {
      if (win.id !== windowId) {
        // Lower all other windows
        win.style.zIndex = "10";
      }
    });

    // Set this window to the highest z-index
    windowEl.style.zIndex = "1000";

    // If the window has a title element, you could add a visual indication
    const windowTitle = windowEl.querySelector(".window__header");
    if (windowTitle) {
      // Add subtle highlight to focused window header
      windowTitle.style.backgroundColor = "#222222";

      // Reset other window headers
      windows.forEach((win) => {
        if (win.id !== windowId) {
          const title = win.querySelector(".window__header");
          if (title) {
            title.style.backgroundColor = "#000000";
          }
        }
      });
    }

    return this;
  };

  /**
   * Toggles the expanded state of the message input window
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.toggleExpandMessageInput = function () {
    const inputWindow = document.getElementById("window-message-input");

    if (!inputWindow) return this;

    // Simply resize the window
    if (inputWindow.style.height === "150px") {
      // Expand
      inputWindow.style.height = "300px";
    } else {
      // Collapse
      inputWindow.style.height = "150px";
    }

    return this;
  };

  // These methods are no longer needed in the window-based layout
  // as windows already have minimize/maximize functionality

  /**
   * Legacy method - now minimizes the channels window
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.toggleChannelsList = function () {
    // Just minimize the channels window
    this.windowMinimize("window-channels");
    return this;
  };

  /**
   * Legacy method - now minimizes the messages window
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.toggleContentArea = function () {
    // Just minimize the messages window
    this.windowMinimize("window-messages");
    return this;
  };
})(window.LoopChat);
