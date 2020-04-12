import {
  has, isEqual, isObject, uniq,
} from 'lodash';

const isDeleted = (secondArr, firstKey) => {
  if (!has(secondArr, firstKey)) {
    return true;
  }
  return false;
};

const isAdded = (firstArr, secondKey) => {
  if (!has(firstArr, secondKey)) {
    return true;
  }
  return false;
};

const diff = (firstData, secondData) => {
  const firstKeys = Object.keys(firstData);
  const secondKeys = Object.keys(secondData);
  const keys = uniq(firstKeys.concat(secondKeys));
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
      return { type: 'notDiff', key, children: diff(firstData[key], secondData[key]) };
    }
    return {
      type: 'changed', key, newValue: secondData[key], oldValue: firstData[key],
    };
  });
  return result;
};

export default diff;
