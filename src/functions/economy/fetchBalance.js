const Balance = require('/root/v14/src/schemas/balance');
const { Types } = require('mongoose');

module.exports = (client) => {
    client.fetchBalance = async (userId, guildId) => {
        let storedBalance = await Balance.findOne({ userId: userId, guildId: guildId});
        
        if (!storedBalance) {
            storedBalance = await new Balance({
                _id: new Types.ObjectId(),
                userId: userId,
                guildId: guildId,
            });
            await storedBalance.save();
            return storedBalance;
        } else return storedBalance;
    };
};