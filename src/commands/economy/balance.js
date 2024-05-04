const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Returns a balance!')
        .addUserOption(option => option.setName('user').setDescription('Returns a balance based on the user given!')),
    global: true,
    async execute(interaction, client, args) {
        const selectedUser = interaction.options.getUser('user') || interaction.user;
        const storedBalance = await client.getBalance(selectedUser.id, interaction.guild.id);
        if (selectedUser.bot) return await interaction.reply ({
            content: `Bots are not a part of the economy system! ❌`,
            ephemeral: true,
        })
        else if (!storedBalance) return await interaction.reply ({
            content: `That person does not have a balance yet! ❌`,
            ephemeral: true,
        });
        else {
            const embed = new EmbedBuilder()
                .setTitle(`Balance of ${selectedUser.username}`)
                .setColor('d3af37')
                .setThumbnail(selectedUser.avatarURL())
                .addFields([
                    {
                        name: `£${storedBalance.balance}`,
                        value: `\u200b`
                    }
                ])
                .setTimestamp()
                .setFooter({
                    text: 'mint economy',
                    iconURL: client.user.displayAvatarURL(),
                })
            await interaction.reply({
                embeds: [embed],
                ephemeral: false,
            })
        }
    }
}