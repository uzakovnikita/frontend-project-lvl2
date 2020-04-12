import toParse from './parser';
import diff from './diff';
import toFormat from './formatters';

export default (firstConfig, secondConfig, format) => {
  const firstData = toParse(firstConfig);
  const secondData = toParse(secondConfig);
  const difference = diff(firstData, secondData);
  const result = toFormat(format, difference);
  console.log(result);
  return result;
};
