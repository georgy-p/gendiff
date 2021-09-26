import fs from 'fs';
import path from 'path';
import process from 'process';


const getFullPath = (node, fileName) => path.resolve(node, fileName);

const getData = (fileName) => fs.readFileSync(getFile(fileName), 'utf8');

const getFile = (fileName, node = process.cwd()) => {
  const dirContent = fs.readdirSync(node);
  if (dirContent.includes(fileName)) {
    return getFullPath(node, fileName);
  }
  const folders = dirContent.filter((child) => {
    const stats = fs.statSync(getFullPath(node, child));
    return stats.isDirectory();
  })
    .filter((child) => !child.startsWith('.'))
    .flatMap((child) => {
      const newNode = getFullPath(node, child);
      return getFile(fileName, newNode);
    });
  const result = folders.join('');
  return result;
};

export {
  getFullPath,
  getData,
  getFile
};
