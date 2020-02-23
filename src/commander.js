#!/usr/bin/env node
import program from 'commander';
program
    .option('-V, --version  ', 'output the version number')
    .description('Compares two configuration files and shows a difference.')
// eslint-disable-next-line no-undef
export default program.parse(process.argv);
