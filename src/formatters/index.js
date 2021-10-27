import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJson from './json.js';

const formatedResult = (data, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(data);
    case 'plain':
      return getPlain(data);
    case 'json':
      return getJson(data);
    default:
      return 'Error unknown file';
  }
};

export default formatedResult;
