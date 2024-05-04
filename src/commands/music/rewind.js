const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rewind")
        .setDescription("Rewind seconds in a song.")
        .addIntegerOption(option =>
            option.setName("seconds")
                .setDescription("Provide the amount of time you want to rewind the song!")
                .setMinValue(0)
                .setRequired(true)
        ),
    global: true,
    async execute(interaction, client, args) {
        const { options, member, guild } = interaction;
        const seconds = options.getInteger("seconds");
        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if (!voiceChannel) {
            embed.setColor("Red").setDescription("You must be in a voice channel to execute music commands! ❌");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription(`You can't use the music player as it is already active in <#${guild.members.me.voice.channelId}>! ❌`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {

            const queue = await client.distube.getQueue(voiceChannel);

            if (!queue) {
                embed.setColor("Red").setDescription("There is no active queue! ❌");
                return interaction.reply({ embeds: [embed], ephemeral: false });
            }
            await interaction.deferReply();
            await queue.seek(queue.currentTime - seconds);
            embed.setColor("Orange").setDescription(`Rewinded the song for \`${seconds}s\` ⏪`);
            return interaction.editReply({ embeds: [embed], ephemeral: false });

        } catch (err) {
            console.log(err);

            embed.setColor("Red").setDescription("Oops, something went wrong! ❌");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}