<div align="center">
	<p>
		<a href="https://github.com/alextalsel/mint-bot"><img src="https://github.com/alextalsel/mint-bot/assets/30665099/89646ba9-8379-4934-81ac-d4dc2f17114f" width="250" alt="discord.js" /></a>
	</p>
<p>
<a href="https://github.com/nodejs/node/releases/tag/v20.12.2"><img alt="Static Badge" src="https://img.shields.io/badge/node.js-v20.12.2-%23417E38?logo=nodedotjs">
<a href="https://www.npmjs.com/package/npm/v/10.7.0"><img alt="Static Badge" src="https://img.shields.io/badge/npm-v10.7.0-%23CB0000?logo=npm">
<a href="https://www.npmjs.com/package/discord.js/v/14.14.1"><img src="https://img.shields.io/badge/discord.js-v14.14.1-%235865F2?logo=discord" alt="discord.js version" /></a>
<img src="https://img.shields.io/badge/License-MIT-%23750014" alt="MIT License" /></a>
</p>

# mint-bot

A discord bot that I programmed 2019-2023 with functions such as music-playing, economy, statistics and quotes/photos of the day. It isn't much, just a mess around with node.js and the various npm packages that are available. In doing so, I've made some commands that can be quite entertaining at times especially with friends and acquired extensive knowledge about different JavaScript tools and hosting server processes. I no longer regularly maintain this bot, therefore I have published it here as a template/tutorial tool.

</div>

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
npm install @discordjs/opus@^0.9.0 @discordjs/rest@^2.2.0 @distube/spotify@^1.6.1 @distube/ytsr@^2.0.0 chalk@^4.1.2 cpu-stat@^2.0.1 discord-api-types@^0.37.58 discord.js@^14.14.1 distube@^4.1.1 dotenv@^16.3.1 ffmpeg-static-fork@^5.2.0 formidable@^3.5.1 fs@^0.0.1-security libsodium-wrappers@^0.7.13 mongoose@^7.6.0 opusscript@^0.0.8 os@^0.1.2 readable-stream@^4.5.2 sodium-native@^4.1.1 superagent@^8.1.2 weather-js@^2.0.0 yt-search@^2.10.4 ytdl-core@^4.11.5
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
