const chalk = require('chalk');
const leaf = chalk.hex('#85D62E');

module.exports = {
    name: "connected",
    execute(client) {
        console.log(leaf("Successfully connected to MongoDB 🌿"))
    }
}