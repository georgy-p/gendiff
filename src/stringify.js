import _ from 'lodash';

const getIndent = (spaceSymb, spacesCount) => spaceSymb.repeat(spacesCount);

const stringify = (value, replacer = ' ', spacesCount = 2) => {
  const indent = getIndent(replacer, spacesCount);
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value !== 'object') {
    return value.toString();
  }
  let result = '{\n';
  const braceInd = spacesCount > 1 ? getIndent(replacer, spacesCount - 2) : '';
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
