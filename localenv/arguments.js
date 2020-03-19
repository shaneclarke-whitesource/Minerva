/*
const commander = require('commander');

commander
    .option('-u, --username <username>', 'Username')
    .option('-p, --password <password>', 'Password')
    .option('-a, --apikey <apikey>', 'Apikey')
    .parse(process.argv);

module.exports = commander;
*/

const args = require('yargs').argv

const body = {
    username: args.username,
    password: args.password
};

module.exports = body;