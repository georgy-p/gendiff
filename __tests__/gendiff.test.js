import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = 'file1.json';
const file2 = 'file2.json';
const fullPath = getFixturePath(file1);
const stylishResult = parsers(getFixturePath('stylish.txt'));

test('genDiff stylish test1: short name', () => {
  expect(genDiff(file1, file2)).toEqual(stylishResult);
});

test('genDiff stylish test2: full path', () => {
  expect(genDiff(fullPath, file2)).toEqual(stylishResult);
});

const ymlFile1 = 'filepath1.yml';
const ymlFile2 = 'filepath2.yml';

test('genDiff stylish test3: yml files compare', () => {
  expect(genDiff(ymlFile1, ymlFile2)).toEqual(stylishResult);
});

const plainResult = parsers(getFixturePath('plain_result.txt'));

test('genDiff plain test4: plain formate', () => {
  expect(genDiff(file1, file2, 'plain')).toEqual(plainResult);
});

const jsonResult = parsers(getFixturePath('expectedjson'));

test('genDiff json test5: json formate', () => {
  expect(genDiff(file1, file2, 'json')).toEqual(jsonResult);
});
