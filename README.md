# GETTING TO KNOW BOTPRESS

## Project

A simple Facebook Messenger bot done with Botpress.

## Getting Started

1. Install dependencies: `npm install`
2. Start the bot `bp start`
3. After the bot launches, get the port number for where you should visit
4. In a different tab in your terminal, run the command `ngrok http 3000` according to the number that you get from the bot
5. Go to Facebook for developers for information about your page for which you want to connect the bot to
6. Put your Facebook API information and the URL that you get from ngrok into the botpress-messenger.config.yml OR the GUI

## Dependencies

- "botpress": "1.x",
- "botpress-messenger": "^2.2.9",
- "botpress-web": "1.x",
- "dotenv": "^4.0.0",
- "request": "^2.83.0",
- "sqlite3": "^3.1.13"
