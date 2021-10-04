import { beforeEach, test, expect } from '@jest/globals';
import { dirname } from 'path';
// eslint-disable-next-line import/no-unresolved
import path from 'path/posix';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let result;

const file1 = 'test_file1.json';
const file2 = 'test_file2.json';
const fullPath = getFixturePath(file1);

beforeEach(() => {
  result = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }`;
});

test('genDiff test1: short name', () => {
  expect(genDiff(file1, file2)).toEqual(result);
});

test('genDiff test2: full path', () => {
  expect(genDiff(fullPath, file2)).toEqual(result);
});