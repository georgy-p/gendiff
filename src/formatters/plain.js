import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (value) => {
  const iter = (data, path) => {
    const result = data.map((el) => {
      const {
        name, type, value1, value2, children,
      } = el;
      const currentPath = [...path, `${name}`];
      switch (type) {
        case 'updated':
          return `Property '${currentPath.join('.')}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
        case 'added':
          return `Property '${currentPath.join('.')}' was added with value: ${getValue(value1)}`;
        case 'nested':
          return iter(children, currentPath);
        case 'removed':
          return `Property '${currentPath.join('.')}' was removed`;
        default:
          return [];
      }
    });
    return _.flattenDeep(result).join('\n');
  };
  return iter(value, []);
};

export default plain;
