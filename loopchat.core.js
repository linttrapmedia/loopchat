// @ts-ignore
/**
 * LoopChat - Main constructor for the chat operations interface
 * @constructor
 */
window.LoopChat = function LoopChat() {
  /** @type {HTMLElement|null} Root DOM element where the application will be rendered */
  this.root = null;

  /** @type {string} Current application state (init, loading, ready) */
  this.state = "init";

  /** @type {Array<Object>} List of channels (threads) */
  this.channels = [];

  /** @type {Array<Object>} List of open windows */
  this.windows = [];

  /** @type {string|null} ID of the currently active channel */
  this.activeChannel = null;

  /** @type {Object} Map of user IDs to user data */
  this.users = {};

  /** @type {Object} Map of agent IDs to agent data */
  this.agents = {};

  /** @type {Array<Object>} List of tasks */
  this.tasks = [];

  /** @type {boolean} Whether to automatically tile windows */
  this.autoTileWindows = false;
};

/**
 * Initialize the LoopChat application
 * @param {Object} props - Initialization properties
 * @param {HTMLElement} [props.root] - Root DOM element
 * @param {string} [props.state] - Initial state
 * @param {Array} [props.channels] - Initial channels
 * @param {Array} [props.windows] - Initial windows
 * @param {string} [props.activeChannel] - Initial active channel ID
 * @param {Object} [props.users] - Users data
 * @param {Object} [props.agents] - Agents data
 * @param {Array} [props.tasks] - Initial tasks
 * @returns {LoopChat} The LoopChat instance for chaining
 */
/**
 * Gets the appropriate z-index value from the design system
 * @param {string} level - The z-index level to retrieve (e.g., 'dropdown', 'window.focused')
 * @returns {string} The z-index value
 */
LoopChat.prototype.getZIndex = function (level) {
  // Make sure design system is loaded
  if (!this.design || !this.design.zIndex) {
    console.warn("Design system z-index not loaded, using fallback values");
    // Fallback values
    const fallbacks = {
      base: "1",
      desktop: "5",
      "window.default": "100",
      "window.focused": "200",
      toolbar: "500",
      tooltip: "600",
      dropdown: "700",
      modal: "900",
      overlay: "950",
      toast: "980",
      popup: "990",
      maximum: "9999",
    };
    return fallbacks[level] || "100";
  }

  // Handle nested properties with dot notation
  if (level.includes(".")) {
    const parts = level.split(".");
    let value = this.design.zIndex;
    for (const part of parts) {
      if (value && value[part] !== undefined) {
        value = value[part];
      } else {
        console.warn(`Z-index level '${level}' not found, using fallback`);
        return "100";
      }
    }
    return value;
  }

  // Handle direct properties
  return this.design.zIndex[level] || "100";
};

LoopChat.prototype.init = function (props) {
  if (props.root) this.root = props.root;
  if (props.state) this.state = props.state;
  if (props.channels) this.channels = props.channels;
  if (props.windows) this.windows = props.windows;
  if (props.activeChannel) this.activeChannel = props.activeChannel;
  if (props.users) this.users = props.users;
  if (props.agents) this.agents = props.agents;
  if (props.tasks) this.tasks = props.tasks;

  // Setup window resize listener for auto-tiling
  let resizeTimeout;
  window.addEventListener("resize", () => {
    // Debounce the resize event to avoid excessive tiling
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Only auto-tile if enabled
      if (this.autoTileWindows) {
        console.log("Window resized - auto-tiling windows");
        this.tileWindows();
      }
    }, 200); // 200ms debounce time
  });

  this.renderRoot().renderChannelsWindow().renderMessageInputWindow().renderTasksWindow().tileWindows();

  return this;
};
