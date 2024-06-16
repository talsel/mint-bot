# mint-bot

<p>
<a href="https://github.com/nodejs/node/releases/tag/v20.12.2"><img alt="Static Badge" src="https://img.shields.io/badge/node.js-v20.12.2-%23417E38?logo=nodedotjs">
<a href="https://www.npmjs.com/package/npm/v/10.8.1"><img alt="Static Badge" src="https://img.shields.io/badge/npm-v10.8.1-%23CB0000?logo=npm">
<a href="https://www.npmjs.com/package/discord.js/v/14.15.3"><img src="https://img.shields.io/badge/discord.js-v14.15.3-%235865F2?logo=discord" alt="discord.js version" /></a>
<img src="https://img.shields.io/badge/License-MIT-%23750014" alt="MIT License" /></a>
</p>

A discord bot that I programmed 2019-2023 with functions such as music-playing, economy, statistics and quotes/photos of the day. I no longer regularly maintain this bot, therefore I have published it here as a template tool.


## Prerequisites

* Node.js v18+ `to run the bot process` from [Node.js](https://nodejs.org/en/download)
* Mongo Database URL `to run the economy commands` from [MongoDB](https://cloud.mongodb.com/)
* Discord Client ID `to refresh (/) commands with REST API` from [Discord Developer Portal](https://discord.com/developers/applications)
* Discord Bot Token `to log in to bot` from [Discord Developer Portal](https://discord.com/developers/applications)
* Process Manager 2 `to keep the bot online` from [Keymetrics](https://pm2.keymetrics.io/)

## Installation

### Installing via NPM
Clone the mint-bot repository by running:
```
git clone https://github.com/alextalsel/mint-bot.git
```
Change directory to /mint-bot and add required tokens in `.env` file from pre-requisites then run:
```
npm install
```
Afterwards, you can start the bot by running:
```
node src/bot.js
```
If you would like to keep the bot online 24/7, you can run:
```
pm2 start src/bot.js
```

## Issues

If you run into any issues whilst installing the bot, you can [report an issue here](https://github.com/alextalsel/mint-bot/issues).
