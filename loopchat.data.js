((LOOPCHAT) => {
  /**
   * Loads test data from test-fixtures.json file
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.loadTestData = function () {
    const loadData = async () => {
      try {
        const response = await fetch("./test-fixtures.json");
        if (!response.ok) {
          throw new Error(`Failed to load test data: ${response.status}`);
        }

        const data = await response.json();
        this.testData = data;

        // Process users data
        if (data.users && Array.isArray(data.users)) {
          console.log("Loading users data:", data.users);
          this.users = {}; // Reset users map
          data.users.forEach((user) => {
            this.users[user.id] = user;
          });
          console.log("Users loaded:", Object.keys(this.users).length);
        }

        // Process agents data
        if (data.agents && Array.isArray(data.agents)) {
          console.log("Loading agents data:", data.agents);
          this.agents = {}; // Reset agents map
          data.agents.forEach((agent) => {
            this.agents[agent.id] = agent;
          });
          console.log("Agents loaded:", Object.keys(this.agents).length);
        }

        // Process channels (threads)
        this.channels = data.threads || [];

        // Initialize tasks if they exist in test data
        if (data.tasks && Array.isArray(data.tasks)) {
          console.log("Loading tasks data:", data.tasks);
          this.tasks = data.tasks;
        } else {
          // Initialize with empty tasks array
          this.tasks = [];
        }

        // Set active channel if there are channels
        if (this.channels.length > 0) {
          this.activeChannel = this.channels[0].id;

          // render the active channel content
          const channelContent = document.getElementById("channel__content");
          if (channelContent) {
            this.renderChannelContent(this.activeChannel);
          }

          // Update UI to reflect the selected channel
          const tabs = document.querySelectorAll(".channel__tab");
          tabs.forEach((tab) => {
            const tabEl = /** @type {HTMLElement} */ (tab);
            if (tabEl.id === `channel__tab-${this.activeChannel}`) {
              tabEl.style.backgroundColor = "#e0e0e0";
              tabEl.style.borderLeft = "2px solid #000000";
            } else {
              tabEl.style.backgroundColor = "transparent";
              tabEl.style.borderLeft = "2px solid transparent";
            }
          });
        }

        console.log("Test data loaded successfully:", this.testData);
      } catch (error) {
        console.error("Error loading test data:", error);

        // Fallback to default channels if loading fails - use the same IDs as in test data
        this.channels = [
          { id: "general", title: "General" },
          { id: "support", title: "Support" },
          { id: "development", title: "Development" },
        ];
        this.activeChannel = "general";
        
        // Initialize empty tasks array
        this.tasks = [];
      }
    };

    // Execute the async function
    loadData();

    return this;
  };

  /**
   * Sends a message in the currently active channel
   * @param {string} message - The message text to send
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.sendMessage = function (message) {
    if (!this.activeChannel) return;

    // Find the channel
    const channel = this.channels.find((c) => c.id === this.activeChannel);
    if (!channel) return;

    // Default author - use the first user if available, otherwise "user1"
    let authorId = "user1";
    if (this.users && Object.keys(this.users).length > 0) {
      authorId = Object.keys(this.users)[0];
    }

    // Create a new post
    const newPost = {
      id: `post${Date.now()}`,
      author: authorId,
      timestamp: new Date().toISOString(),
      envelope: {
        type: "call",
        message: message,
      },
    };

    // Add to channel posts
    if (!channel.posts) channel.posts = [];
    channel.posts.push(newPost);

    // Update the channel window
    this.updateChannelWindow(this.activeChannel);
    
    // Clear the message input field 
    const messageInputField = document.getElementById("message__input_field");
    if (messageInputField) {
      messageInputField.value = "";
    }

    // Simulate response after a delay
    setTimeout(() => {
      this.simulateResponse(message);
    }, 1000);

    return this;
  };

  /**
   * Simulates an automated response to a user message
   * @param {string} message - The original user message that triggered the response
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.simulateResponse = function (message) {
    if (!this.activeChannel) return;

    // Find the channel
    const channel = this.channels.find((c) => c.id === this.activeChannel);
    if (!channel) return;

    // Choose a random agent if available, otherwise use "system"
    let authorId = "system";
    if (this.agents && Object.keys(this.agents).length > 0) {
      const agentIds = Object.keys(this.agents);
      authorId = agentIds[Math.floor(Math.random() * agentIds.length)];
    }

    // Create a response post
    const responsePost = {
      id: `post${Date.now()}`,
      author: authorId,
      timestamp: new Date().toISOString(),
      envelope: {
        type: "answer",
        recipients: ["user1"],
        message: `This is an automated response to: "${message}"`,
        attachments: [],
      },
    };

    // Add to channel posts
    if (!channel.posts) channel.posts = [];
    channel.posts.push(responsePost);

    // Create a task for this response (simulating agent doing work)
    const taskData = {
      title: `Process request: "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}"`,
      description: `Process and respond to user query: "${message}"\n\nResponse: "${responsePost.envelope.message}"`,
      status: Math.random() > 0.3 ? "completed" : "in_progress", // Randomly complete some tasks
      priority: Math.random() > 0.7 ? "high" : (Math.random() > 0.4 ? "medium" : "low"), // Random priority
      agentId: authorId,
      createdBy: "user1", // Default to first user
      channelId: this.activeChannel,
      postId: responsePost.id
    };
    
    // If task is completed, add completedAt timestamp
    if (taskData.status === "completed") {
      taskData.completedAt = new Date().toISOString();
      
      // Add completion to history
      if (!taskData.history) {
        taskData.history = [];
      }
      taskData.history.push({
        timestamp: taskData.completedAt,
        action: "status_changed_to_completed",
        agentId: authorId,
        details: "Task automatically completed"
      });
    }
    
    // Create the task
    this.createTask(taskData);

    // Update the channel window
    this.updateChannelWindow(this.activeChannel);

    return this;
  };

  /**
   * Activates a channel and opens a window for it
   * @param {string} channelId - The ID of the channel to activate
   * @returns {LoopChat} The LoopChat instance for chaining
   */
  LOOPCHAT.prototype.activateChannel = function (channelId) {
    console.log("Activating channel:", channelId);
    
    // Check if channel exists
    const channelExists = this.channels.some(c => c.id === channelId);
    if (!channelExists) {
      console.error("Tried to activate non-existent channel:", channelId);
      console.log("Available channels:", this.channels.map(c => c.id));
      return this;
    }
    
    // Open or focus the channel window
    this.openChannelWindow(channelId);
    
    return this;
  };

  /**
   * Creates a new task
   * @param {Object} taskData - Task data
   * @param {string} taskData.id - Unique task ID (optional, will be generated if not provided)
   * @param {string} taskData.title - Task title
   * @param {string} taskData.description - Task description
   * @param {string} taskData.status - Task status: 'pending', 'in_progress', 'completed', 'cancelled'
   * @param {string} taskData.priority - Task priority: 'high', 'medium', 'low'
   * @param {string} taskData.agentId - ID of the agent assigned to the task
   * @param {string} taskData.createdBy - ID of the user or agent who created the task
   * @param {string} taskData.createdAt - ISO timestamp when the task was created
   * @param {string} [taskData.completedAt] - ISO timestamp when the task was completed
   * @param {string} [taskData.channelId] - ID of the channel associated with the task
   * @param {string} [taskData.postId] - ID of the post that triggered the task
   * @param {Object[]} [taskData.history] - Array of task history events
   * @returns {Object} The created task
   */
  LOOPCHAT.prototype.createTask = function (taskData) {
    // Generate an ID if not provided
    const taskId = taskData.id || `task_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Create the task object with defaults
    const task = {
      id: taskId,
      title: taskData.title || "Untitled Task",
      description: taskData.description || "",
      status: taskData.status || "pending",
      priority: taskData.priority || "medium",
      agentId: taskData.agentId || null,
      createdBy: taskData.createdBy || "system",
      createdAt: taskData.createdAt || new Date().toISOString(),
      completedAt: taskData.completedAt || null,
      channelId: taskData.channelId || this.activeChannel,
      postId: taskData.postId || null,
      history: taskData.history || [
        {
          timestamp: new Date().toISOString(),
          action: "created",
          agentId: taskData.createdBy || "system",
          details: "Task created"
        }
      ]
    };
    
    // Add to tasks array
    if (!this.tasks) {
      this.tasks = [];
    }
    this.tasks.push(task);
    
    // Update the tasks window if it exists
    this.updateTasksWindow();
    
    console.log("Task created:", task);
    return task;
  };

  /**
   * Updates an existing task
   * @param {string} taskId - ID of the task to update
   * @param {Object} updateData - Fields to update
   * @returns {Object|null} The updated task or null if not found
   */
  LOOPCHAT.prototype.updateTask = function (taskId, updateData) {
    if (!this.tasks) {
      return null;
    }
    
    // Find the task
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      console.error("Task not found:", taskId);
      return null;
    }
    
    const task = this.tasks[taskIndex];
    
    // Create a history entry for the update
    const historyEntry = {
      timestamp: new Date().toISOString(),
      action: "updated",
      agentId: updateData.updatedBy || "system",
      details: "Task updated"
    };
    
    // Special handling for status changes
    if (updateData.status && updateData.status !== task.status) {
      historyEntry.action = `status_changed_to_${updateData.status}`;
      historyEntry.details = `Status changed from '${task.status}' to '${updateData.status}'`;
      
      // Set completedAt timestamp if the status is changing to 'completed'
      if (updateData.status === "completed" && task.status !== "completed") {
        updateData.completedAt = new Date().toISOString();
      }
    }
    
    // Add the history entry
    if (!task.history) {
      task.history = [];
    }
    task.history.push(historyEntry);
    
    // Update the task fields
    Object.keys(updateData).forEach(key => {
      if (key !== 'id' && key !== 'history') { // Don't allow updating ID or history directly
        task[key] = updateData[key];
      }
    });
    
    // Update the tasks array
    this.tasks[taskIndex] = task;
    
    // Update the tasks window if it exists
    this.updateTasksWindow();
    
    console.log("Task updated:", task);
    return task;
  };

  /**
   * Gets all tasks or filters by criteria
   * @param {Object} [filters] - Optional filters
   * @param {string} [filters.status] - Filter by status
   * @param {string} [filters.agentId] - Filter by agent ID
   * @param {string} [filters.channelId] - Filter by channel ID
   * @param {string} [filters.priority] - Filter by priority
   * @returns {Array} Array of matching tasks
   */
  LOOPCHAT.prototype.getTasks = function (filters = {}) {
    if (!this.tasks) {
      return [];
    }
    
    // If no filters, return all tasks
    if (Object.keys(filters).length === 0) {
      return [...this.tasks];
    }
    
    // Apply filters
    return this.tasks.filter(task => {
      let matches = true;
      
      if (filters.status && task.status !== filters.status) {
        matches = false;
      }
      
      if (filters.agentId && task.agentId !== filters.agentId) {
        matches = false;
      }
      
      if (filters.channelId && task.channelId !== filters.channelId) {
        matches = false;
      }
      
      if (filters.priority && task.priority !== filters.priority) {
        matches = false;
      }
      
      return matches;
    });
  };

  /**
   * Gets a single task by ID
   * @param {string} taskId - ID of the task to get
   * @returns {Object|null} The task or null if not found
   */
  LOOPCHAT.prototype.getTask = function (taskId) {
    if (!this.tasks) {
      return null;
    }
    
    return this.tasks.find(task => task.id === taskId) || null;
  };

  /**
   * Cancels a task
   * @param {string} taskId - ID of the task to cancel
   * @param {string} [cancelledBy] - ID of the agent/user cancelling the task
   * @param {string} [reason] - Reason for cancellation
   * @returns {Object|null} The cancelled task or null if not found
   */
  LOOPCHAT.prototype.cancelTask = function (taskId, cancelledBy = "system", reason = "Task cancelled") {
    return this.updateTask(taskId, {
      status: "cancelled",
      updatedBy: cancelledBy,
      history: [
        {
          timestamp: new Date().toISOString(),
          action: "cancelled",
          agentId: cancelledBy,
          details: reason
        }
      ]
    });
  };

  /**
   * Rerun/restart a task
   * @param {string} taskId - ID of the task to rerun
   * @param {string} [rerunBy] - ID of the agent/user rerunning the task
   * @returns {Object|null} The rerun task or null if not found
   */
  LOOPCHAT.prototype.rerunTask = function (taskId, rerunBy = "system") {
    const task = this.getTask(taskId);
    if (!task) {
      return null;
    }
    
    // Create a new task based on the original
    const newTaskData = {
      title: `Rerun: ${task.title}`,
      description: task.description,
      priority: task.priority,
      agentId: task.agentId,
      createdBy: rerunBy,
      channelId: task.channelId,
      postId: task.postId,
      history: [
        {
          timestamp: new Date().toISOString(),
          action: "created",
          agentId: rerunBy,
          details: `Task rerun from task ID: ${taskId}`
        }
      ]
    };
    
    return this.createTask(newTaskData);
  };
})(window.LoopChat);