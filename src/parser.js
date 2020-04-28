import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parserManager = {
  json: JSON.parse,
  yml: safeLoad,
  ini: parse,
};

export default (data, type) => {
  if (!Reflect.has(parserManager, type)) {
    throw new Error(`Uknown type ${type}`);
  }
  return parserManager[type](data);
};
