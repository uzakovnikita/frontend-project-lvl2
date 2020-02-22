#!/usr/bin/env node
const program = require('commander');
program
    .option('-V, --version  ', 'output the version number')
    .description('Compares two configuration files and shows a difference.')
program.parse(process.argv);