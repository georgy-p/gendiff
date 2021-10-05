// eslint-disable-next-line import/extensions
import parser from './src/parsers.js';

const getSorted = (coll) => coll.sort((a, b) => {
  if (a[1] === b[1]) {
    if (a[0].includes('-')) {
      return -1;
    }
  } else if (a[1] > b[1]) {
    return 1;
  } else if (a[1] < b[1]) {
    return -1;
  }
  return 0;
});

export default (fileName1, fileName2) => {
  const file1 = parser(fileName1);
  const file2 = parser(fileName2);
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);
  const uniq1Keys = file1Keys.filter((key) => !file2Keys.includes(key));
  const uniq2Keys = file2Keys.filter((key) => !file1Keys.includes(key));
  const commonKeys = file1Keys.filter((key) => file2Keys.includes(key));
  const acc = [];
  commonKeys.map((key) => {
    if (file1[key] === file2[key]) {
      acc.push(['    ', `${key}:`, `${file1[key]}\n`]);
    } else {
      acc.push(['   -', `${key}:`, `${file1[key]}\n`]);
      acc.push(['   +', `${key}:`, `${file2[key]}\n`]);
    }
    return acc;
  });
  uniq1Keys.forEach((key) => {
    acc.push(['   -', `${key}:`, `${file1[key]}\n`]);
  });
  uniq2Keys.forEach((key) => {
    acc.push(['   +', `${key}:`, `${file2[key]}\n`]);
  });
  const sortedAcc = getSorted(acc);
  const result = `{\n ${sortedAcc.flat().join(' ')}  }`;
  return result;
};
