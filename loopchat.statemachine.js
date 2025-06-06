((LOOPCHAT) => {
  /**
   * Makes a window element draggable by its header and resizable
   * @param {HTMLElement} windowEl - The window element to make draggable
   * @param {HTMLElement} handle - The element to use as a drag handle (typically the header)
   */
  LOOPCHAT.prototype.makeWindowDraggable = function (windowEl, handle) {
    // Store reference to the LoopChat instance for event handlers
    const loopChat = this;
    
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
      
      // If auto-tiling is enabled, re-tile windows after dragging
      if (loopChat.autoTileWindows) {
        console.log("Window manually dragged - auto-tiling windows");
        // Add a small delay to ensure drag is complete
        setTimeout(() => loopChat.tileWindows(), 50);
      }
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
      
      // If auto-tiling is enabled, re-tile windows after manual resize
      if (loopChat.autoTileWindows) {
        console.log("Window manually resized - auto-tiling windows");
        // Add a small delay to ensure resize is complete
        setTimeout(() => loopChat.tileWindows(), 50);
      }
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

    // Update the main menu's minimized windows section
    if (typeof this.updateMainMenuMinimizedWindows === 'function') {
      this.updateMainMenuMinimizedWindows();
    }
    
    // Auto-tile remaining visible windows if enabled
    if (this.autoTileWindows) {
      setTimeout(() => this.tileWindows(), 10);
    }
    
    // Keep dropdown button highlighted when windows are minimized
    const dropdownToggle = document.getElementById("main-menu-toggle");
    if (dropdownToggle) {
      // Check if any windows are minimized
      const hasMinimizedWindows = this.windows.some(w => w.minimized);
      if (hasMinimizedWindows) {
        dropdownToggle.style.backgroundColor = this.design.colors.primary.light;
      }
    }

    return this;
  };

  // The updateHeaderWindowsDropdown function has been replaced by updateMainMenuMinimizedWindows

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
    
    // Auto-tile windows if enabled
    if (this.autoTileWindows) {
      this.tileWindows();
    }

    // Update the main menu's minimized windows section
    if (typeof this.updateMainMenuMinimizedWindows === 'function') {
      this.updateMainMenuMinimizedWindows();
    }
    
    // Check if any windows are still minimized
    const hasMinimizedWindows = this.windows.some((w) => w.minimized);
    
    // Update dropdown toggle style
    const dropdownToggle = document.getElementById("main-menu-toggle");
    if (dropdownToggle) {
      if (hasMinimizedWindows) {
        dropdownToggle.style.backgroundColor = this.design.colors.primary.light;
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
      
      // Auto-tile windows if enabled
      if (this.autoTileWindows) {
        this.tileWindows();
      }
    }

    // Update the main menu's minimized windows section
    if (typeof this.updateMainMenuMinimizedWindows === 'function') {
      this.updateMainMenuMinimizedWindows();
    }
    
    // Update dropdown toggle style
    const dropdownToggle = document.getElementById("main-menu-toggle");
    if (dropdownToggle) {
      const hasMinimizedWindows = this.windows.some((w) => w.minimized);
      if (hasMinimizedWindows) {
        dropdownToggle.style.backgroundColor = this.design.colors.primary.light;
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
        win.style.zIndex = this.getZIndex("window.default");
      }
    });

    // Set this window to the highest z-index
    windowEl.style.zIndex = this.getZIndex("window.focused");
    
    // Auto-tile windows if enabled - with a small delay
    if (this.autoTileWindows) {
      setTimeout(() => this.tileWindows(), 10);
    }

    // If the window has a title element, you could add a visual indication
    const windowTitle = windowEl.querySelector(".window__header");
    if (windowTitle) {
      // Add subtle highlight to focused window header
      windowTitle.style.backgroundColor = this.design.components.window.header.backgroundFocus || "#222222";

      // Reset other window headers
      windows.forEach((win) => {
        if (win.id !== windowId) {
          const title = win.querySelector(".window__header");
          if (title) {
            title.style.backgroundColor = this.design.components.window.header.background || "#000000";
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
  
  /**
   * Tiles all visible windows in a grid layout so they're all visible
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.tileWindows = function () {
    // Get desktop dimensions
    const desktop = document.getElementById("desktop");
    if (!desktop) return this;
    
    // Account for toolbar height
    const toolbarHeight = parseInt(this.design.components.toolbar.height || "30px");
    const desktopRect = desktop.getBoundingClientRect();
    
    // Use full available space
    const availableWidth = desktopRect.width;
    const availableHeight = desktopRect.height - toolbarHeight;
    
    // Get all visible windows
    const visibleWindows = this.windows.filter(window => !window.minimized)
      .map(window => document.getElementById(window.id))
      .filter(el => el !== null);
    
    if (visibleWindows.length === 0) return this;
    
    // Calculate grid dimensions
    let columns, rows;
    if (visibleWindows.length <= 2) {
      columns = visibleWindows.length;
      rows = 1;
    } else if (visibleWindows.length <= 4) {
      columns = 2;
      rows = Math.ceil(visibleWindows.length / 2);
    } else {
      // Calculate the square root and round to find a reasonable grid size
      const sqrt = Math.sqrt(visibleWindows.length);
      columns = Math.ceil(sqrt);
      rows = Math.ceil(visibleWindows.length / columns);
    }
    
    // Calculate window dimensions - use full available space
    const windowWidth = Math.floor(availableWidth / columns);
    const windowHeight = Math.floor(availableHeight / rows);
    
    // Calculate total grid spaces in the layout
    const totalGridSpaces = columns * rows;
    
    // Position each window
    visibleWindows.forEach((windowEl, index) => {
      // Special handling for the last window if there are empty spaces
      const isLastWindow = index === visibleWindows.length - 1;
      const hasEmptySpaces = visibleWindows.length < totalGridSpaces;
      
      if (isLastWindow && hasEmptySpaces) {
        // Calculate how many empty grid spaces remain
        const emptySpaces = totalGridSpaces - visibleWindows.length;
        
        // Calculate the position and size based on the current grid cell
        const row = Math.floor(index / columns);
        const col = index % columns;
        
        // Position - exact fit without gaps
        const top = (row * windowHeight) + toolbarHeight;
        const left = col * windowWidth;
        
        // Determine the expansion strategy based on the grid layout and empty spaces
        let expandStrategy = '';
        let width = windowWidth;
        let height = windowHeight;
        
        // Check if we can expand to the right (horizontal expansion)
        const remainingColsInRow = columns - col;
        const canExpandRight = remainingColsInRow > 1;
        
        // Check if we can expand downward (vertical expansion)
        const remainingRows = rows - row - 1;
        const canExpandDown = remainingRows > 0;
        
        if (canExpandRight && canExpandDown) {
          // Can expand both horizontally and vertically - use an L-shape or rectangle
          expandStrategy = 'L-shape';
          width = windowWidth * remainingColsInRow;
          height = windowHeight * (1 + remainingRows);
        } else if (canExpandRight) {
          // Can only expand horizontally - expand to the end of the row
          expandStrategy = 'horizontal';
          width = windowWidth * remainingColsInRow;
        } else if (canExpandDown) {
          // Can only expand vertically - expand to the bottom of the grid
          expandStrategy = 'vertical';
          height = windowHeight * (1 + remainingRows);
        } else {
          // Cannot expand - standard size
          expandStrategy = 'none';
        }
        
        // Apply expanded position and size
        windowEl.style.top = `${top}px`;
        windowEl.style.left = `${left}px`;
        windowEl.style.width = `${width}px`;
        windowEl.style.height = `${height}px`;
        
        console.log(`Last window expanded using ${expandStrategy} strategy to fill empty spaces. Grid: ${columns}x${rows}, Window at: row ${row}, col ${col}`);
      } else {
        // Standard window positioning for non-last windows
        const row = Math.floor(index / columns);
        const col = index % columns;
        
        // Position - exact fit without gaps
        const top = (row * windowHeight) + toolbarHeight;
        const left = col * windowWidth;
        
        // Apply position and size - exact dimensions
        windowEl.style.top = `${top}px`;
        windowEl.style.left = `${left}px`;
        windowEl.style.width = `${windowWidth}px`;
        windowEl.style.height = `${windowHeight}px`;
      }
    });
    
    return this;
  };
})(window.LoopChat);
