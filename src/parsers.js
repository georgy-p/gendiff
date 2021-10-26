import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

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

const fileReader = (fileName) => {
  if (fs.existsSync(fileName)) {
    return fs.readFileSync(fileName, 'utf-8');
  }
  return fs.readFileSync(getFile(fileName), 'utf8');
};

export default (fileName) => {
  const extname = path.extname(fileName);
  if (extname === '.yml' || extname === '.yaml') {
    return yaml.load(fileReader(fileName));
  }
  if (extname === '.json') {
    return JSON.parse(fileReader(fileName));
  }
  return fs.readFileSync(fileName, 'utf-8');
};
