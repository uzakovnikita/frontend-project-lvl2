#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('-V, --version')
  .option('-f, --format [type]', 'output format [recursive, plain, json]', 'recursive')
  .arguments('<firstConfig> <secondConfig>')
  .action(
    (firstConfig, secondConfig) => {
      const result = genDiff(firstConfig, secondConfig, program.format);
      console.log(result);
      return result;
    },
  )
  .description('Compares two configuration files and shows a difference.');
// eslint-disable-next-line no-undef
program.parse(process.argv);
