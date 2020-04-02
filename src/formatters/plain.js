import { has, isObject } from 'lodash';

const complexValue = (current) => {
  if (isObject(current)) {
    return '[complex Value]';
  } if (isFinite(current)) {
    return current;
  }
  return `'${current}'`;
};

const plain = (ast) => {
  const iter = (tree, accumulator) => {
    const str = tree.reduce((acc, current) => {
      if (has(current, 'children')) {
        const newAcc = (accumulator === '') ? `${current.key}` : `${accumulator}.${current.key}`;
        const x = iter(current.children, newAcc);
        return acc.concat(x);
      }
      const variable = (accumulator === '') ? `${current.key}` : `${accumulator}.${current.key}`;
      switch (current.type) {
        case 'deleted':
          return acc.concat(`Property '${variable}' was deleted\n`);
        case 'added':
          return acc.concat(`Property '${variable}' was added with value: ${complexValue(current.value)}\n`);
        case 'changed':
          return acc.concat(`Property '${variable}' was changed from ${complexValue(current.oldValue)} to ${complexValue(current.newValue)}\n`);
        default:
          break;
      }
      return acc;
    }, '');
    return str;
  };
  return iter(ast, '');
};

export default plain;
