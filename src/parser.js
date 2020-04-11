import { cwd } from 'process';
import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const toParseFromJson = (source) => {
  const firstData = JSON.parse(readFileSync(source));
  return firstData;
};

const toParseFromYml = (firstSource) => {
  const firstData = safeLoad(readFileSync(firstSource));
  return firstData;
};

const toParseFromIni = (source) => parse(readFileSync(source, 'utf-8'));

const parserManager = {
  json: toParseFromJson,
  yml: toParseFromYml,
  ini: toParseFromIni,
};

export default (config) => {
  const currentDirectory = cwd();
  const source = resolve(currentDirectory, config);
  const type = extname(source).replace(/[.]/g, '').trim();
  if (!({}).hasOwnProperty.call(parserManager, type)) {
    throw new Error(`Uknown type ${type}`);
  }
  return parserManager[type](source);
};
