import { has, isEqual, flatten } from 'lodash';

const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

const iter = (firstData, secondData) => {
  const keys = Object.keys(firstData);
  const deletedKeys = keys.filter((key) => !has(secondData, key));
  const del = deletedKeys.map((key) => ({ type: '-', key, value: firstData[key] }));
  const keys2 = Object.keys(secondData);
  const addedKeys = keys2.filter((key2) => !has(firstData, key2));
  const add = addedKeys.map((key) => ({ type: '+', key, value: secondData[key] }));
  const matchingKeys = keys.filter((key) => has(secondData, key));
  const mathcing = matchingKeys.map((key) => {
    if (isEqual(secondData[key], firstData[key])) {
      return { type: 'notDiff', key, value: firstData[key] };
    }
    if (isObject(firstData[key]) && isObject(secondData[key])) {
      return { type: 'notDiff', key, value: iter(firstData[key], secondData[key]) };
    }
    const added = { type: '+', key, value: secondData[key] };
    const deleted = { type: '-', key, value: firstData[key] };
    return [added, deleted];
  });
  const mathcingSingleDeep = flatten(mathcing);
  return [...mathcingSingleDeep, ...add, ...del];
};
export default iter;
