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
   * Minimizes a window to the taskbar
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

    // render or update taskbar if it doesn't exist
    let taskbar = document.getElementById("desktop__taskbar");
    if (!taskbar) {
      taskbar = document.createElement("div");
      taskbar.id = "desktop__taskbar";
      taskbar.style.position = "fixed";
      taskbar.style.bottom = "0";
      taskbar.style.right = "0";
      taskbar.style.left = "0"; // Span the entire width of the screen
      taskbar.style.height = "30px";
      taskbar.style.backgroundColor = "#f0f0f0";
      taskbar.style.display = "flex";
      taskbar.style.alignItems = "center";
      taskbar.style.padding = "0 8px";
      taskbar.style.borderTop = "1px solid #000000";
      taskbar.style.zIndex = "100"; // Ensure it's above other elements

      document.getElementById("desktop").appendChild(taskbar);
    }

    // render taskbar button if it doesn't exist
    let taskbarButton = document.getElementById(`taskbar-button-${windowId}`);
    if (!taskbarButton) {
      let buttonLabel = "Window";
      
      // Get appropriate label based on window type
      const windowData = this.windows[windowIndex];
      
      if (windowData.type === "channels") {
        buttonLabel = "Channels";
      } 
      else if (windowData.type === "input") {
        buttonLabel = "Message Input";
      }
      else if (windowData.type === "channel" && windowData.channelId) {
        // For channel windows, use the channel name
        const channel = this.channels.find(c => c.id === windowData.channelId);
        if (channel) {
          buttonLabel = `# ${channel.title || channel.id}`;
        }
      }
      else if (windowData.post) {
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

      taskbarButton = document.createElement("button");
      taskbarButton.id = `taskbar-button-${windowId}`;
      taskbarButton.innerText = buttonLabel;
      taskbarButton.style.padding = "2px 6px";
      taskbarButton.style.marginRight = "4px";
      taskbarButton.style.backgroundColor = "#ffffff";
      taskbarButton.style.border = "1px solid #000000";
      taskbarButton.style.cursor = "pointer";
      taskbarButton.style.fontSize = "12px";

      taskbarButton.addEventListener("click", () => {
        this.windowRestore(windowId);
      });

      taskbar.appendChild(taskbarButton);
    }

    return this;
  };

  /**
   * Restores a minimized window from the taskbar
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

    // Remove taskbar button if no windows are minimized
    const hasMinimizedWindows = this.windows.some((w) => w.minimized);
    if (!hasMinimizedWindows) {
      const taskbar = document.getElementById("desktop__taskbar");
      if (taskbar) {
        taskbar.remove();
      }
    } else {
      // Just remove this window's button
      const taskbarButton = document.getElementById(`taskbar-button-${windowId}`);
      if (taskbarButton) {
        taskbarButton.remove();
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
    // Prevent channels window from being closed
    if (windowId === "window-channels") {
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

    // Remove taskbar button if exists
    const taskbarButton = document.getElementById(`taskbar-button-${windowId}`);
    if (taskbarButton) {
      taskbarButton.remove();
    }

    // Remove taskbar if no windows are minimized
    const hasMinimizedWindows = this.windows.some((w) => w.minimized);
    if (!hasMinimizedWindows) {
      const taskbar = document.getElementById("desktop__taskbar");
      if (taskbar) {
        taskbar.remove();
      }
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