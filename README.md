# slack-botKit-chatbot-node
# Slack Bot Project

## Prerequisites

- **Node.js** (v18 or later)
- **npm** (Node Package Manager)
- **ngrok** (For local development)

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/AbdallahSaboukh93/slack-botKit-chatbot-node](/).git
   cd slack-bot
   ```

2. **Install Dependencies:**
   ```bash
   npm install botkit
   npm install botbuilder-adapter-slack
   npm install request
   ```

3. **Set Up ngrok for Local Development:**
   ```bash
   ngrok http 3000
   ```

4. **Configure Slack:**
   - Set up your Slack App with appropriate scopes.
   - Add the generated `ngrok` URL to Slack’s Event Subscriptions.

5. **Run the Bot:**
   ```bash
   node index.js
   ```

## Usage

- The bot listens for specific keywords in Slack channels and responds based on predefined FAQs.
- It integrates with a Java backend to fetch and display data.
