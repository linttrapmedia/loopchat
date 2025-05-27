# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LoopChat is an all-in-one JavaScript library for creating rich AI-powered chat operation workflows. It combines features of a "chat operations" interface (like Slack) with a windowed application where results can be loaded into a main desktop area as windows.

## Key Concepts

- **Agent**: An entity (person or bot) that can send and receive messages. Agents are the senders and recipients of messages in the system. Users are a type of agent, while bots are another type.
- **Channel**: A medium through which messages are sent and received
- **Desktop**: The main interactive area where users manage multiple "windows"
- **Window**: Individual, resizable interface elements within the Desktop
- **Action**: A discrete operation performed by an agent
- **Context**: State/information maintained during a conversation
- **Envelope**: A unit of communication exchanged between agents, users, or systems

## Architecture

- The entire application is a single function called `LoopChat`
- All code lives in `loopchat.js`
- Every function is a prototype of LoopChat (pattern: `LoopChat.prototype.functionName`)
- Render functions start with "render" prefix
- The UI has a hierarchical structure:
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
          - Controls/Title
          - Content

## Development Commands

```bash
# Start local development server
make dev

# Build the project
make build

# Clean the project
make clean
```

## Testing

The project uses test fixtures in `test-fixtures.json` which contain sample data for threads, posts, and other elements.

## Type Checking

The project uses JSConfig for basic type checking:

```json
{
  "compilerOptions": {
    "target": "es6",
    "checkJs": true
  },
  "include": ["lib", "loopchat.js"]
}
```
