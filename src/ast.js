import _ from 'lodash';

const buildAst = (data1, data2) => {
  const unionKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const result = unionKeys.map((key) => {
    if (!_.has(data2, key)) {
      return {
        name: key,
        type: 'removed',
        value: _.cloneDeep(data1[key]),
      };
    }
    if (!_.has(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: _.cloneDeep(data2[key]),
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        name: key,
        type: 'nested',
        children: buildAst(data1[key], data2[key]),
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        name: key,
        type: 'unchanged',
        value: _.cloneDeep(data1[key]),
      };
    }
    return {
      name: key,
      type: 'updated',
      oldValue: _.cloneDeep(data1[key]),
      newValue: _.cloneDeep(data2[key]),
    };
  });
  return result;
};

export default buildAst;
