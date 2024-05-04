const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { version } = require('discord.js');
const os = require("os");
const cpuStat = require("cpu-stat");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Returns the current statistics of the bot!'),
    global: true,
    async execute(interaction, client, args) {
        cpuStat.usagePercent(async function(err, percent, seconds) {
            if(err) {
                return console.log(err)
            }
            try {
                const embed = new EmbedBuilder()
                    .setTitle(`Statistics`)
                    .setColor("#415272")
                    .addFields(
                        { name: 'CPU', value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``, inline: false },
                        { name: 'CPU Usage', value: `\`\`\`${percent.toFixed(2)}%\`\`\``, inline: true },
                        { name: 'Memory Usage', value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: true },
                        { name: 'Active Servers', value: `\`\`\`${client.guilds.cache.size}\`\`\``, inline: true },
                        { name: 'Created', value: `\`\`\`05/05/2019\`\`\``, inline: false },
                        { name: 'Discord.js Version', value: `\`\`\`v${version}\`\`\``, inline: true },
                        { name: 'Node.js Version', value: `\`\`\`${process.version}\`\`\``, inline: true },
                        { name: 'Arch', value: `\`\`\`${os.arch()}\`\`\``, inline: true },
                        { name: 'Platform', value: `\`\`\`${os.platform()}\`\`\``, inline: true },
                        { name: 'Websocket', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: false },
                    )
                await interaction.reply({
                    embeds: [embed]
                })
            } catch (error) {
                console.error(error);
                interaction.reply({
                    content: `Oops, something went wrong! ❌`,
                    ephemeral: true
                });
            }
        });
    }
}