const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rick')
        .setDescription('Returns a gif of Rick Astley!'),
    global: true,
    async execute(interaction, client, args) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#AFA7D0')
                .setImage('https://c.tenor.com/CTpG8Qr1A_AAAAAd/rick-roll-rick-astley.gif')
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
    }
}