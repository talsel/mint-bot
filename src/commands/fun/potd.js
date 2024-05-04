const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('potd')
        .setDescription('Returns a photo of the day!')
        .addUserOption(option => option.setName('user').setDescription('Returns a photo based on the user given!').setRequired(false)),
    global: false,
    async execute(interaction, client, args) {
        rndphoto(interaction, client);
        async function rndphoto(interaction, client) {
            var photos = [
                { title: 'Golden horizon 🌆', userId: '525702435625369621', url: `https://i.postimg.cc/DzYmvF2q/PXL-20240219-164153783-EFFECTS.jpg` },
                { title: 'Twilight voyage ⛵', userId: '525702435625369621', url: `https://i.postimg.cc/MTMHX4Tg/PXL-20230704-194024720.jpg` },
                { title: 'Frosty vista 🎿', userId: '525702435625369621', url: `https://i.postimg.cc/zffVY31z/PXL-20221217-200538968-NIGHT.jpg` },
            ];
            const userIdOption = interaction.options.getUser('user');
            if (userIdOption) {
                const userId = userIdOption.id
                const photo = photos.filter(photo => photo.userId === userId);
                if (photo.length > 0) {
                    const rndpotdIndex = Math.floor(Math.random() * photo.length);
                    const randomPhoto = photo[rndpotdIndex];
                    const user = await client.users.fetch(userId);
                    try {
                        const embed = new EmbedBuilder()
                        .setColor('#1693F2')
                        .setTitle(randomPhoto.title)
                        .setImage(randomPhoto.url)
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
                        content: `It seems like that person has not taken any photos yet! ❌`,
                        ephemeral: true
                    });
                }
            } else {
                const rndpotdIndex = Math.floor(Math.random() * photos.length);
                const randomPhoto = photos[rndpotdIndex];
                try {
                    const user = await interaction.client.users.fetch(randomPhoto.userId);
                    const embed = new EmbedBuilder()
                        .setColor('#1693F2')
                        .setTitle(randomPhoto.title)
                        .setImage(randomPhoto.url)
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