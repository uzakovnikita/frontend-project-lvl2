#!/usr/bin/env node
import program from 'commander';
import genDiff from '../';
program
    .version('-V, --version')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action(
        function (firstConfig, secondConfig) {
            const result = genDiff(firstConfig, secondConfig);
            console.log(result)
            return result;
        }
    )
    .description('Compares two configuration files and shows a difference.')
// eslint-disable-next-line no-undef
program.parse(process.argv);