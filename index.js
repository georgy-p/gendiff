import parser from './src/parsers.js';
import buildAst from './src/ast.js';
import formatedResult from './src/formatters/index.js';

const genDiff = (fileName1, fileName2, format = 'stylish') => {
  const file1 = parser(fileName1);
  const file2 = parser(fileName2);
  const treeAst = buildAst(file1, file2);
  return formatedResult(treeAst, format);
};

export default genDiff;
