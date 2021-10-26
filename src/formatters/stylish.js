import stringify from './stringify.js';

const render = (value) => {
  const result = value.reduce((acc, el) => {
    const {
      name, type, value1, value2, children,
    } = el;
    switch (type) {
      case 'unchanged':
        return { ...acc, [`  ${name}`]: value1 };
      case 'added':
        return { ...acc, [`+ ${name}`]: value1 };
      case 'removed':
        return { ...acc, [`- ${name}`]: value1 };
      case 'updated':
        return { ...acc, [`- ${name}`]: value1, [`+ ${name}`]: value2 };
      case 'nested':
        return { ...acc, [`  ${name}`]: render(children) };
      default:
        return acc;
    }
  }, {});
  return result;
};

const stylish = (data) => stringify(render(data));

export default stylish;
