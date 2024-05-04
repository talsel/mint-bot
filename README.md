<br />
<div align="center">
	<p>
		<a href="https://discord.js.org"><img src="https://github-production-user-asset-6210df.s3.amazonaws.com/30665099/327941614-4775aa5b-0dfb-4770-9c13-9d21aee4df3e.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240504%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240504T103004Z&X-Amz-Expires=300&X-Amz-Signature=4cbbc1cd941a9d22978f2883dcc985a267d4c4b4e407f789ec0e034cbffa4450&X-Amz-SignedHeaders=host&actor_id=30665099&key_id=0&repo_id=192153672" width="250" alt="discord.js" /></a>
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
Add required tokens in `.env` file from pre-requisites then run:
```
npm install
```
Afterwards, you can start the bot by running:
```
node src/bot.js
```

## Issues

If you run into any issues whilst installing the bot, you can [report an issue here](https://github.com/alextalsel/mint-bot/issues).
