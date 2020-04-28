import { isObject } from 'lodash';

const renderValue = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }
  const space = '  ';
  const symbol = space;
  const newDeep = deep + 2;
  const entries = Object.entries(value);
  const newStr = entries.map((current) => {
    const [key, val] = current;
    const result = `${space.repeat(newDeep)}${symbol}${key}: ${val}`;
    return result;
  }).join('\n');
  const result = `{\n${newStr}\n${space}${space.repeat(depth)}}`;
  return result;
};

export default (tree) => {
  const space = '  ';
  const iter = (ast, depth) => {
    const result = ast.map((current) => {
      switch (current.type) {
        case 'notDiff': {
          const symbol = space;
          const newString = `${space.repeat(deep)}${symbol}${current.key}: ${current.value}`;
          return newString;
        }
        case 'changed': {
          const newValue = renderValue(current.newValue, depth);
          const oldValue = renderValue(current.oldValue, depth);
          const firstSymbol = '+ ';
          const secondSymbol = '- ';
          const firstString = `${space.repeat(depth)}${firstSymbol}${current.key}: ${newValue}\n`;
          const secondString = `${space.repeat(depth)}${secondSymbol}${current.key}: ${oldValue}`;
          const newString = firstString.concat(secondString);
          return newString;
        }
        case 'added': {
          const symbol = '+ ';
          const newValue = renderValue(current.value, depth);
          const newString = `${space.repeat(depth)}${symbol}${current.key}: ${newValue}`;
          return newString;
        }
        case 'deleted': {
          const symbol = '- ';
          const newValue = renderValue(current.value, depth);
          const newString = `${space.repeat(depth)}${symbol}${current.key}: ${newValue}`;
          return newString;
        }
        case 'parent': {
          const symbol = space;
          const newDeep = depth + 2;
          const children = iter(current.children, newDeep).join('\n');
          const newString = `${space.repeat(depth)}${symbol}${current.key}: {\n${children}\n${space.repeat(depth)}${space}}`;
          return newString;
        }
        default:
          throw new Error('Uknown type of node ${current.type}');
      }
    });
    return result;
  };
  const result = iter(tree, 1).join('\n');
  return `{\n${result}\n}`;
};

