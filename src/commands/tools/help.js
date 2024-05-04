const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Returns a list of available commands!'),
    global: true,
    async execute(interaction, client, args) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#415272')
                .setTitle('Help')
                .setDescription(`The current prefix is \`/\`, and to use commands with this bot, all you have to do is type \`/<command>\``)
                .addFields(
                    { name: 'Tools', value: `\`\`\`a\nhelp\nabout\nping\nuptime\nstats\nweather\`\`\``, inline: true },
                    { name: 'Fun', value: `\`\`\`a\nbalance\npay\nrick\`\`\``, inline: true },
                    { name: 'Music', value: `\`\`\`a\nplay\nstop\nskip\nloop\nforward\nrewind\nshuffle\npause\nresume\nqueue\nnowplaying\nvolume\`\`\``, inline: true },
                    { name: 'Important Information', value: `This bot is in beta! There are many more commands still to come in the future!`, inline: false },
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
    }
}