import { isObject, has } from 'lodash';

const render = (ast, deep = 1) => {
  const space = '  ';
  const str = ast.reduce((acc, current) => {
    if (!has(current, 'children')) {
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
        const type = (current.type === 'added' || current.type === 'after') ? '+' : '-';
        const newString = `{\n${space}${newStr}${space}${space.repeat(deep)}}`;
        const newAcc = `${space.repeat(deep)}${type} ${current.key}: ${newString}\n`;
        return acc.concat(newAcc);
      }
      const type = (current.type === 'added' || current.type === 'after') ? '+' : '-';
      const newAcc = `${space.repeat(deep)}${type} ${current.key}: ${current.value}\n`;
      return `${acc.concat(newAcc)}`;
    }
    const newDeep = deep + 2;
    const newAcc = `${space.repeat(deep)}${space}${current.key}: {\n${render(current.children, newDeep)}${space.repeat(deep)}${space}}\n`;
    return acc.concat(newAcc);
  }, '');
  return str;
};
const x = (str) => `{\n${render(str)}}`;
export default x;
