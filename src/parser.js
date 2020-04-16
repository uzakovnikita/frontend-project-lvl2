import { cwd } from 'process';
import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parseFromJson = (filePath) => JSON.parse(readFileSync(filePath));

const parseFromYml = (filePath) => safeLoad(readFileSync(filePath));

const parseFromIni = (filePath) => parse(readFileSync(filePath, 'utf-8'));

const parserManager = {
  json: parseFromJson,
  yml: parseFromYml,
  ini: parseFromIni,
};

export default (filePath) => {
  const currentDirectory = cwd();
  const absolutePath = resolve(currentDirectory, filePath);
  const type = extname(source).replace(/[.]/g, '').trim();
  if (!({}).hasOwnProperty.call(parserManager, type)) {
    throw new Error(`Uknown type ${type}`);
  }
  return parserManager[type](absolutePath);
};
