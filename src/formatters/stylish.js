import _ from 'lodash';

const stringify = (value, spaces) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const indent = ' '.repeat(spaces + 6);
  const indentBraces = ' '.repeat(spaces + 2);
  const result = _.keys(value).map((key) => {
    if (typeof value[key] === 'object') {
      return `${indent}${key}: ${stringify(value[key], spaces + 4)}\n`;
    }
    return `${indent}${key}: ${value[key]}\n`;
  });

  return `{\n${result.join('')}${indentBraces}}`;
};

const getStylish = (nodes) => {
  const innerIter = (node, space = 2) => {
    const indent = ' '.repeat(space);
    const indentBraces = ' '.repeat(space + 2);
    switch (node.type) {
      case 'added':
        return `\n${indent}+ ${node.name}: ${stringify(node.value, space)}`;
      case 'removed':
        return `\n${indent}- ${node.name}: ${stringify(node.value, space)}`;
      case 'nested':
        return `\n${indentBraces}${node.name}: {${node.children.map((child) => innerIter(child, space + 4)).join('')}\n${indentBraces}}`;
      case 'updated':
        return `\n${indent}- ${node.name}: ${stringify(node.oldValue, space)}\n${indent}+ ${node.name}: ${stringify(node.newValue, space)}`;
      case 'unchanged':
        return `\n${indentBraces}${node.name}: ${stringify(node.value, space)}`;
      default:
        throw new Error(`Unexpected type ${node.type}`);
    }
  };
  return innerIter(nodes);
};

const stylish = (treeAst) => {
  const lines = treeAst.map((node) => getStylish(node)).join('');
  return `{${lines}\n}`;
};

export default stylish;
