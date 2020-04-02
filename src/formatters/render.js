import { isObject, has } from 'lodash';

const renderObject = (value, deep) => {
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
    const result = ast.reduce((acc, current) => {
      if (!has(current, 'children')) {
        if (current.type === 'notDiff') {
          const symbol = space;
          const newAcc = `${space.repeat(deep)}${symbol}${current.key}: ${current.value}\n`;
          return acc.concat(newAcc);
        }
        if (current.type === 'changed') {
          const newValue = renderObject(current.newValue, deep);
          const oldValue = renderObject(current.oldValue, deep);
          const firstSymbol = '+ ';
          const secondSymbol = '- ';
          const firstString = `${space.repeat(deep)}${firstSymbol}${current.key}: ${newValue}\n`;
          const secondString = `${space.repeat(deep)}${secondSymbol}${current.key}: ${oldValue}\n`;
          const newAcc = firstString.concat(secondString);
          return acc.concat(newAcc);
        }
        if (isObject(current.value)) {
          const newString = renderObject(current.value, deep);
          const symbol = (current.type === 'added' || current.type === 'after') ? '+ ' : '- ';
          const newAcc = `${space.repeat(deep)}${symbol}${current.key}: ${newString}\n`;
          return acc.concat(newAcc);
        }
        const symbol = (current.type === 'added' || current.type === 'after') ? '+ ' : '- ';
        const newAcc = `${space.repeat(deep)}${symbol}${current.key}: ${current.value}\n`;
        return `${acc.concat(newAcc)}`;
      }
      const symbol = space;
      const newDeep = deep + 2;
      const newAcc = `${space.repeat(deep)}${symbol}${current.key}: {\n${iter(current.children, newDeep)}${space.repeat(deep)}${space}}\n`;
      return acc.concat(newAcc);
    }, '');
    return result;
  };
  const result = iter(tree, 1);
  return `{\n${result}}`;
};

export default render;
