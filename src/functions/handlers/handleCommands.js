const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync('./src/commands');
        const globalCommands = [];
        const guildCommands = [];
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));
            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                if (command.global) {
                    globalCommands.push(command.data);
                } else {
                    guildCommands.push(command.data);
                }
            }
        }
        const clientId = ''; // Place bot id here for REST API command refresh
        const guildId = '' // Place preferred discord server id here for global commands below
        const rest = new REST ({ version: '9' }).setToken(process.env.token); // Token from .env file in src directory
        try {
            const load = chalk.hex('#00A6ED');
            console.log(load('Refreshing application (/) commands 🔄️'));
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: [] }
            )
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: [] }
            )
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: globalCommands }, // Commands that work in any discord server (add 'global: true' property in command config)
            )
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: guildCommands }, // Commands that work only in the discord server given in guildId const (add 'global: false' property in command config)
            )
            const check = chalk.hex('#00D26A');
            console.log(check('Successfully refreshed application (/) commands ✅'))
        } catch (error) {
            console.error(error);
        }
        let y = process.openStdin()
        y.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
            const channel = client.channels.cache.get("")  // Talk in given channel in discord server from channel id from node console
            channel.send(x.join(" "));
        })
    }
}