#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', stylish)
  .action((file1, file2) => console.log(genDiff(file1, file2)));

program.parse();
