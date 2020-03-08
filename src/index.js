import { has, isEqual } from 'lodash';
import parse from './parse';

const space = (key, counter) => `${'  '.repeat(counter)}${key}`;
// const after = (key) => `after ${key}`;
// const before = (key) => `before ${key}`;
// const notDiff = (key) => `equal ${key}`;
const after = (key) => `+ ${key}`;
const before = (key) => `- ${key}`;
const notDiff = (key) => `${key}`;
const isObject = (obj, key) => Object.prototype.toString.call(obj[key]) === '[object Object]';
const render = (obj) => {
  const str1 = JSON.stringify(obj, null, 2).replace(/['",]/g, '');
  const arr1 = str1.split('\n');
  const result = arr1.map((element) => {
    const after = element.indexOf('+') > 0 ? element.indexOf('+') : false;
    const before = element.indexOf('-') > 0 ? element.indexOf('-') : false;
    const brakets = element.includes('{') ? true : element.includes('}');
    if (!after && !before && !brakets) {
      const newElement = `  ${element}`;
      return newElement;
    }
    return element;
  });
  return result.join('\n');
};


const diff = (firstData, secondData) => {
  if (isEqual(firstData, secondData)) {
    return firstData;
  }
  const difference = {};
  const keys = Object.keys(firstData);
  const keys2 = Object.keys(secondData);
  const matchingKeys = keys.filter((key) => has(secondData, key));
  const addedKeys = keys2.filter((key2) => !has(firstData, key2));
  const deletedKeys = keys.filter((key) => !has(secondData, key));
  const matching = matchingKeys.reduce((acc, key) => {
    if (isEqual(secondData[key], firstData[key])) {
      acc[notDiff(key)] = firstData[key];
      return acc;
    } if (isObject(firstData, key) && isObject(secondData, key)) {
      return { ...acc, [notDiff(key)]: diff(firstData[key], secondData[key]) };
    }
    acc[after(key)] = secondData[key];
    acc[before(key)] = firstData[key];
    return acc;
  }, {});
  addedKeys.map((key) => {
    difference[after(key)] = secondData[key];
    return true;
  });
  deletedKeys.map((key) => {
    difference[before(key)] = firstData[key];
    return true;
  });
  const result = { ...matching, ...difference };
  return result;
};

export default (firstConfig, secondConfig) => {
  const firstData = parse(firstConfig);
  const secondData = parse(secondConfig);
  const difference = diff(firstData, secondData);
  const result = render(difference);
  console.log(result);
  return result;
};
