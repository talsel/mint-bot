const chalk = require('chalk');
const leaf = chalk.hex('#85D62E');

module.exports = {
    name: "disconnected",
    execute(client) {
        console.log(leaf("Server has disconnected from MongoDB 🌿"))

    }
}