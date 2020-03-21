/* eslint-disable no-else-return */
import { isObject } from 'lodash';

const render = (ast, deep = 1) => {
  const space = '  ';
  const str = ast.reduce((acc, current) => {
    if (!Array.isArray(current.value)) {
      if (current.type === 'notDiff') {
        const newAcc = `${space.repeat(deep)}  ${current.key}: ${current.value}\n`;
        return acc.concat(newAcc);
      }
      if (isObject(current.value)) {
        const x = JSON.stringify(current.value).replace(/[.{}"]/g, '');
        const x2 = x.replace(/:/g, ': ');
        const newString = `{\n${space.repeat(deep + 3)}${x2}\n  ${space.repeat(deep)}}`;
        const newAcc = `${space.repeat(deep)}${current.type} ${current.key}: ${newString}\n`;
        return acc.concat(newAcc);
      }
      const newAcc = `${space.repeat(deep)}${current.type} ${current.key}: ${current.value}\n`;
      return `${acc.concat(newAcc)}`;
    } else {
      const newDeep = deep + 1;
      const newAcc = `${space.repeat(newDeep)}${current.key}: {\n${render(current.value, newDeep + 1)}${space.repeat(newDeep)}}\n`;
      return acc.concat(newAcc);
    }
  }, '');
  return str;
};
const x = (str) => {
  return `{\n${render(str)}}`;
};
export default x;
// export default (ast) => ast;
