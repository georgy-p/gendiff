import stringify from './stringify.js';

const render = (treeAst) => {
  const result = treeAst.reduce((acc, el) => {
    const {
      name, type, value, oldValue, newValue, children,
    } = el;
    switch (type) {
      case 'unchanged':
        return { ...acc, [`  ${name}`]: value };
      case 'added':
        return { ...acc, [`+ ${name}`]: value };
      case 'removed':
        return { ...acc, [`- ${name}`]: value };
      case 'updated':
        return { ...acc, [`- ${name}`]: oldValue, [`+ ${name}`]: newValue };
      case 'nested':
        return { ...acc, [`  ${name}`]: render(children) };
      default:
        return acc;
    }
  }, {});
  return result;
};

const getStylish = (data) => stringify(render(data));

export default getStylish;
