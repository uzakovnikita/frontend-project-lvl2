#!/usr/bin/env node
import program from 'commander';
import diff from '..';
program
    .version('-V, --version')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action(
        // eslint-disable-next-line no-undef
        diff(firstConfig, secondConfig)
    )
    .description('Compares two configuration files and shows a difference.')
// eslint-disable-next-line no-undef
program.parse(process.argv);