const { ActivityType } = require('discord.js');

module.exports = (client) => {
    client.pickPresence = async () => {
        const guild = client.guilds.cache.get('');
        const guild2 = client.guilds.cache.get('');
        const memberCount = guild.memberCount + guild2.memberCount; // I had problems with doing client.users.cache.size here
        const options = [
            {
                type: ActivityType.Listening,
                text: "/help",
                status: "dnd",
            },
            {
                type: ActivityType.Watching,
                text: `${memberCount} users`,
                status: "dnd",
            },
        ];

        const option = Math.floor(Math.random() * options.length);

        client.user.setPresence({
            activities: [{
                name: options[option].text,
                type: options[option].type,
            },],
            status: options[option].status,
        });
    };
};