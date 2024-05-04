const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song!')
        .addStringOption(option => option.setName('song').setDescription('Provide the name or URL of the song!').setRequired(true)),
    global: true,
    async execute(interaction, client, args) {
        const { options, member, guild, channel } = interaction;

        const query = options.getString('song');
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
            client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
            embed.setColor("Purple").setDescription("Added to queue 🎵");
            return interaction.reply({ embeds: [embed], ephemeral: false });
        } catch (err) {
            if (err instanceof DisTubeError && err.errorCode === 'NOT_SUPPORTED_URL') {
              embed.setColor("Red").setDescription(`That URL is not supported! ❌`);
              return interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
              console.error('Error occurred during song playback:', err);
              embed.setColor("Red").setDescription("Oops, something went wrong! ❌");
              return interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
}

