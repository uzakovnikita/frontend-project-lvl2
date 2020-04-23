import {
  has, isEqual, isObject, union,
} from 'lodash';

const isDeleted = (secondData, key) => !has(secondData, key);

const isAdded = (firstData, key) => !has(firstData, key);

const diff = (firstData, secondData) => {
  const firstKeys = Object.keys(firstData);
  const secondKeys = Object.keys(secondData);
  const keys = union(firstKeys, secondKeys);
  const result = keys.map((key) => {
    if (isDeleted(secondData, key)) {
      return { type: 'deleted', key, value: firstData[key] };
    }
    if (isAdded(firstData, key)) {
      return { type: 'added', key, value: secondData[key] };
    }
    if (isEqual(secondData[key], firstData[key])) {
      return { type: 'notDiff', key, value: firstData[key] };
    }
    if (isObject(firstData[key]) && isObject(secondData[key])) {
      return { type: 'parent', key, children: diff(firstData[key], secondData[key]) };
    }
    return {
      type: 'changed', key, newValue: secondData[key], oldValue: firstData[key],
    };
  });
  return result;
};

export default diff;
