const chalk = require('chalk');
const load = chalk.hex('#00A6ED');

module.exports = {
    name: "connecting",
    execute(client) {
        console.log(load("Initiated connection to MongoDB 🔄️"))
    }
}