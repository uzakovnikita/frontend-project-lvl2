import { has, isEqual } from 'lodash';
import { readFileSync }  from 'fs';
const plus = (key) => `+ ${key}`;
const minus = (key) => `- ${key}`;

export default (firstConfig, secondConfig) => {
    const result = {};
    const firstData = JSON.parse(readFileSync(firstConfig))
    const secondData = JSON.parse(readFileSync(secondConfig))
    if (isEqual(firstData, secondData)) {
        return firstData;
    }
    const keys = Object.keys(firstData);
    const validKeys = keys.filter((key)=> has(secondData, key));
    const invalidKeys = keys.filter((key) => !has(secondData, key));
    validKeys.map((key) => {
        if (isEqual(secondData[key], firstData[key])) {
            result[key] = firstData[key];
        } else {
            result[plus(key)] = secondData[key];
            result[minus(key)] = firstData[key];
        }
    })
    invalidKeys.map((key) => result[minus(key)] = firstData[key]);
    return result;
}

