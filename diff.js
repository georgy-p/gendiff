import _ from 'lodash';
import parser from './src/parsers.js';

const getUniqKeys = (keys1, keys2) => keys1.filter((key) => !keys2.includes(key));
const getCommonKeys = (keys1, keys2) => keys1.filter((key) => keys2.includes(key));

const genDiff = (fileName1, fileName2) => {
  const file1 = parser(fileName1);
  const file2 = parser(fileName2);
  const findDiff = (obj1, obj2) => {
    const diff = {};
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    const uniq1Keys = getUniqKeys(obj1Keys, obj2Keys);
    const uniq2Keys = getUniqKeys(obj2Keys, obj1Keys);
    const commonKeys = getCommonKeys(obj1Keys, obj2Keys);
    // console.log(commonKeys);
    commonKeys.map((key) => {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        diff[`  ${key}`] = findDiff(obj1[key], obj2[key]);
      } else if (obj1[key] === obj2[key]) {
        diff[`  ${key}`] = obj1[key];
      } else {
        diff[`- ${key}`] = _.cloneDeep(obj1[key]);
        diff[`+ ${key}`] = _.cloneDeep(obj2[key]);
      }
      return diff;
    });
    uniq1Keys.forEach((key) => {
      diff[`- ${key}`] = _.cloneDeep(obj1[key]);
    });
    uniq2Keys.forEach((key) => {
      diff[`+ ${key}`] = _.cloneDeep(obj2[key]);
    });
    return diff;
  };
  return findDiff(file1, file2);
};

console.log(genDiff('filepath1.yml', 'filepath2.yml'));
