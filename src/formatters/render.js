import { isObject } from 'lodash';

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
    const result = ast.map((current) => {
      if (current.type === 'notDiff') {
        const symbol = space;
        const newAcc = `${space.repeat(deep)}${symbol}${current.key}: ${current.value}\n`;
        return newAcc;
      }
      if (current.type === 'changed') {
        const newValue = renderObject(current.newValue, deep);
        const oldValue = renderObject(current.oldValue, deep);
        const firstSymbol = '+ ';
        const secondSymbol = '- ';
        const firstString = `${space.repeat(deep)}${firstSymbol}${current.key}: ${newValue}\n`;
        const secondString = `${space.repeat(deep)}${secondSymbol}${current.key}: ${oldValue}\n`;
        const newAcc = firstString.concat(secondString);
        return newAcc;
      }
      if (current.type === 'added' && isObject(current.value)) {
        const symbol = '+ ';
        const newString = renderObject(current.value, deep);
        const newAcc = `${space.repeat(deep)}${symbol}${current.key}: ${newString}\n`;
        return newAcc;
      }
      if (current.type === 'deleted' && isObject(current.value)) {
        const symbol = '- ';
        const newString = renderObject(current.value, deep);
        const newAcc = `${space.repeat(deep)}${symbol}${current.key}: ${newString}\n`;
        return newAcc;
      }
      if (current.type === 'added' && !isObject(current.value)) {
        const symbol = '+ ';
        const newAcc = `${space.repeat(deep)}${symbol}${current.key}: ${current.value}\n`;
        return newAcc;
      }
      if (current.type === 'deleted' && !isObject(current.value)) {
        const symbol = '- ';
        const newAcc = `${space.repeat(deep)}${symbol}${current.key}: ${current.value}\n`;
        return newAcc;
      }
      if (current.type === 'parent') {
        const symbol = space;
        const newDeep = deep + 2;
        const children = iter(current.children, newDeep).join('');
        const newAcc = `${space.repeat(deep)}${symbol}${current.key}: {\n${children}${space.repeat(deep)}${space}}\n`;
        return newAcc;
      }
      return false;
    });
    return result;
  };
  const result = iter(tree, 1).join('');
  return `{\n${result}}`;
};

export default render;
