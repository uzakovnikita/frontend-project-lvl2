import { cwd } from 'process';
import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';

const YMLparse = (firstSource) => {
  const firstData = safeLoad(readFileSync(firstSource));
  return firstData;
};

const JSONparse = (firstSource) => {
  const firstData = JSON.parse(readFileSync(firstSource));
  return firstData;
};


const parser = {
  json: JSONparse,
  yml: YMLparse,
};

export default (config) => {
  const currentDirectory = cwd();
  const firstSource = resolve(currentDirectory, config);
  const type = extname(firstSource).replace(/[.]/g, '');
  return parser[type](firstSource);
};
