import { has, isEqual } from 'lodash';
import { readFileSync }  from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';

const plus = (key) => `  + ${key}`;
const minus = (key) => `  - ${key}`;
const space = (key) => `    ${key}`;
const isObject = (obj, key) =>  Object.prototype.toString.call(obj[key]) === '[object Object]';

const convertObjectToSring = (obj) => {
    const keys = Object.keys(obj);
    const list = keys.reduce((acc, key) => {
        if (isObject(obj, key)) {
            acc = [...acc, convertObjectToSring(obj[key])];
            return acc;
        }
        return acc = [...acc, `${key}: ${obj[key]}`];
    }, []);
    const result = `{\n${list.join('\n')} \n}`;
    return result;
}
const diff = (firstData, secondData) => {
    if (isEqual(firstData, secondData)) {
      return firstData;
    }
    let difference = {};
    const keys = Object.keys(firstData);
    const matchingKeys = keys.filter((key)=> has(secondData, key));
    const missmathcingKeys = keys.filter((key) => !has(secondData, key));
    matchingKeys.map((key) => {
        if (isEqual(secondData[key], firstData[key])) {
            difference[space(key)] = firstData[key];
        } else if (isObject(firstData, key)) {
            difference = {...difference, [space(key)]: diff(firstData[key], secondData[key])};
        } else {
            difference[plus(key)] = secondData[key];
            difference[minus(key)] = firstData[key];
        }
    })
    missmathcingKeys.map((key) => difference[minus(key)] = firstData[key]);
    const result = difference;
    return convertObjectToSring(result);
}

export default (firstConfig, secondConfig) => {
    const currentDirectory = cwd();
    const firstSource = resolve(currentDirectory, firstConfig);
    const secondSource = resolve(currentDirectory, secondConfig);
    const firstData = JSON.parse(readFileSync(firstSource))
    const secondData = JSON.parse(readFileSync(secondSource))
    const result = diff(firstData, secondData);
    return result;
}

