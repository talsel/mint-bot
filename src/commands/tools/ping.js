const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns the bot\'s ping!'),
    global: true,
    async execute(interaction, client, args) {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const ping = Date.now() - interaction.createdTimestamp;
        const apiPing = interaction.client.ws.ping;
        const newMessage = `🏓 **Pong!**\nSending: \`${ping}ms\`\nAPI: \`${apiPing}ms\``
        await interaction.editReply({
            content: newMessage
        })
    }
}