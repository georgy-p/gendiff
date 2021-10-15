import getDiff from './src/diff.js';
import formatter from './src/stylish.js';

const genDiff = (file1, file2) => {
  const diff = getDiff(file1, file2);
  const formatedDiff = formatter(diff);
  return formatedDiff;
};

export default genDiff;
