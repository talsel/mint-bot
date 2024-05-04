const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Returns the history behind the bot!'),
    global: true,
    async execute(interaction, client, args) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#415272')
                .setTitle('About the bot')
                .setDescription(`The history behind mint!`)
                .addFields(
                    {name: 'Project Q', value: `I began Project Q in May 2019 with the intention to create a greeting bot for my friends in a private discord server and learn more about JavaScript and how NodeJS and npm works.`},
                    {name: 'mixedassistant', value: `After a few months of Project Q, I ditched the bot and discontinued the project entirely due to school getting in the way - although I did not delete the code I had been working on. However, as a result of COVID-19 and national lockdowns, I had some free time on my hands and decided to bring my bot back online in July 2020. I used it for even more commands for my friends to use while gaming.`},
                    {name: 'mint', value: `As it approached September 2020, COVID-19 national lockdowns were lifted and I was able to return to school, therefore, once again, mixedassistant was ditched. Now, after a year and four months, the mint bot has been created and I am now prepared to develop a variety of different commands for more people to use in discord servers!`},
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