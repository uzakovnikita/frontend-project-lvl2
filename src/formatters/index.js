import { cwd } from 'process';
import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';
import render from './render';
import plain from './plain';
import json from './json';

const JSONparse = (source) => {
  const firstData = JSON.parse(readFileSync(source));
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

export const parser = (config) => {
  const currentDirectory = cwd();
  const source = resolve(currentDirectory, config);
  const type = extname(source).replace(/[.]/g, '').trim();
  return parserManager[type](source);
};

export const renderManager = {
  recursive: render,
  plain,
  json,
};
