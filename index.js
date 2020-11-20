const gitty = require('commander');

const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

const files = require('./lib/files');

gitty
    .command('init')
    .description('Draw app banner')
    .action(() => {
        clear();
        console.log(chalk.magenta(figlet.textSync('gitty', {horizontalLayout: 'full'})));
    });

gitty.parse(process.argv);
if(!gitty.args.length) {
    gitty.help();
}