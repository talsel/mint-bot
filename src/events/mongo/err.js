const chalk = require('chalk');
const error = chalk.hex('#F92F60');

module.exports = {
    name: "err",
    execute(client) {
        console.log(error(`There was an error while attempting to connect MongoDB ❌:\n${err}`))
    }
}