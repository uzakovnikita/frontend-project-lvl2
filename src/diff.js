import {
  has, isEqual, isObject,
} from 'lodash';

const iter = (firstData, secondData) => {
  const keys = Object.keys(firstData);
  const deletedKeys = keys.filter((key) => !has(secondData, key));
  const del = deletedKeys.map((key) => ({ type: 'deleted', key, value: firstData[key] }));
  const keys2 = Object.keys(secondData);
  const addedKeys = keys2.filter((key2) => !has(firstData, key2));
  const add = addedKeys.map((key) => ({ type: 'added', key, value: secondData[key] }));
  const matchingKeys = keys.filter((key) => has(secondData, key));
  const mathcing = matchingKeys.map((key) => {
    if (isEqual(secondData[key], firstData[key])) {
      return { type: 'notDiff', key, value: firstData[key] };
    }
    if (isObject(firstData[key]) && isObject(secondData[key])) {
      return { type: 'notDiff', key, children: iter(firstData[key], secondData[key]) };
    }
    const changed = {
      type: 'changed', key, newValue: secondData[key], oldValue: firstData[key],
    };
    return changed;
  });
  const result = [...mathcing, ...add, ...del];
  // console.log(JSON.stringify(result, null, 2));
  return result;
};
export default iter;
