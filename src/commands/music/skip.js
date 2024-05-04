const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song!"),
    global: true,
    async execute(interaction, client, args) {
        const { options, member, guild, channel } = interaction;

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
                embed.setColor("Red").setDescription("There is no active queue.");
                return interaction.reply({ embeds: [embed], ephemeral: false });
            }

            await interaction.deferReply();
            await queue.skip(voiceChannel);
            const song = queue.songs[1];
            embed.setColor("Purple").setDescription(`**Currently playing:** \`${song.name}\` - \`${song.formattedDuration}\`\n**Link:** ${song.url} `).setThumbnail(song.thumbnail);
            return interaction.editReply({ embeds: [embed], ephemeral: false });


        } catch (err) {
            console.log(err);

            embed.setColor("Red").setDescription("Oops, something went wrong! ❌");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}