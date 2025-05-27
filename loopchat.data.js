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
})(window.LoopChat);