import parse from './parse';
import diff from './diff';
import render from './formatters/render';
import plain from './formatters/plain';

export default (firstConfig, secondConfig, format) => {
  const firstData = parse(firstConfig);
  const secondData = parse(secondConfig);
  const difference = diff(firstData, secondData);
  let result;
  console.log(`this format ${format}`);
  if (format === 'recursive') {
    result = render(difference);
  } else {
    result = plain(difference);
  }
  return result;
};
