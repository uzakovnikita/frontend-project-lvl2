import { cwd } from 'process';
import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parseFromJson = (source) => {
  const firstData = JSON.parse(readFileSync(source));
  return firstData;
};

const parseFromYml = (firstSource) => {
  const firstData = safeLoad(readFileSync(firstSource));
  return firstData;
};

const parseFromIni = (source) => parse(readFileSync(source, 'utf-8'));

const parserManager = {
  json: parseFromJson,
  yml: parseFromYml,
  ini: parseFromIni,
};

export default (path) => {
  const currentDirectory = cwd();
  const absolutePath = resolve(currentDirectory, path);
  const type = extname(source).replace(/[.]/g, '').trim();
  if (!({}).hasOwnProperty.call(parserManager, type)) {
    throw new Error(`Uknown type ${type}`);
  }
  return parserManager[type](absolutePath);
};
