import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const file1 = 'file1.json';
const file2 = 'file2.json';
const fullPath = getFixturePath(file1);

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
