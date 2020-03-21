import { isObject } from 'lodash';

const render = (ast, deep = 1) => {
  const space = '  ';
  const str = ast.reduce((acc, current) => {
    if (!Array.isArray(current.value)) {
      if (current.type === 'notDiff') {
        const newAcc = `${space.repeat(deep)}${space}${current.key}: ${current.value}\n`;
        return acc.concat(newAcc);
      }
      if (isObject(current.value)) {
        const newDeep = deep + 2;
        const entries = Object.entries(current.value);
        const newStr = entries.reduce((accum, element) => {
          const [key, value] = element;
          const newAcc = `${space.repeat(newDeep)}${key}: ${value}\n`;
          return accum.concat(newAcc);
        }, '');
        const newString = `{\n${space}${newStr}${space}${space.repeat(deep)}}`;
        const newAcc = `${space.repeat(deep)}${current.type} ${current.key}: ${newString}\n`;
        return acc.concat(newAcc);
      }
      const newAcc = `${space.repeat(deep)}${current.type} ${current.key}: ${current.value}\n`;
      return `${acc.concat(newAcc)}`;
    }
    const newDeep = deep + 2;
    const newAcc = `${space.repeat(deep)}${space}${current.key}: {\n${render(current.value, newDeep)}${space.repeat(deep)}${space}}\n`;
    return acc.concat(newAcc);
  }, '');
  return str;
};
const x = (str) => `{\n${render(str)}}`;
export default x;
