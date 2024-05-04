const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Shows the list of the song queue!"),
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
                embed.setColor("Red").setDescription("There is no active queue! ❌");
                return interaction.reply({ embeds: [embed], ephemeral: false });
            }

            embed.setColor("Purple").setDescription(`${queue.songs.map(
                (song, id) => `\n**${id + 1}.** ${song.name} - \`${song.formattedDuration}\``
            )}`);
            return interaction.reply({ embeds: [embed], ephemeral: false });

        } catch (err) {
            console.log(err);

            embed.setColor("Red").setDescription("Oops, something went wrong! ❌");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}