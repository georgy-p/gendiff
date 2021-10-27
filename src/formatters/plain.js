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

const getPlain = (treeAst) => {
  const iter = (data, path) => {
    const result = data.map((el) => {
      const {
        name, type, value, oldValue, newValue, children,
      } = el;
      const currentPath = [...path, `${name}`];
      switch (type) {
        case 'updated':
          return `Property '${currentPath.join('.')}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
        case 'added':
          return `Property '${currentPath.join('.')}' was added with value: ${getValue(value)}`;
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
  return iter(treeAst, []);
};

export default getPlain;
