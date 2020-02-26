import { has, isEqual } from 'lodash';
import { readFileSync }  from 'fs';
const plus = (key) => `+ ${key}`;
const minus = (key) => `- ${key}`;
export default (firstConfig, secondConfig) => {
    const result = {};
    const firstData = readFileSync(firstConfig, {encoding: 'utf-8'}, function(err, data) {
        if (err) {
            return err;
        } else {
           return JSON.parse(data);
        }
    })
    const secondData = readFileSync(secondConfig, {encoding: 'utf-8'}, function(err, data) {
        if (err) {
            return err;
        } else {
           return JSON.parse(data);
        }
    })
    if (isEqual(firstData, secondData)) {
        return firstData;
    }
    const keys = Object.keys(firstData);
    for (const key of keys) {
        if (has(secondData, key)) {
            if (secondData[key] === firstData[key]) {
                result[key] = firstData[key];
            } else {
                result[plus(key)] = secondData[key];
                result[minus(key)] = firstData[key];
            }
        } else {
            result[minus(key)] = firstData[key];
        }
    }
    return result;
}

