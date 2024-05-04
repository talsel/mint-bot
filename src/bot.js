require('dotenv').config();
const { token, databaseToken } = process.env;
const { connect } = require('mongoose')
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const folder = chalk.hex('#FCD53F');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

console.log(folder('Current working directory:', process.cwd(), '📁'));

const client = new Client({ intents: 131071 });
client.commands = new Collection();
client.commandArray = [];

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);
(async () => {
    await connect(databaseToken).catch(console.error); // Token from .env file in src directory
})();