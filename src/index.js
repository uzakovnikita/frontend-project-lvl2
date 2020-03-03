import { has, isEqual } from 'lodash';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';

const plus = (key) => `+ ${key}`;
const minus = (key) => `- ${key}`;
const space = (key) => `  ${key}`;
const isObject = (obj, key) => Object.prototype.toString.call(obj[key]) === '[object Object]';

export const convertObjectToSring = (obj) => {
  const keys = Object.keys(obj);
  const list = keys.reduce((acc, key) => {
    if (isObject(obj, key)) {
      return [...acc, `${space(key)}: ${(convertObjectToSring(obj[key]))}`];
    }
    return [...acc, `${space(key)}: ${(obj[key])}`];
  }, []);
  const result = `\n${list.join('\n')} \n`;
  return result;
};

export const diff = (firstConfig, secondConfig) => {
  const currentDirectory = cwd();
  const firstSource = resolve(currentDirectory, firstConfig);
  const secondSource = resolve(currentDirectory, secondConfig);
  const firstData = JSON.parse(readFileSync(firstSource));
  const secondData = JSON.parse(readFileSync(secondSource));
  if (isEqual(firstData, secondData)) {
    return firstData;
  }
  let difference = {};
  const keys = Object.keys(firstData);
  const keys2 = Object.keys(secondData);
  const matchingKeys = keys.filter((key) => has(secondData, key));
  const addedKeys = keys2.filter((key2) => !has(firstData, key2));
  const deletedKeys = keys.filter((key) => !has(secondData, key));
  matchingKeys.map((key) => {
    if (isEqual(secondData[key], firstData[key])) {
      difference[key] = firstData[key];
    } else if (isObject(firstData, key)) {
      difference = { ...difference, [space(key)]: diff(firstData[key], secondData[key]) };
    } else {
      difference[plus(key)] = secondData[key];
      difference[minus(key)] = firstData[key];
    }
    return true;
  });
  addedKeys.map((key) => {
    difference[plus(key)] = secondData[key];
    return true;
  });
  deletedKeys.map((key) => {
    difference[minus(key)] = firstData[key];
    return true;
  });
  const result = difference;
  return result;
};

export default (firstConfig, secondConfig) => {
  // const currentDirectory = cwd();
  // const firstSource = resolve(currentDirectory, firstConfig);
  // const secondSource = resolve(currentDirectory, secondConfig);
  // const firstData = JSON.parse(readFileSync(firstSource));
  // const secondData = JSON.parse(readFileSync(secondSource));
  const result = `{\n${convertObjectToSring(diff(firstData, secondData))}\n}`;
  // const result = diff(firstData, secondData);
  return result;
};
