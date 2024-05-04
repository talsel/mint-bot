const fs = require('fs');
const { connection } = require('mongoose');

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync(`./src/events`);
        for (const folder of eventFolders) {
            const eventFiles = fs
            .readdirSync(`./src/events/${folder}`)
            .filter((file) => file.endsWith(".js"));
            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`/root/v14/src/events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    }
                    break;
                case "mongo":
                    for (const file of eventFiles) {
                        const event = require(`/root/v14/src/events/${folder}/${file}`);
                        if (event.once) connection.once(event.name, (...args) => event.execute(...args, client))
                        else connection.on(event.name, (...args) => event.execute(...args, client));
                    }
                    break;
                default:
                    break;
            }
        }
    }
}


// const fs = require('fs');
// const path = require('path');

// module.exports = (client) => {
//     client.handleEvents = async () => {
//         try {
//             const eventFolders = fs.readdirSync(`./src/events`);
//             for (const folder of eventFolders) {
//                 const folderPath = path.join('./src/events', folder);
//                 const isDirectory = fs.statSync(folderPath).isDirectory();
                
//                 if (!isDirectory) {
//                     console.log(`Skipping '${folderPath}' - not a directory.`);
//                     continue;
//                 }

//                 const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
//                 for (const file of eventFiles) {
//                     const eventPath = path.join(folderPath, file);
//                     const event = require(eventPath);
//                     if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
//                     else client.on(event.name, (...args) => event.execute(...args, client));
//                 }
//             }
//         } catch (error) {
//             console.error('Error while handling events:', error);
//         }
//     }
// }

// const fs = require('fs');
// const path = require('path');

// module.exports = (client) => {
//     client.handleEvents = async () => {
//         const eventFolders = fs.readdirSync(`./src/events`);
//         for (const folder of eventFolders) {
//             const folderPath = path.join('./src/events', folder);
//             const isDirectory = fs.statSync(folderPath).isDirectory();

//             if (!isDirectory) {
//                 console.log(`Skipping '${folderPath}' - not a directory.`);
//                 continue;
//             }

//             const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
//             for (const file of eventFiles) {
//                 if (file === 'ready.js' && folder === 'client') {
//                     try {
//                         const event = require(path.join(folderPath, file));
//                         if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
//                         else client.on(event.name, (...args) => event.execute(...args, client));
//                     } catch (error) {
//                         console.error(`Error loading '${file}' from '${folderPath}':`, error);
//                     }
//                 }
//             }
//         }
//     }
// }