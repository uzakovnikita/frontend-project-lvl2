#!/usr/bin/env node
import program from 'commander';
program
    .version('-V, --version')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action(function(firstConfig, secondConfig) {
        console.log(firstConfig);
        console.log(secondConfig);
    })
    .description('Compares two configuration files and shows a difference.')
// eslint-disable-next-line no-undef
export default program.parse(process.argv);
