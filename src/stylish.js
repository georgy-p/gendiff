import _ from 'lodash';
import stringify from './stringify.js';

const sorter = (keys) => keys.sort((a, b) => {
  const aSliced = a.slice(1);
  const bSliced = b.slice(1);
  if (aSliced === bSliced) {
    if (a.includes('-')) {
      return -1;
    }
  } else if (aSliced > bSliced) {
    return 1;
  } else if (aSliced < bSliced) {
    return -1;
  }
  return 0;
});

const diffSorter = (diff) => {
  const sortedDiff = {};
  const diffKeys = Object.keys(diff);
  const sortedKeys = sorter(diffKeys);
  sortedKeys.map((key) => {
    if (_.isPlainObject(diff[key])) {
      sortedDiff[key] = diffSorter(diff[key]);
    } else {
      sortedDiff[`${key}`] = diff[key];
    }
    return sortedDiff;
  });
  return sortedDiff;
};

export default (diff) => {
  const sortedDiff = diffSorter(diff);
  const diffToStr = stringify(sortedDiff);
  return diffToStr;
};
