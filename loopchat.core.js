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
  
  /** @type {Object|null} Test data for initial setup */
  this.testData = null;
  
  /** @type {Object} Map of user IDs to user data */
  this.users = {};
  
  /** @type {Object} Map of agent IDs to agent data */
  this.agents = {};
};

/**
 * Initialize the LoopChat application
 * @param {Object} props - Initialization properties
 * @param {HTMLElement} [props.root] - Root DOM element
 * @param {string} [props.state] - Initial state
 * @param {Array} [props.channels] - Initial channels
 * @param {Array} [props.windows] - Initial windows
 * @param {string} [props.activeChannel] - Initial active channel ID
 * @param {Object} [props.testData] - Test data
 * @param {Object} [props.users] - Users data
 * @param {Object} [props.agents] - Agents data
 * @returns {LoopChat} The LoopChat instance for chaining
 */
LoopChat.prototype.init = function (props) {
  if (props.root) this.root = props.root;
  if (props.state) this.state = props.state;
  if (props.channels) this.channels = props.channels;
  if (props.windows) this.windows = props.windows;
  if (props.activeChannel) this.activeChannel = props.activeChannel;
  if (props.testData) this.testData = props.testData;
  if (props.users) this.users = props.users;
  if (props.agents) this.agents = props.agents;
  
  // Load test data first
  this.loadTestData();
  
  // Render the UI with all windows
  this.renderRoot()
    .renderChannelsWindow()
    .renderMessagesWindow()
    .renderMessageInputWindow();
  
  // Ensure a channel is activated after rendering if test data was loaded
  setTimeout(() => {
    if (this.channels && this.channels.length > 0 && this.activeChannel) {
      console.log("Initializing active channel:", this.activeChannel);
      this.updateMessagesWindowContent(this.activeChannel);
    }
  }, 100);
  
  return this;
};