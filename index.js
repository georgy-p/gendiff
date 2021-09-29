import _ from 'lodash';
import { getData } from './src/filetools.js';


export const genDiff = (fileName1, fileName2) => {
  const file1 = JSON.parse(getData(fileName1));
  const file2 = JSON.parse(getData(fileName2));
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);
  const uniq1Keys = file1Keys.filter((key) => !file2Keys.includes(key));
  const uniq2Keys = file2Keys.filter((key) => !file1Keys.includes(key));
  const commonKeys = file1Keys.filter((key) => file2Keys.includes(key));
  const acc = [];
  commonKeys.map((key) => {
    if (file1[key] === file2[key]) {
      acc.push([' ', `${key}: ${file1[key]}\n`]);
    } else {
      acc.push(['-', `${key}: ${file1[key]}\n`]);
      acc.push(['+', `${key}: ${file2[key]}\n`]);
    }
  }); 
  uniq1Keys.forEach((key) => {
    acc.push(['-', `${key}: ${file1[key]}\n`]);
  });
  uniq2Keys.forEach((key) => {
    acc.push(['+', `${key}: ${file2[key]}\n`]);
  });
  acc.sort((a, b) => a[1].localeCompare(b[1]));
  const result = `{\n ${acc.flat().join(' ')}}`;
  console.log(result);
  return result;
};
