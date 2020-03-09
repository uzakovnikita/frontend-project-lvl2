import { has, isEqual } from 'lodash';

// {type: tagsList, body: [ { type: tag, name: <>, body: <>, options: {} } ] }

// const iter = (data) => {
//   if (data[0] instanceof Array) {
//    return {type: 'tagsList', body: data.map(iter)}
//   }
//   let body;
//   let options;
//   if (data.length === 3) {
//     body = data[2];
//     options = data[1];
//   } else if (data.length === 2) {
//     body = data[1];
//     options = {};
//   }
//   const processedBody = (body instanceof Array) ? iter(body) : body;
//   return { type: 'tag', name: data[0], body: processedBody, options}
// };

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
      return { type: ' ', key, value: firstData[key] };
    }
    if (isObject(firstData[key]) && isObject(secondData[key])) {
      return { type: ' ', key, value: iter(firstData[key], secondData[key]) };
    }
    const added = { type: '+', key, value: secondData[key] };
    const deled = { type: '-', key, value: firstData[key] };
    return { ...added, ...deled };
  });
  return [...mathcing, ...add, ...del];
};
export default iter;
