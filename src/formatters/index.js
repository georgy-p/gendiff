import stylish from './stylish.js';
import plain from './plain.js';

const formatedResult = (data, format) => {
  if (format === 'stylish') {
    return stylish(data);
  } if (format === 'plain') {
    return plain(data);
  }
  return 'Error unknown file';
};

export default formatedResult;
