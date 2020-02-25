#!/usr/bin/env node
import program from 'commander';
import diff from '..';
program
    .version('-V, --version')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action(
        function (firstConfig, secondConfig) {
            const result = diff(firstConfig, secondConfig);
            result.map(iter => console.log(iter));
        }
    )
    .description('Compares two configuration files and shows a difference.')
// eslint-disable-next-line no-undef
program.parse(process.argv);