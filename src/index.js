import { has, isEqual } from 'lodash';
import { readFileSync }  from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';
const plus = (key) => `+ ${key}`;
const minus = (key) => `- ${key}`;

export default (firstConfig, secondConfig) => {
    const currentDirectory = cwd();
    const firstSource = resolve(currentDirectory, firstConfig);
    const secondSource = resolve(currentDirectory, secondConfig);
    const result = {};
    const firstData = JSON.parse(readFileSync(firstSource))
    const secondData = JSON.parse(readFileSync(secondSource))
    if (isEqual(firstData, secondData)) {
        return firstData;
    }
    const keys = Object.keys(firstData);
    const matchingKeys = keys.filter((key)=> has(secondData, key));
    const missmathcingKeys = keys.filter((key) => !has(secondData, key));
    matchingKeys.map((key) => {
        if (isEqual(secondData[key], firstData[key])) {
            result[key] = firstData[key];
        } else {
            result[plus(key)] = secondData[key];
            result[minus(key)] = firstData[key];
        }
    })
    missmathcingKeys.map((key) => result[minus(key)] = firstData[key]);
    return result;
}

