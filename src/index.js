import parse from './parser';
import diff from './diff';
import format from './formatters';

export default (firstPath, secondPath, form) => {
  const firstData = parse(firstPath);
  const secondData = parse(secondPath);
  const difference = diff(firstData, secondData);
  const result = format(form, difference);
  return result;
};
