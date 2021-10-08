import { beforeEach, test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let result;

const file1 = 'file1.json';
const file2 = 'file2.json';
const fullPath = getFixturePath('file1');

beforeEach(() => {
  result = getFixturePath('result.yml');
});

test('genDiff test1: short name', () => {
  expect(genDiff(file1, file2)).toEqual(result);
});

test('genDiff test2: full path', () => {
  expect(genDiff(fullPath, file2)).toEqual(result);
});

const ymlFile1 = 'filepath1.yml';
const ymlFile2 = 'filepath2.yml';

test('genDiff test3: yml files compare', () => {
  expect(genDiff(ymlFile1, ymlFile2)).toEqual(result);
});
