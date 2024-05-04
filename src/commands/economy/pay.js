const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Balance = require('/root/v14/src/schemas/balance');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('Returns a payment to the user given with a certain amount!')
        .addUserOption(option => option.setName('user').setDescription('The user that you would like to pay!').setRequired(true))
        .addNumberOption(option => option.setName('amount').setDescription('The amount you would like to pay!').setRequired(true)),
    global: true,
    async execute(interaction, client, args) {
        const userStoredBalance = await client.fetchBalance(interaction.user.id, interaction.guild.id);
        let amount = interaction.options.getNumber('amount');
        const selectedUser = interaction.options.getUser('user');

        if (selectedUser.id == interaction.user.id) return await interaction.reply({
            content: `You cannot send money to yourself! ❌`,
            ephemeral: true,
        })
        else if (selectedUser.bot) return await interaction.reply({
            content: `You cannot send money to a bot! ❌`,
            ephemeral: true,
        })
        else if (amount < 1.00) return await interaction.reply({
            content: `The amount given must be over £1.00! ❌`,
            ephemeral: true,
        })
        else if (amount > userStoredBalance.balance) return await interaction.reply({
            content: `You do not have enough funds to send that amount! ❌`,
            ephemeral: true,
        })
        const selectedUserBalance = await client.fetchBalance(selectedUser.id, interaction.guild.id);
        amount = await client.toFixedNumber(amount);
        await Balance.findOneAndUpdate({ _id: userStoredBalance._id }, { balance: await client.toFixedNumber(userStoredBalance.balance) - amount });
        await Balance.findOneAndUpdate({ _id: selectedUserBalance._id }, { balance: await client.toFixedNumber(selectedUserBalance.balance) + amount });
        await interaction.reply({
            content: `**${interaction.user.username}** has sent **£${amount}** to **${selectedUser}**! What a kind person! 👏`,
            ephemeral: false,
        })
    }
}