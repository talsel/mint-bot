const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const weather = require('weather-js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Returns the weather forecast for a specified place!')
        .addStringOption(option => option.setName('place').setDescription('Returns the weather forecast for a specified place!').setRequired(true)),
    global: true,
    async execute(interaction, client, args) {
        const place = interaction.options.getString('place');
        weather.find({ search: place, degreeType: "C" }, async (error, result) => {
            if (error) {
                interaction.reply({
                    content: `Oops, something went wrong! ❌`,
                    ephemeral: true
                })
            } else if (result.length === 0) {
                interaction.reply({
                    content: `That place does not exist! ❌`
                })
            }
            let data = result[0];
            let time = `Observation Time: ${data.current.date}, ${data.current.observationtime}`;
            try {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: "Weather", iconURL: data.current.imageUrl })
                    .setColor("#415272")
                    .setTitle(data.location.name)
                    .setImage(data.location.imagerelativeurl)
                    .addFields(
                        { name: 'Sky Conditions', value: data.current.skytext, inline: true },
                        { name: 'Temperature', value: data.current.temperature + '°C', inline: true },
                        { name: 'Windspeed', value: data.current.windspeed, inline: true },
                    )
                    .setFooter({ text: time })
                await interaction.reply({
                    embeds: [embed]
                })
            } catch (err) {
                console.error(err);
                interaction.reply({
                    content: `Oops, something went wrong! ❌`,
                    ephemeral: true
                });
        }
        })
    }
}