# LoopChat

An all-in-one javascript library for creating rich AI powered chat operation workflows.

## Concepts

### Purpose

The purpose of LoopChat is to provide a single javascript library that will handle 100% of the frontend for implementing a unique AI powered chat application that combines features of a "chat operations" interface like Slack and a windows application where results can be loaded into a main desktop area as windows.

### Terms

- Agent: An Agent is an autonomous entity within LoopChat that processes messages, makes decisions, and performs actions based on its configuration and context. Agents can interact with users, other agents, or external systems to facilitate complex chat workflows.
- Channel: A Channel represents a medium or platform (such as web, SMS, or Slack) through which messages are sent and received.
- Desktop: The Desktop is the main interactive area within LoopChat where users can manage multiple "windows," each representing different agents, conversations, or tools. Similar to a desktop environment, each window on the Desktop can be minimized, docked, expanded, or closed, allowing users to organize and control their chat workflows efficiently. The Desktop provides a flexible workspace for orchestrating complex interactions and monitoring ongoing processes.
- Window: A Window is an individual, resizable, and movable interface element within the Desktop, similar to windows in traditional desktop applications. Each Window can display content such as conversations, agent tools, or workflow results, and supports actions like minimizing, maximizing, docking, or closing, allowing users to organize their workspace efficiently.
- Action: An Action is a discrete operation performed by an agent, such as sending a message, calling an API, or updating context.
- Context: Context refers to the state or information maintained during a conversation or workflow, enabling agents to make informed decisions and maintain continuity.
- Envelope: A Envelope is a unit of communication exchanged between agents, users, or external systems within LoopChat. Each Envelope contains structured data such as the sender, recipient, timestamp, content (text, media, or commands), and optional metadata (e.g., Envelope type, status, or context references). Envelopes are the primary means by which information, instructions, and results are transmitted throughout chat workflows.

### UI Anatomy

- Root
  - Channels
    - Channel
      - Envelope
        - Message
        - Action Buttons
        - Attachments
  - Desktop
    - Windows
      - Window
        - Controls / Title
        - Content

### Code

- All code should live in loopchat.js
- The entire app is a single function LoopChat
- Every function should be a prototype of LoopChat so that the entire "app" is a single large function started with a single call to "new LoopChat()"
- Every function that renders something should start with "render" along with others for each "category" of functions it's carrying out. Another example would be calculating ("calc").
