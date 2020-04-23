import { isObject } from 'lodash';

const renderValue = (value, deep) => {
  const space = '  ';
  const symbol = space;
  if (!isObject(value)) {
    return value;
  }
  const newDeep = deep + 2;
  const entries = Object.entries(value);
  const newStr = entries.reduce((accum, element) => {
    const [key, valued] = element;
    const newAcc = `${space.repeat(newDeep)}${symbol}${key}: ${valued}\n`;
    return accum.concat(newAcc);
  }, '');
  const newString = `{\n${newStr}${space}${space.repeat(deep)}}`;
  return newString;
};

const render = (tree) => {
  const space = '  ';
  const iter = (ast, deep) => {
    const result = ast.map((current) => {
      switch (current.type) {
        case 'notDiff': {
          const symbol = space;
          const newString = `${space.repeat(deep)}${symbol}${current.key}: ${current.value}\n`;
          return newString;
        }
        case 'changed': {
          const newValue = renderValue(current.newValue, deep);
          const oldValue = renderValue(current.oldValue, deep);
          const firstSymbol = '+ ';
          const secondSymbol = '- ';
          const firstString = `${space.repeat(deep)}${firstSymbol}${current.key}: ${newValue}\n`;
          const secondString = `${space.repeat(deep)}${secondSymbol}${current.key}: ${oldValue}\n`;
          const newString = firstString.concat(secondString);
          return newString;
        }
        case 'added': {
          const symbol = '+ ';
          const newValue = renderValue(current.value, deep);
          const newString = `${space.repeat(deep)}${symbol}${current.key}: ${newValue}\n`;
          return newString;
        }
        case 'deleted': {
          const symbol = '- ';
          const newValue = renderValue(current.value, deep);
          const newString = `${space.repeat(deep)}${symbol}${current.key}: ${newValue}\n`;
          return newString;
        }
        case 'parent': {
          const symbol = space;
          const newDeep = deep + 2;
          const children = iter(current.children, newDeep).join('');
          const newString = `${space.repeat(deep)}${symbol}${current.key}: {\n${children}${space.repeat(deep)}${space}}\n`;
          return newString;
        }
        default:
          throw new Error('Uknown type of node');
      }
    });
    return result;
  };
  const result = iter(tree, 1).join('');
  return `{\n${result}}`;
};

export default render;
