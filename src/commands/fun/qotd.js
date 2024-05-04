const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qotd')
        .setDescription('Returns a quote of the day!')
        .addUserOption(option => option.setName('user').setDescription('Returns a quote based on the user given!').setRequired(false)),
    global: false,
    async execute(interaction, client, args) {
        rndquote(interaction, client);
        async function rndquote(interaction, client) {
            var quotes = [
                { text: '"Two roads diverged in a wood, and I, I took the one less traveled by, and that has made all the difference"', userId: '', colour: '#FD343C' },
                { text: '"United we stand, divided we fall"', userId: '', colour: '#D2AF50' },
                { text: '"Your word is a lamp for my feet, a light for my path"', userId: '', colour: '#22292B' },
            ];
            const userIdOption = interaction.options.getUser('user');
            if (userIdOption) {
                const userId = userIdOption.id
                const quote = quotes.filter(quote => quote.userId === userId);
                if (quote.length > 0) {
                    const rndqotdIndex = Math.floor(Math.random() * quote.length);
                    const randomQuote = quote[rndqotdIndex];
                    const user = await client.users.fetch(userId);
                    try {
                        const embed = new EmbedBuilder()
                        .setColor(randomQuote.colour)
                        .setTitle('Quote of the Day 💬')
                        .setDescription(randomQuote.text)
                        .setThumbnail(user.avatarURL())
                        .setFooter({ text: user.username });

                        return await interaction.reply({
                            embeds: [embed]
                    });
                    } catch (error) {
                        console.error(error);
                        interaction.reply({
                            content: `Oops, something went wrong! ❌`,
                            ephemeral: true
                        });
                    }
                } else {
                    interaction.reply({
                        content: `It seems like that person has not been quoted yet! ❌`,
                        ephemeral: true
                    });
                }
            } else {
                const rndqotdIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[rndqotdIndex];
                try {
                    const user = await interaction.client.users.fetch(randomQuote.userId);
                    const embed = new EmbedBuilder()
                        .setColor(randomQuote.colour)
                        .setTitle('Quote of the Day 💬')
                        .setDescription(randomQuote.text)
                        .setThumbnail(user.avatarURL())
                        .setFooter({ text: user.username });
                    await interaction.reply({
                        embeds: [embed]
                    })
                } catch (error) {
                    console.error(error);
                    interaction.reply({
                        content: `Unable to fetch user information! ❌`,
                        ephemeral: true
                    });
                }
            }
        }
    }
}