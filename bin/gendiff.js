#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((file1, file2, options) => console.log(genDiff(file1, file2, options.format)));

program.parse();
