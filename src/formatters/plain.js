import { isObject } from 'lodash';

const renderValue = (current) => {
  if (isObject(current)) {
    return '[complex Value]';
  } if (isFinite(current)) {
    return current;
  }
  return `'${current}'`;
};

const plain = (ast) => {
  const iter = (tree, acc) => {
    const result = tree.map((current) => {
      const deepNameOfProperty = (acc === '') ? `${current.key}` : `${acc}.${current.key}`;
      switch (current.type) {
        case 'parent': {
          const child = iter(current.children, deepNameOfProperty)
            .filter((element) => !!element)
            .join('\n');
          return child;
        }
        case 'deleted':
          return `Property '${deepNameOfProperty}' was deleted`;
        case 'added':
          return `Property '${deepNameOfProperty}' was added with value: ${renderValue(current.value)}`;
        case 'changed':
          return `Property '${deepNameOfProperty}' was changed from ${renderValue(current.oldValue)} to ${renderValue(current.newValue)}`;
        case 'notDiff':
          break;
        default:
          throw new Error('Uknown type of node');
      }
      return false;
    });
    return result;
  };
  return `${iter(ast, '').filter((element) => !!element).join('\n')}\n`;
};
export default plain;
