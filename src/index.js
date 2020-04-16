import parse from './parser';
import diff from './diff';
import format from './formatters';

export default (firstSource, secondSource, format) => {
  const firstData = parse(firstSource);
  const secondData = parse(secondSource);
  const difference = diff(firstData, secondData);
  const result = format(format, difference);
  return result;
};
