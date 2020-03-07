import { has, isEqual } from 'lodash';
// import { readFileSync } from 'fs';
// import { cwd } from 'process';
// import { resolve } from 'path';
import parse from './parse';

const plus = (key) => `+ ${key}`;
const minus = (key) => `- ${key}`;
const isObject = (obj, key) => Object.prototype.toString.call(obj[key]) === '[object Object]';

const convertObjectToSring = (obj) => {
  const indentation = 2;
  const str = JSON.stringify(obj, null, indentation);
  const result = str.replace(/["']/g, '');
  return result;
};

const diff = (firstData, secondData) => {
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
      difference = { ...difference, [(key)]: diff(firstData[key], secondData[key]) };
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
  const firstData = parse(firstConfig);
  const secondData = parse(secondConfig);
  const difference = diff(firstData, secondData);
  const result = convertObjectToSring(difference);
  return result;
};
