import _ from 'lodash';

const getClone = (data) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const result = {};
  const keys = Object.keys(data);
  keys.map((key) => {
    if (_.isPlainObject(data[key])) {
      result[`  ${key}`] = getClone(data[key]);
    } else {
      result[`  ${key}`] = data[key];
    }
    return result;
  });
  return result;
};

const buildAst = (data1, data2) => {
  const unionKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const result = unionKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        name: key,
        type: 'nested',
        children: buildAst(data1[key], data2[key]),
      };
    }
    if (!_.has(data2, key)) {
      return {
        name: key,
        type: 'removed',
        value1: getClone(data1[key]),
      };
    }
    if (!_.has(data1, key)) {
      return {
        name: key,
        type: 'added',
        value1: getClone(data2[key]),
      };
    }
    return (_.isEqual(data1[key], data2[key]))
      ? {
        name: key,
        type: 'unchanged',
        value1: getClone(data1[key]),
      }
      : {
        name: key,
        type: 'updated',
        value1: getClone(data1[key]),
        value2: getClone(data2[key]),
      };
  });
  return result;
};

export default buildAst;
