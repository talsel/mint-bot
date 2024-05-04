const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Returns the bot\'s uptime!'),
    global: true,
    async execute(interaction, client, args) {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60
        const newMessage = `⌚ **Uptime**\nDays: \`${days}\`\nHours: \`${hours}\`\nMinutes: \`${minutes}\`\nSeconds: \`${seconds}\``
        await interaction.editReply({
            content: newMessage
        })
    }
}