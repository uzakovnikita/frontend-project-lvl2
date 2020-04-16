import parse from './parser';
import diff from './diff';
import format from './formatters';

export default (firstPath, secondPath, format) => {
  const firstData = parse(firstPath);
  const secondData = parse(secondPath);
  const difference = diff(firstData, secondData);
  const result = format(format, difference);
  return result;
};
