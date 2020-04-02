import { cwd } from 'process';
import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const JSONparse = (firstSource) => {
  const firstData = JSON.parse(readFileSync(firstSource));
  return firstData;
};

const YMLparse = (firstSource) => {
  const firstData = safeLoad(readFileSync(firstSource));
  return firstData;
};

const INIparse = (source) => parse(readFileSync(source, 'utf-8'));

const parserManager = {
  json: JSONparse,
  yml: YMLparse,
  ini: INIparse,
};

export default (config) => {
  const currentDirectory = cwd();
  const firstSource = resolve(currentDirectory, config);
  const type = extname(firstSource).replace(/[.]/g, '').trim();
  return parserManager[type](firstSource);
};
