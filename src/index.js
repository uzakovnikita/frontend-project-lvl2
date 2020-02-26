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
    console.log(typeof(firstData))
    // const validKeys = keys.filter((key)=> has(secondData, key));
    // const invalidKeys = keys.filter((key) => !has(secondData, key));
    // validKeys.map((key) => {
    //     if (secondData[key] === firstData[key]) {
    //         result[key] = firstData[key];
    //     } else {
    //         result[plus(key)] = secondData[key];
    //         result[minus(key)] = firstData[key];
    //     }
    // })
    // invalidKeys.map((key) => result[minus(key)] = firstData[key]);
    for (const key of keys) {
        if (has(secondData, key)) {
            console.log(key)
            console.log('secondData[key]')
            console.log(secondData[key]);
            console.log('firstData[key]');
            console.log(firstData[key]);
            console.log(secondData[key] === firstData[key])
            if (secondData[key] == firstData[key]) {
                console.log('hello')
                console.log(key)
                result[key] = firstData[key];
                console.log(result[key])
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

