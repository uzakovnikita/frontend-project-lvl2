import { safeLoad } from 'js-yaml';
import { parse } from 'ini';


const parseFromYml = (data) => safeLoad(data);

const parseFromIni = (data) => parse(data);

const parserManager = {
  json: JSON.parse,
  yml: parseFromYml,
  ini: parseFromIni,
};

export default (data, type) => {
  if (!Reflect.has(parserManager, type)) {
    throw new Error(`Uknown type ${type}`);
  }
  return parserManager[type](data);
};
