const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Adjusts the song's volume!")
        .addIntegerOption(option =>
            option.setName("volume")
                .setDescription("50 = 50%")
                .setMinValue(0)
                .setMaxValue(100)
                .setRequired(true)
        ),
    global: true,
    async execute(interaction, client, args) {
        const { member, guild, options } = interaction;
        const volume = options.getInteger("volume");
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
            await interaction.deferReply();
            await client.distube.setVolume(voiceChannel, volume);
            embed.setColor("Orange").setDescription(`Volume has been set to ${volume}% 🔉`);
            return interaction.editReply({ embeds: [embed], ephemeral: false });

        } catch (err) {
            console.log(err);

            embed.setColor("Red").setDescription("Oops, something went wrong! ❌");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}