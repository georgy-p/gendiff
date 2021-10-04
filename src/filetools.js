import fs from 'fs';
import path from 'path';
import process from 'process';

const getFullPath = (node, fileName) => path.resolve(node, fileName);

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

console.log(getFile('file'));

// This program help to find file in the directory by the name and parse data;
export default (fileName) => {
  if (!fs.existsSync(fileName) || !getFile(fileName)) {
    return `Error: No '${fileName}' in directory. Check the name! `;
  }
  if (fs.existsSync(fileName)) {
    return fs.readFileSync(fileName, 'utf-8');
  }
  return fs.readFileSync(getFile(fileName), 'utf8');
};
