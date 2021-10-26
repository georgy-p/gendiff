import _ from 'lodash';

const stringify = (value, replacer = ' ', spacesCount = 2) => {
  const indent = replacer.repeat(spacesCount);
  let result = '{\n';
  const braceInd = spacesCount > 2 ? replacer.repeat(spacesCount - 2) : '';
  const keys = Object.keys(value);
  keys.map((key) => {
    if (_.isPlainObject(value[key])) {
      result += `${indent}${key}: ${stringify(value[key], replacer, spacesCount + 4)}\n`;
    } else {
      result += `${indent}${key}: ${value[key]}\n`;
    }
    return result;
  });
  result += `${braceInd}}`;
  return result;
};

export default stringify;
