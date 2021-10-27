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
    const result = data.map((node) => {
      const currentPath = [...path, `${node.name}`];
      switch (node.type) {
        case 'updated':
          return `Property '${currentPath.join('.')}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`;
        case 'added':
          return `Property '${currentPath.join('.')}' was added with value: ${getValue(node.value)}`;
        case 'nested':
          return iter(node.children, currentPath);
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
